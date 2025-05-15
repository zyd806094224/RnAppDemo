// HomeScreen.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Button
                title="跳转到 HorizontalListAnimationView"
                onPress={() => navigation.navigate('HorizontalList')}
            />
            <View style={styles.spacing} />
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
