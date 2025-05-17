export interface IRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
}

export interface IResponse<T = any> {
  success: boolean;
  data: T;
  code?: number;
  msg?: string;
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultOptions: IRequestOptions;
  private pendingRequests: Map<string, { reject: (reason?: any) => void }> = new Map();

  constructor(baseUrl: string = '', options: IRequestOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Accept: "application/json",
        referer: "https://pwebapp.58.com/",
      },
      timeout: 10000,
      ...options
    };
  }

  public async get<T = any>(
    url: string,
    options?: Omit<IRequestOptions, 'data'>
  ): Promise<IResponse<T>> {
    return this.request<T>('GET', url, {...options});
  }

  public async postWithBody<T = any>(
    url: string,
    data?: any,
    options?: Omit<IRequestOptions, 'params'>
  ): Promise<IResponse<T>> {
    return this.request<T>('POST', url, {...options, data});
  }

  public async postWithParams<T = any>(
    url: string,
    params?: Record<string, any>,
    options?: Omit<IRequestOptions, 'data'>
  ): Promise<IResponse<T>> {
    return this.request<T>('POST', url, {...options, params});
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options: IRequestOptions = {}
  ): Promise<IResponse<T>> {
    const {headers, params, data, timeout} = {
      ...this.defaultOptions,
      ...options,
    };

    // 构建URL
    let queryString = '';
    if (params) {
      queryString = '?' + Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
    }
    const fullUrl = `${this.baseUrl}${url}${queryString}`;

    const requestId = `${method}_${url}_${Date.now()}`;
    let rejectFn: (reason?: any) => void;

    // 创建可取消的Promise
    const cancelablePromise = new Promise<IResponse<T>>((resolve, reject) => {
      rejectFn = reject;
      this.pendingRequests.set(requestId, {reject});

      // 设置超时
      const timer = setTimeout(() => {
        reject(new Error(`Request timed out after ${timeout}ms`));
        this.pendingRequests.delete(requestId);
      }, timeout);

      let params = {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
        credentials: 'include'
      }
      // 发起实际请求
      // @ts-ignore
      fetch(fullUrl, params)
        .then(async response => {
          clearTimeout(timer);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const responseData = await response.json();
          resolve({
            success: true,
            data: responseData,
            code: response.status,
          });
        })
        .catch(error => {
          clearTimeout(timer);
          reject(error);
        })
        .finally(() => {
          this.pendingRequests.delete(requestId);
        });
    });

    try {
      return await cancelablePromise;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  /**
   * 取消所有请求
   */
  public cancelAllRequests(reason: string = 'Request canceled'): void {
    this.pendingRequests.forEach(({reject}) => {
      reject(new Error(reason));
    });
    this.pendingRequests.clear();
  }

  private handleError<T>(error: any): { code: number; data: any; success: boolean; message: any } {
    if (error.message.includes('Request canceled')) {
      return {
        success: false,
        data: null as any,
        code: 499,
        message: error.message,
      };
    }

    if (error.message.includes('timed out')) {
      return {
        success: false,
        data: null as any,
        code: 504,
        message: error.message,
      };
    }

    return {
      success: false,
      data: null as any,
      code: 500,
      message: error.message || 'Network request failed',
    };
  }
}
