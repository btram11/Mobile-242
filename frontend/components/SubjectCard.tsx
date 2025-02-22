//@ts-nocheck
import { TouchableOpacity, Text, View } from "react-native"

export default function SubjectCard({color, subject}) {
    return (
        <View>
            <TouchableOpacity style={{backgroundColor: color, height:80, width:100, padding:8, borderRadius: 16, margin: 4, justifyContent: 'center', alignItems: 'center'}}>
            <Text className="text-white font-bold text-lg" >{subject}</Text>
            </TouchableOpacity>
        </View>
    )
}