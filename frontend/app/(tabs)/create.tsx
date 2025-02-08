import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

export default function Bookmark() {
    return (
        <View className="bg-primary flex-1 items-center justify-center">
            <Text className=' text-secondary font-latobold'>Create</Text>
            <StatusBar style='auto'/>
        </View>
    )
}