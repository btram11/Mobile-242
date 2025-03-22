//@ts-nocheck

import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { CustomInput } from "@/components/CustomInput";
import { CustomButtonPrimary } from "@/components/CustomRoundButton";

import { FormField2 } from "../../components/FormField";
import { useState } from "react";
import { router, Redirect, Link } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import AuthLayout from "@/layouts/AuthLayout";

import { login } from "@/api/auth";
import { useGlobalContext } from "@/context/GlobalProvider";
import { lock, user } from "@/constants/icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setLoggedIn } = useGlobalContext();

  async function handleLogIn() {
    try {
      console.log("Attempt to log in...");
      try {
        const loggedInUser = await login(email, password);
        router.replace("../(tabs)/home");
      } catch (exception) {
        console.log(exception);
      }
      // setUser(1);
      // setLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(error.message || "Unknown error occurred");
    }
  }

  return (
    <AuthLayout>
      <View className="items-center justify-end h-full w-full flex-col flex">
        <View className="flex h-1/4 items-end justify-end"></View>
        <View className="flex h-[43%] items-center justify-center">
          <Text className="font-black text-2xl mb-14">LOG IN</Text>
          <View className="flex flex-col gap-12">
            <FormField2
              name="Email"
              value={email}
              placeholder="John Doe"
              handleTextChange={(e) => {
                setEmail(e);
              }}
              icon={user}
            />

            <FormField2
              name="Password"
              value={password}
              placeholder="At least 8 characters."
              handleTextChange={(e) => {
                setPassword(e);
              }}
              icon={lock}
            />
          </View>
        </View>
        <View className="flex flex-row h-1/3 items-center justify-center px-8">
          <CustomButtonPrimary
            style={{ borderRadius: 100 }}
            text="LOGIN"
            buttonStyle="px-8 bg-[#00664F] flex-1 items-center mt-10"
            textStyle=""
            handlePress={() => handleLogIn()}
          />
        </View>
      </View>
    </AuthLayout>
  );
}
