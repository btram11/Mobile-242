//@ts-nocheck
import { TouchableOpacity, Text, View, ImageBackground } from "react-native"

export default function SubjectCard({ color, subject }) {
    const path = '@/assets/images/button-' + color +'.png'
    if (color === 'green') {
    return (
        <View>
            <TouchableOpacity className="w-36 h-28 rounded-3xl bg-black m-2">
                <ImageBackground source={require('@/assets/images/button-green.png')} className="w-full h-full justify-end items-center pb-2" resizeMode="cover">
                    <Text className="text-primarydark font-bold text-lg" >{subject}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )}
    else if (color === 'blue') {
        return (
            <View>
                <TouchableOpacity className="w-36 h-28 rounded-3xl bg-black m-2">
                    <ImageBackground source={require('@/assets/images/button-blue.png')} className="w-full h-full justify-end items-center pb-2" resizeMode="cover">
                        <Text className="text-primarydark font-bold text-lg" >{subject}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )}
    else if (color === 'orange') {
        return (
            <View>
                <TouchableOpacity className="w-36 h-28 rounded-3xl bg-black m-2">
                    <ImageBackground source={require('@/assets/images/button-orange.png')} className="w-full h-full justify-end items-center pb-2" resizeMode="cover">
                        <Text className="text-primarydark font-bold text-lg" >{subject}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )}
    else if (color === 'red') {
        return (
            <View>
                <TouchableOpacity className="w-36 h-28 rounded-3xl bg-black m-2">
                    <ImageBackground source={require('@/assets/images/button-red.png')} className="w-full h-full justify-end items-center pb-2" resizeMode="cover">
                        <Text className="text-primarydark font-bold text-lg" >{subject}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )}
    else if (color === 'purple') {
        return (
            <View>
                <TouchableOpacity className="w-36 h-28 rounded-3xl bg-black m-2">
                    <ImageBackground source={require('@/assets/images/button-purple.png')} className="w-full h-full justify-end items-center pb-2" resizeMode="cover">
                        <Text className="text-primarydark font-bold text-lg" >{subject}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )}
}