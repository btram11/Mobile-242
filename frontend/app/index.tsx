//@ts-nocheck

import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { CustomInput } from "@/components/CustomInput";
import { CustomButtonLight } from "@/components/CustomRoundButton";
import { CustomButtonSecondary } from "@/components/CustomRoundButton";
import { FormField } from "@/components/FormField";

import { useState, useEffect } from "react";
import { router, Redirect, Link } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import RootLayout from "@/layouts/RootLayout";

import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoadingScreen from "./(loading)/loading";
import Onboarding2 from "./(onboarding)/onboarding2";
import Login from "./(auth)/login";
import { useSelector, useDispatch } from "react-redux";
import { setAuthData } from "@/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(true);
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        await validToken();
        const value = await AsyncStorage.getItem("ONBOARDED");
        setIsOnboarded(value === "true");
      } catch (error) {
        console.error("Error checking onboarding:", error);
      } finally {
        setIsLoading(false);
      }
    };
    // clearStorage();
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (loggedIn && !isLoading) {
      router.replace("../(tabs)/home");
    }
  }, [loggedIn, isLoading]);

  const validToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const userId = await AsyncStorage.getItem("userId");
      if (token) {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          dispatch(setAuthData({ userId, token }));
        }
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Storage cleared!");
    } catch (e) {
      console.error("Failed to clear storage:", e);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (!isOnboarded) {
    return <Onboarding2 />;
  }

  if (!loggedIn) {
    return <Login />;
  }
  return <></>;
}
