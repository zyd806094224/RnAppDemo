import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HorizontalListAnimationView} from './view/HorizontalListAnimationView';

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>自动滚动列表</Text>
            <HorizontalListAnimationView/>
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
