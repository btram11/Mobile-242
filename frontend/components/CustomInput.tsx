//@ts-nocheck

import { TextInput, View, TouchableOpacity, Text, Image } from 'react-native';
import { useState } from 'react';

import { eye, eyeHide } from '../constants/icons';
import { search } from '../constants/icons';

const CustomInput = ({ name, value, placeholder, handleTextChange, inputStyle=""}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View
        className={`border-2 rounded-xl ${isFocused ? 'border-primarydark' : 'border-primary'} w-full flex-row justify-stretch items-center`}>
            <TextInput
                placeholder={placeholder}
                // type={type}
                className={`text-primarydark w-full p-4 ${inputStyle}`}
                onChangeText={handleTextChange}
                onFocus={() => {setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}
                secureTextEntry={name === 'Password' && !showPassword}
            >
            </TextInput>

            {name === 'Password' && (
                <View className="absolute right-0 p-4">
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
                        <Image source={showPassword ? eye : eyeHide} className='w-6 h-6 text-primarydark'/>
                    </TouchableOpacity>
                </View>
            )}

            {name === 'Search' && (
                <View className="absolute right-0 p-4">
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
                        <Image source={search} className='w-6 h-6 text-primarydark'/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export { CustomInput }