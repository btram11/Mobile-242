// @ts-nocheck
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { logo1 } from "../../constants/logos";
import { Stack, router } from "expo-router";
import { GlobalProvider } from "@/context/GlobalProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function AuthLayout() {
    const { loggedIn, isLoading } = useGlobalContext()
    if (loggedIn && !isLoading) {
        router.replace('/(tabs)/home')
    }
    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name='login' options={{ title: "Login", headerShown: true }} />
                <Stack.Screen name='signup' options={{ title: "Sign Up", headerShown: true }} />
            </Stack>
        </GlobalProvider>
    )
}
