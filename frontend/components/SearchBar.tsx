//@ts-nocheck

import { CustomInput } from "./CustomInput"
import { View, TextInput, TouchableOpacity, Image } from "react-native"
import { useState } from "react";

import { search } from '@/constants/icons'

export default function SearchBar({ placeholder, value, handleTextChange, inputStyle = "", activeColor = "primary", inactiveColor = "primarydark" }) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View
            className={`bg-primarylight border-2 rounded-xl ${isFocused ? `border-white` : `border-primarydark`} w-full flex-row justify-stretch items-center`}>
            <TextInput
                placeholder={placeholder}
                // type={type}
                className={`text-primarydark w-full p-4 ${inputStyle}`}
                onChangeText={handleTextChange}
                onFocus={() => {
                    setIsFocused(true)
                    console.log(`border-${activeColor}`)
                }}
                onBlur={() => {
                    setIsFocused(false)
                    console.log(`border-${inactiveColor}`)
                }}
            >
            </TextInput>

            <View className="absolute right-0 p-4">
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
                    <Image source={search} className='w-6 h-6 text-primarydark' />
                </TouchableOpacity>
            </View>
        </View>
    )
}