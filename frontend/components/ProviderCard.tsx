//@ts-nocheck

import { Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Rating from '@/components/Rating'
import '@/global.css'

export default function ProviderCard({ name, img_src, description, rating, color }) {
    // rating: 5 scale
    if (color === 'gray') {
        return (
            <View className='bg-gray-200 rounded-lg shadow-md p-4 m-2 w-44'>
                <Image source={img_src} className='w-36 h-36 rounded-full bg-white' resizeMode='cover' />
                <Text className='text-lg font-bold text-center'>{name}</Text>
                <Text className='text-sm font-lato text-center text-gray-500'>{description}</Text>
                <Text className='text-sm font-lato text-center'>Rating: {rating}</Text>
            </View>
        )
    }
    else if (color === 'blue') {
        return (
            <View className='bg-lightblue rounded-lg shadow-md p-4 m-2 w-44'>
                <Image source={img_src} className='w-full h-36 rounded-full bg-white' resizeMode='cover' />
                <Text className='text-lg font-bold text-center'>{name}</Text>
                <Text className='text-sm font-lato text-center text-gray-500'>{description}</Text>
                <Text className='text-sm font-lato text-center'>Rating: {rating}</Text>
            </View>
        )
    }
}