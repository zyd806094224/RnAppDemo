// HorizontalListPage.tsx
import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {HorizontalListAnimationView} from '../view/HorizontalListAnimationView';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {updateUserName} from "../store/userSlice";

export default function HorizontalListPage() {
    const name = useSelector((state: RootState) => state.user.name);
    const age = useSelector((state: RootState) => state.user.age);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <View style={styles.container}>
            <HorizontalListAnimationView/>
            <Text>姓名：{name}</Text>
            <Text>年龄：{age}</Text>
            <Button
                title="修改用户名"
                onPress={() => {
                    dispatch(updateUserName('修改了名称' + Date.now()))
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: "column"
    },
});
