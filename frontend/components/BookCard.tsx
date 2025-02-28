//@ts-nocheck

import { Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Rating from '@/components/Rating'
import '@/global.css'

export default function BookCard({ title, img_src, rating, price, is_leased, is_sold, color }) {
    // rating: 5 scale
    if (color === 'gray') {
        return (
            <View className='bg-gray-200 rounded-lg shadow-md p-4 m-2 w-44'>
                <Image source={img_src} className='w-36 h-36 rounded-lg bg-white' resizeMode='contain' />
                <Text className='text-xll font-bold text-center'>{title}</Text>
                <Text className='text-lg font-latobold text-lightred text-center'>${price}</Text>
                {is_leased && !is_sold && <Text className='text-sm font-lato text-gray-500 text-center'>Leased</Text>}
                {is_sold && !is_leased && <Text className='text-sm font-lato text-gray-500 text-center'>Sold</Text>}
                {is_sold && is_leased && <Text className='text-sm font-lato text-gray-500 text-center'>Leased/Sold</Text>}
            </View>
        )
    }
    else if (color === 'green') {
        return (
            <View className='bg-secondarylight rounded-lg shadow-md p-4 m-2 w-44'>
                <Image source={img_src} className='w-36 h-36 rounded-lg bg-white' resizeMode='contain' />
                <Text className='text-xll font-bold text-center'>{title}</Text>
                <Text className='text-lg font-latobold text-lightred text-center'>${price}</Text>
                {is_leased && !is_sold && <Text className='text-sm font-lato text-gray-500 text-center'>Leased</Text>}
                {is_sold && !is_leased && <Text className='text-sm font-lato text-gray-500 text-center'>Sold</Text>}
                {is_sold && is_leased && <Text className='text-sm font-lato text-gray-500 text-center'>Leased/Sold</Text>}
            </View>
        )
    }
}