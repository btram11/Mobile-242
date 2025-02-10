import { View, Text, Image } from "react-native";
import { logo1 } from "@/constants/logos"
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Header() {
    const [searchVideo, setSearchVideo] = useState("")
    return (
        <View className="w-full bg-primarydark justify-start items-center">
            <View className="w-full flex-row justify-stretch items-center">
                <View className="p-4">
                    <Text className="font-latolight text-white">Welcome Back</Text>
                    <Text className="font-latobold text-white text-2xl">User</Text>
                </View>

                <View className="flex-1 p-2 items-end">
                    <Image source={logo1}
                        className="h-16 w-44"
                        resizeMode="contain" />
                </View>
            </View>
            <View className="px-4 pb-4">
                <SearchBar placeholder="What do you want to see next?" value={searchVideo}
                    handleTextChange={() => {}} 
                    activeColor="white" 
                    inactiveColor="primarydark" />
            </View>
        </View>
    )
}