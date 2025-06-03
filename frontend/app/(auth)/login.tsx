//@ts-nocheck

import {
  Modal,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { CustomInput } from "@/components/CustomInput";
import { CustomButtonPrimary } from "@/components/CustomRoundButton";

import { FormField2 } from "../../components/FormField";
import { useEffect, useState } from "react";
import { router, Redirect, Link } from "expo-router";
import { useForm, Controller, set } from "react-hook-form";

import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

import AuthLayout from "@/layouts/AuthLayout";

import { login } from "@/services/auth";
import { useGlobalContext } from "@/context/GlobalProvider";
import { lock, user } from "@/constants/icons";
import { useModal } from "@/context/ModalContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { setAuthData } from "@/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const { openModal } = useModal();
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await login(email, password);
    },
    onSuccess: async (data) => {
      const { userId, access_token } = data;
      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("userId", userId);
      dispatch(setAuthData({ userId, access_token }));
      router.replace("../(tabs)/home");
    },
    onError: (error: any) => {
      openModal("ErrorModal", {
        errorMessage: error.message || "Unknown error occurred",
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <AuthLayout>
      {loginMutation.isPending && (
        <Modal statusBarTranslucent={true} transparent={true} visible={true}>
          <View className="flex-1 justify-center items-center bg-black/40">
            <ActivityIndicator size={36} color="#00664F" />
          </View>
        </Modal>
      )}
      <View className="items-center justify-end h-full w-full flex-col flex">
        <View className="flex h-1/4 items-end justify-end"></View>
        <View className="flex h-[43%] items-center justify-center">
          <Text className="font-black text-2xl mb-14">LOG IN</Text>
          <View className="flex flex-col gap-12">
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField2
                  name="Email"
                  value={value}
                  placeholder="example@hcmut.edu.vn"
                  handleTextChange={onChange}
                  icon={user}
                  errors={errors.email}
                  numberOfLines={1}
                  maxLength={50}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField2
                  name="Password"
                  value={value}
                  placeholder="At least 8 characters."
                  handleTextChange={onChange}
                  icon={lock}
                  errors={errors.password}
                  maxLength={50}
                />
              )}
            />
          </View>
        </View>
        <View className="flex flex-row h-1/3 items-center justify-center px-8">
          <CustomButtonPrimary
            style={{ borderRadius: 100 }}
            text="LOGIN"
            buttonStyle="px-8 bg-[#00664F] flex-1 items-center mt-10"
            textStyle=""
            handlePress={handleSubmit(loginMutation.mutate)}
          />
        </View>
      </View>
    </AuthLayout>
  );
}
