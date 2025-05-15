import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HorizontalListAnimationView} from './view/HorizontalListAnimationView';
import MarqueeHorizontal, {deviceWidth, Direction, MarqueeType} from "./view/MarqueeHorizontal";
import {height, width} from "./styles";

const App = () => {

    //以下跑马灯轮播数据源构建
    let strLen = 0;
    let list: Array<string> = ['11111111', '22222222', '3333333'];
    list.forEach((item, i) => {
        strLen += item.length;
    });
    let contentLength = strLen * width(14) + list.length * deviceWidth + deviceWidth //所有字符的宽度 加上所有字符组的size*屏幕宽度
    console.log('长度' + contentLength)
    let showList = list.map((item) => {
        return { value: item }
    })
    //以上跑马灯轮播数据源构建

    return (
        <View style={styles.container}>
            <Text style={styles.title}>自动滚动列表</Text>
            <HorizontalListAnimationView/>
            <View>
                <MarqueeHorizontal
                    // ref={ref => (this.mq = ref)}
                    data={showList}
                    type={MarqueeType.Simple}
                    delay={300}
                    duration={5000}
                    speed={100}
                    itemMaxWidth={1024}
                    direction={Direction.Left}
                    autoPlay={true}
                    useNativeDriver={false}
                    width={width(360)}
                    height={height(42)}
                    iterations={-1} //循环次数
                    separator={deviceWidth}
                    // reverse={true}
                    isEndToEnd={false}
                    contentLength={contentLength}
                    onClick={item => {
                        if (item == null) {
                            return;
                        }
                    }}
                    textStyle={{
                        fontSize: width(24),
                        color: '#000000',
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f5f5f5',
        flexDirection: 'column'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    }
});

export default App;
