//@ts-nocheck
import { View, Text } from 'react-native'

export default function LoadingScreen() {
    return (
        <View className="items-center justify-center h-full w-full flex-1">
            <Text className="text-primary">Loading...</Text>
        </View>
    )
}