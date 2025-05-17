import { Dimensions } from 'react-native'

/**
 * 屏幕宽度
 */
export const SCREEN_WIDTH = Dimensions.get('window').width
/**
 * 屏幕高度
 */
export const SCREEN_HEIGHT = Dimensions.get('window').height

/**
 * 根据屏幕尺寸自动缩放750设计稿
 *
 * @export
 * @param {Number} num
 * @returns {Number}
 */
export function px (num) {
  return (num / 750) * SCREEN_WIDTH
}

/**
 * 根据屏幕尺寸计算字体大小
 *   最大支持 360
 * @param num
 * @returns {number}
 */
export function fontSize (num) {
  if(SCREEN_WIDTH>400){
    return (num / 750) * Math.min(SCREEN_WIDTH, 360)
  }
  return (num / 750) * SCREEN_WIDTH
}

/**
 * 根据屏幕尺寸计算图片大小
 *   最大支持 360
 * @param num
 * @returns {number}
 */
export function imgSize (num) {
  if(SCREEN_WIDTH>400){
    return (num / 750) * Math.min(SCREEN_WIDTH, 360)
  }
  return (num / 750) * SCREEN_WIDTH
}

export function  width(num){
  if(SCREEN_WIDTH>400){
    return (num / 750) * Math.min(SCREEN_WIDTH, 360)
  }
  return (num / 750) * SCREEN_WIDTH
}

export function height(num){
  if(SCREEN_WIDTH>400){
    return (num / 750) * Math.min(SCREEN_WIDTH, 360)
  }
  return (num / 750) * SCREEN_WIDTH
}


