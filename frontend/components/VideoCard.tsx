//@ts-nocheck

import { Image, View, Text, TouchableOpacity } from "react-native";
import { play, verticalMenu } from "@/constants/icons"
import { useState } from "react";

export default function VideoCard({ post: { title, thumbnail, video, prompt, user: { username, avatar } } }) {
    const [play, setPlay] = useState(false)
    return (
        <View className="w-full h-full flex-1 justify-start items-center p-1">
            <View className="bg-secondarydark w-full rounded-lg p-2">
                <View className="bg-secondarylight w-full flex-row justify-stretch p-2 rounded-lg items-center">
                    <View className="w-full flex-row justify-start p-2 mb-2 rounded-lg items-center">
                        <Image source={{ uri: avatar }}
                            className="h-10 w-10 rounded-lg"
                            resizeMode="contain" />
                        <View className="px-2">
                            <Text className="font-latobold">{title}</Text>
                            <Text className="font-latolight">{username}</Text>
                        </View>
                    </View>
                    <View className="flex-1 bg-black">
                        <Image source={verticalMenu}
                            className="w-6 h-6 px-4"
                            resizeMode="contain" />
                    </View>

                </View>
                {play ?
                    <TouchableOpacity
                        onPress={() => setPlay(false)}>
                        <Text>Is playing...</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}>
                        <View className="w-full h-56 justify-center items-center">
                            <Image source={{ uri: thumbnail }}
                                className="w-full h-56 rounded-lg" />

                            <Image source={play}
                                className="w-8 h-8 absolute"
                                resizeMode="contain" />
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}