//@ts-nocheck

import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { binoculars } from "@/constants/icons";

export default function EmptyState({ message, submessage }) {
    return (
        <View className="w-full h-full items-center justify-center">
            <Image source={binoculars}
                className="h-20 w-20"
                resizeMode="contain" />

            <Text className="text-white font-latobold text-4xl">{message}</Text>
            <Text className="text-primarylight font-lato text-lg">{submessage}</Text>
        </View>
    )
}