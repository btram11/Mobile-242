// @ts-nocheck

import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Trending from '@/components/Trending'
import Header from '@/components/Header'
import EmptyState from '@/components/EmptyState'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import { Ionicons } from "@expo/vector-icons";

import SubjectCard from '@/components/SubjectCard'

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

    // return (
        // <View className="w-full h-full bg-primary flex-1 items-center justify-center">
        //     <Header />
        //     <FlatList
        //         // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        //         data={data}
        //         keyExtractor={(item) => (item.$id)}
        //         renderItem={({ item }) =>
        //         (
        //             <VideoCard post={item} />
        //         )
        //         }

        //         ListHeaderComponent={() => (
        //             <Trending />
        //         )}

        //         ListEmptyComponent={() => (
        //             <EmptyState
        //                 message="No videos found"
        //                 submessage="Be the first one to upload videos!"
        //             />
        //         )}

        //         className='w-full p-4'
        //     />
        //     <StatusBar style='auto' />
        // </View>
        
    // )

    return (
        <ScrollView className="bg-secondarydark flex-1 px-2 py-4">
          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-800 py-2 px-4 rounded-3xl">
            <Ionicons name="search-outline" size={20} color="gray" />
            <TextInput placeholder="Search" placeholderTextColor="gray" className="text-white flex-1 ml-2" />
          </View>
    
          {/* Subjects Section */}
          <View className="block relative h-{2em} w-full" style={{position: 'relative', height: 250}}>
            <Image source={require('@/assets/images/globe-books.png')} style={{position: 'absolute', width:240, height:240, bottom: -20, right: 0, zIndex: 1}} resizeMode='contain'/>
          </View>

        <View style={{backgroundColor: 'white', zIndex:0, borderRadius: 20, paddingHorizontal: 20}}>
        <Text className="text-primary text-lg font-semibold mt-6">Majors</Text>
          <Text className="text-gray-400 text-sm">Recommendations for you</Text>
    
          <View className="flex-row mt-3 space-x-3">
            <SubjectCard subject="Computer Science" color="orange"/>
            <SubjectCard subject="Chemistry" color="#3b82f6"/>
          </View>
    
          {/* Schedule Section */}
          <Text className="text-white text-lg font-semibold mt-6">Your Schedule</Text>
          <Text className="text-gray-400 text-sm">Next lessons</Text>
    
          <View className="bg-green-700 mt-3 p-4 rounded-lg">
            <Text className="text-white font-bold text-lg">Biology</Text>
            <Text className="text-white text-sm">Chapter 3: Animal Kingdom</Text>
            <Text className="text-white text-sm mt-1">📍 Room 2-158</Text>
            <Text className="text-white text-sm">👩‍🏫 Julie Watson</Text>
          </View>
        </View>
          
        </ScrollView>
      );
}