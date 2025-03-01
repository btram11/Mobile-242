//@ts-nocheck

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function Rating({ rating }) {
    return (
        <View className="flex-row items-center">
            <Ionicons name="star" size={20} color='#FFBB29' />
            <Text className="text-sm">{rating}</Text>
        </View>
    )
}