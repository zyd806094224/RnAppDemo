// HorizontalListPage.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HorizontalListAnimationView } from '../view/HorizontalListAnimationView';

export default function HorizontalListPage() {
    return (
        <View style={styles.container}>
            <HorizontalListAnimationView />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
