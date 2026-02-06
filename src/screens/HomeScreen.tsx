// HomeScreen.tsx
import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {RootStackParamList} from '../navigators/AppNavigator';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from "react-redux";
import {RootState} from "../store";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const name = useSelector((state: RootState) => state.user.name);
    const age = useSelector((state: RootState) => state.user.age);
    return (
        <View style={styles.container}>
            <Text>姓名：{name}</Text>
            <Text>年龄：{age}</Text>
            <Button
                title="跳转到 HorizontalListAnimationView"
                onPress={() => navigation.navigate('HorizontalList')}
            />
            <View style={styles.spacing}/>
            <Button
                title="跳转到 MarqueeHorizontal"
                onPress={() => navigation.navigate('MarqueeHorizontal')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    spacing: {
        height: 20,
    },
});
