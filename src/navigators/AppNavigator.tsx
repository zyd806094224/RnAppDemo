// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import HorizontalListPage from '../screens/HorizontalListPage';
import MarqueeHorizontalPage from '../screens/MarqueeHorizontalPage';

export type RootStackParamList = {
    Home: undefined;
    HorizontalList: undefined;
    MarqueeHorizontal: undefined;
};

// @ts-ignore
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: '主页' }} />
                <Stack.Screen name="HorizontalList" component={HorizontalListPage} options={{ title: '水平列表动画' }} />
                <Stack.Screen name="MarqueeHorizontal" component={MarqueeHorizontalPage} options={{ title: '跑马灯效果' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
