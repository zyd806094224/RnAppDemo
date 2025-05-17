import React from 'react';
import {Animated, Easing, FlatList, Image, View} from 'react-native';
import {height, SCREEN_WIDTH, width} from '../styles';


interface HorizontalListAnimationViewProp{

}

interface HorizontalListAnimationViewState{

}

interface ItemData {
    imageUrl: string
    width: number
    type: string
}
export class HorizontalListAnimationView extends React.Component<HorizontalListAnimationViewProp, HorizontalListAnimationViewState>{

    flatListRef: Animated.FlatList | FlatList | null = null; // 明确类型声明
    displayPicList: ItemData[] = []
    picItemWidth: number = width(400)
    picItemSpacing: number = width(22)

    // 新增动画相关变量
    private scrollAnim = new Animated.Value(0); // 滚动位置动画值
    private itemWidthWithSpacing = width(400) + width(22); // 每项宽度+间距
    private scrollDirection = 1; // 1:正向滚动, -1:反向滚动
    private isAnimating = false; // 防止重复启动动画
    private maxScrollOffset = 0; // 最大滚动距离
    constructor(props: HorizontalListAnimationViewProp) {
        super(props);
    }

    componentDidMount() {
        this._generateDisplayPicListData()
        setTimeout(() => {
            this._startHeadPicListAnimate();
        }, 1000);
    }

    componentWillUnmount() {
        this.scrollAnim.stopAnimation();
        this.scrollAnim.removeAllListeners();
    }

    _generateDisplayPicListData(){
        this.displayPicList.push({imageUrl: 'https://pic4.58cdn.com.cn/nowater/lbgfe/image/n_v38159f9cf963649bb919829e77e478c33.png', width: this.picItemWidth, type: 'img'})
        this.displayPicList.push({imageUrl: 'https://pic4.58cdn.com.cn/nowater/lbgfe/image/n_v38463e188587444669dbbed964536e3f8.png', width: this.picItemWidth, type: 'img'})
        this.displayPicList.push({imageUrl: 'https://pic4.58cdn.com.cn/nowater/lbgfe/image/n_v3c5b2335597094899918cbb3bb66a5495.png', width: this.picItemWidth, type: 'img'})
        // 计算最大滚动距离（总内容宽度 - 可视区域宽度）
        this.maxScrollOffset = Math.max(
            0,
            this.displayPicList.reduce((sum, item) => sum + item.width + width(22), 0) - SCREEN_WIDTH
        );
        console.log('maxScrollOffset--' + this.maxScrollOffset)
    }

    /**
     * 启动折返滚动动画
     */
    _startHeadPicListAnimate() {
        if (this.isAnimating || this.maxScrollOffset <= 0) return;
        this.isAnimating = true;
        const DURATION = this.maxScrollOffset * 7; // 控制单程时间（毫秒）  这个值越小 滚动的速度越快
        const startAnimation = () => {
            Animated.timing(this.scrollAnim, {
                toValue: this.scrollDirection === 1 ? this.maxScrollOffset : 0,
                duration: DURATION,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(({finished}) => {
                if (finished) {
                    this.scrollDirection *= -1; // 反转方向
                    startAnimation(); // 开始下一段动画
                } else {
                    this.isAnimating = false;
                }
            });
        };
        // 绑定动画到实际滚动
        this.scrollAnim.addListener(({value}) => {
            this.flatListRef?.scrollToOffset({
                offset: value,
                animated: false // 必须禁用动画才能精确控制
            });
        });
        startAnimation();
    }

    // @ts-ignore
    _renderItem({item, index}) {
        if (item.type == 'img') {
            return (
                <Image
                    source={{uri: item.imageUrl}}
                    style={{width: width(400),
                        height: height(300),
                        borderRadius: width(16)}}
                    resizeMode="cover"
                />
            )
        } else {
            return (<View style={{
                width: item.width
                , height: height(300)
                , backgroundColor: '#00000000'
            }}>
            </View>)
        }
    }

    render() {
        return (
            <View style={{height: height(300), width: SCREEN_WIDTH - width(20),marginLeft: width(10), position: 'relative'}}>
                <Animated.FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }} // 确保回调执行
                    // contentContainerStyle={{ paddingLeft: width(30), paddingRight: width(30) }}
                    horizontal={true}
                    data={this.displayPicList}
                    keyExtractor={(item, index) => `${item.imageUrl}_${index}`}
                    renderItem={this._renderItem.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    getItemLayout={(data, index) => ({
                        length: this.itemWidthWithSpacing,
                        offset: this.itemWidthWithSpacing * index,
                        index,
                    })}
                    ItemSeparatorComponent={() => (
                        <View style={{width: this.picItemSpacing}}/> // 垂直列表设置高度，水平列表设置宽度
                    )}
                />
            </View>
        );
    }

}
