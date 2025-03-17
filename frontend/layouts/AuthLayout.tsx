import { View, Text, ImageBackground, useWindowDimensions } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import React from "react";

export default function AuthLayout({ children }) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("@/assets/images/Background.png")}
        resizeMode="cover"
        // className="flex-1 w-full h-full"
        style={{ flex: 1, width, height: height + insets.top }}
      >
        <SafeAreaView
          style={{ width: width, height: height }}
          className="flex flex-1 items-center justify-center p-0 m-0"
        >
          {children}
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}
