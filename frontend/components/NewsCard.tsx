//@ts-nocheck

import { Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Rating from '@/components/Rating'
import '@/global.css'

export default function NewsCard({ title, img_src, summary, color }) {
    // rating: 5 scale
    if (color === 'gray') {
        return (
            <View className='bg-gray-200 rounded-lg shadow-md p-4 m-2 w-64'>
                <Image source={img_src} className='w-full h-36 rounded-lg bg-white' resizeMode='cover' />
                <Text className='text-lg font-bold text-center'>{title}</Text>
                <Text className='text-sm font-lato text-center text-gray-500'>{summary}</Text>
            </View>
        )
    }
    else if (color === 'orange') {
        return (
            <View className='bg-lightorange rounded-lg shadow-md p-4 m-2 w-64'>
                <Image source={img_src} className='w-full h-36 rounded-lg bg-white' resizeMode='cover' />
                <Text className='text-lg font-bold text-center'>{title}</Text>
                <Text className='text-sm font-lato text-gray-500 text-center'>{summary}</Text>
            </View>
        )
    }
}