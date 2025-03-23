//@ts-nocheck

import {
  Modal,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        setModalVisible(true);
        setErrorMessage(exception.message || "Unknown error occurred");
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
      <Modal
        style={{ height: Dimensions.get("screen").height }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg shadow-lg w-4/5">
            <Text className="text-lg font-bold text-red-600">Error</Text>
            <Text className="mt-2 text-gray-700">{errorMessage}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 bg-red-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AuthLayout>
  );
}
