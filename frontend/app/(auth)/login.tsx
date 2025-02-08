//@ts-nocheck

import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { CustomInput } from "../../components/CustomInput";
import { CustomButtonLight } from "../../components/CustomButton";
import { CustomButtonSecondary } from "../../components/CustomButton";

import { FormField } from "../../components/FormField"
import { useState } from "react";
import { router, Redirect, Link } from "expo-router";

import { SafeAreaView } from 'react-native-safe-area-context'

import RootLayout from '@/layouts/RootLayout'

import { login } from '@/lib/appwrite'
import { useGlobalContext } from "@/context/GlobalProvider";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser, setLoggedIn } = useGlobalContext()

    async function handleLogIn() {
        try {
            console.log("Attempt to log in...")
            const loggedInUser = await login(email, password)
            setUser(loggedInUser)
            setLoggedIn(true)
            router.replace('../(tabs)/home')
        }
        catch (error) {
            console.error('Error logging in:', error);
            throw new Error(error.message || 'Unknown error occurred');
        }
    }
    
    return (
        <RootLayout>
            <View className="items-center justify-center h-full w-full flex-1">

                <FormField name="Email" value={email} placeholder="John Doe" handleTextChange={(e) => { setEmail(e) }} labelColor="" inputStyle="" />

                <FormField name="Password" value={password} placeholder="At least 8 characters." handleTextChange={(e) => { setPassword(e) }} labelColor="" inputStyle="" />

                <CustomButtonSecondary text="Login" buttonStyle="px-8" textStyle="" handlePress={() => handleLogIn()} />

                <View className="flex-row justify-center items-center">
                    <Text className="text-white">Don't have an account? </Text>
                    {/* <TouchableOpacity onPress={() => router.push('./signup')}> 
                        <Text className="text-secondarydark font-bold underline">Sign up</Text> 
                    </TouchableOpacity> */}
                    <Link href="./signup" className="text-secondarydark font-bold underline">Sign up</Link>
                </View>

            </View>
        </RootLayout>

    )
}