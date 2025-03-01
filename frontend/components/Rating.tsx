//@ts-nocheck

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function Rating({ rating, className }) {
    return (
        <View className="flex-row items-center">
            {rating >= 1 && <Ionicons name="star" size={20} color='#FFBB29' />}
            {rating >= 1.5  && rating < 2 && <Ionicons name="star-half-outline" size={20} color='#FFBB29' />}
            {(rating >= 2) && <Ionicons name="star" size={20} color='#FFBB29' />}
            {rating >= 2.5  && rating < 3 && <Ionicons name="star-half-outline" size={20} color='#FFBB29' />}
            {(rating >= 3) && <Ionicons name="star" size={20} color='#FFBB29' />}
            {rating >= 3.5  && rating < 4 && <Ionicons name="star-half-outline" size={20} color='#FFBB29' />}
            {(rating >= 4) && <Ionicons name="star" size={20} color='#FFBB29' />}
            {rating >= 4.5  && rating < 5 && <Ionicons name="star-half-outline" size={20} color='#FFBB29' />}
            {(rating >= 5) && <Ionicons name="star" size={20} color='#FFBB29' />}
            <Text className={`text-md ${className}`}>({rating})</Text>
        </View>
    )
}