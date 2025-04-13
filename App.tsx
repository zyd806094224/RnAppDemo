import React, { useRef, useEffect } from 'react';
import {View, FlatList, Animated, Dimensions, Text, StyleSheet, ToastAndroid} from 'react-native';
import {it} from "@jest/globals";

const App = () => {
  // 测试数据
  const testData = [
    { id: '1', color: '#FF5733', title: '项目1' ,size: 1,width:Dimensions.get('window').width * 0.5},
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const itemWidth = Dimensions.get('window').width * 0.5; // 每个项目宽度为屏幕宽度的80%
  const scrollPosition = useRef(0);

  function _genTestData(){
    let size = testData[0].size;
    let itemWidth = testData[0].width;
    let width = size * itemWidth;
    if(width <= Dimensions.get('window').width){
      ToastAndroid.show("123",1000)
      testData.unshift({id: '0',color: '#ffffff',title: '前部分填充',size: 1,width: Dimensions.get('window').width - itemWidth});
      testData.push({id: '2',color: '#ffffff',title: '',size: 1,width: Dimensions.get('window').width - itemWidth});
    }else{
      ToastAndroid.show("456",1000)
      testData.push({id: '2',color: '#ffffff',title: '',size: 1,width: 0});
    }
  }

  let isStart : boolean = true;

  // 自动滚动效果
  useEffect(() => {
    _genTestData();
    const interval = setInterval(() => {
      if(isStart){
        flatListRef.current?.scrollToEnd({ animated: true });
        // flatListRef.current?.scrollToOffset({
        //   offset: 2 * itemWidth,
        //   animated: true,
        //   duration: 2000 // 最大2秒
        // });
        isStart = false;
      }else{
        scrollPosition.current = 0;
        flatListRef.current?.scrollToOffset({
          offset: scrollPosition.current,
          animated: true,
        });
        // flatListRef.current?.scrollToOffset({
        //   offset: 0,
        //   animated: true,
        //   duration: 2000 // 最大2秒
        // });
        isStart = true
      }

      // scrollPosition.current += itemWidth;
      //
      // // 如果滚动到末尾，回到开头
      // if (scrollPosition.current >= itemWidth * testData.length) {
      //   scrollPosition.current = 0;
      // }
      //
      // flatListRef.current?.scrollToOffset({
      //   offset: scrollPosition.current,
      //   animated: true,
      // });
      // flatListRef.current?.scrollToEnd({ animated: true });
    }, 1000); // 每2秒滚动一次

    return () => clearInterval(interval);
  }, []);

  let width = 0;

  return (
      <View style={styles.container}>
        <Text style={styles.title}>自动滚动列表</Text>

        <Animated.FlatList
            ref={flatListRef}
            data={testData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const views = [];
              if(item.id == '1'){
                for (let i = 0; i < item.size; i++) {
                  width += styles.item.width;
                  views.push(<View style={[styles.item, {backgroundColor: item.color}]}>
                    <Text style={styles.itemText}>{item.title + i}</Text>
                  </View>);
                }
              }else{
                views.push(<View style={{width: item.width,height: 200,backgroundColor: '#00ff00'}}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>);
              }

              return <View style={{flexDirection: 'row'}}>{views}</View>;
            }
            }
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            // contentContainerStyle={styles.listContent}
        />

       {/* <View style={styles.indicatorContainer}>
          {testData.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * itemWidth,
                index * itemWidth,
                (index + 1) * itemWidth,
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
                <Animated.View
                    key={index}
                    style={[styles.indicator, { opacity }]}
                />
            );
          })}
        </View>*/}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 2, // 居中显示
  },
  item: {
    width: Dimensions.get('window').width * 0.5,
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  item2: {
    width: 0,
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  itemText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
});

export default App;
