// @ts-nocheck
import { TextInput, View, TouchableOpacity, Text, Alert } from "react-native";
import { CustomInput } from "../../components/CustomInput";
import { CustomButtonLight } from "../../components/CustomButton";
import { CustomButtonSecondary } from "../../components/CustomButton";

import { FormField } from "../../components/FormField"
import { useState } from "react";
import { router, Redirect } from "expo-router";

import { SafeAreaView } from 'react-native-safe-area-context'

import RootLayout from "@/layouts/RootLayout";

import { register } from '@/lib/appwrite'
import { useGlobalContext } from "@/context/GlobalProvider";

async function handleSignup(email: string, password: string, username: string) {
    console.log(email, password, username)

    if (!email || !password || !username) {
        Alert.alert('Error', 'Please fill all the fields')
    }

    // check other error, like password length, email uniqueness, etc

    await register(email, password, username)
    router.push('./login')
}

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    return (
        <RootLayout>
            <View className="items-center justify-center h-full w-full flex-1">

                <FormField name="Username" value={username} placeholder="John Doe" handleTextChange={(e) => { setUsername(e) }} labelColor="" inputStyle="" />

                <FormField name="Email" value={email} placeholder="abd@gmail.com" handleTextChange={(e) => { setEmail(e) }} labelColor="" inputStyle="" />

                <FormField name="Password" value={password} placeholder="At least 8 characters." handleTextChange={(e) => { setPassword(e) }} labelColor="" inputStyle="" />

                <CustomButtonSecondary text="Sign Up" buttonStyle="px-8" textStyle="" handlePress={() => handleSignup(email, password, username)} />

                <View className='flex-row justify-center items-center'>
                    <Text className="text-white">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('./login')}> <Text className="text-secondarydark font-bold underline">Login</Text> </TouchableOpacity>
                </View>
            </View>
        </RootLayout>   

    )
}