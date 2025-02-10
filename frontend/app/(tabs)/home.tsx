// @ts-nocheck

import { View, Text, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Trending from '@/components/Trending'
import Header from '@/components/Header'
import EmptyState from '@/components/EmptyState'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'

export default function HomePage() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        () => {
            setIsLoading(true)
            getAllPosts()
                .then((data) => {
                    console.log(data)
                    setData(data)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        throw Error("Error catched in HomePage(): ", error)
                    }
                )
                .finally(
                    setIsLoading(false)
                )
        }, []
    )

    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefresh = async () => {
        setIsRefreshing(true)
        const newData = await fetchData()
        setData(newData)
        setIsRefreshing(false)
    }
    return (
        <View className="w-full h-full bg-primary flex-1 items-center justify-center">
            {/* <Text className=' text-secondary font-latobold'>Homepage</Text> */}
            <Header />
            <FlatList
                // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                data={data}
                keyExtractor={(item) => (item.$id)}
                renderItem={({ item }) =>
                (
                    <VideoCard post={item} />
                )
                }

                ListHeaderComponent={() => (
                    <Trending />
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        message="No videos found"
                        submessage="Be the first one to upload videos!"
                    />
                )}

                className='w-full p-4'
            />
            <StatusBar style='auto' />
        </View>
    )
}