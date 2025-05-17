// MarqueeHorizontalPage.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MarqueeHorizontal from '../view/MarqueeHorizontal';

export default function MarqueeHorizontalPage() {
    const data = [
        { value: '滚动文字示例1' },
        { value: '滚动文字示例2' },
        { value: '滚动文字示例3' },
    ];

    return (
        <View style={styles.container}>
            <MarqueeHorizontal
                data={data}
                autoPlay={true}
                duration={5000}
                width={300}
                height={50}
                type={'Swiper'}
                direction={'left'}
                isEndToEnd={false}
                useNativeDriver={false}
                separator={20}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
