// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { Link } from "expo-router";

import "./global.css";
// import { Redirect, router } from "expo-router";

// import HomeScreen from "./app/(auth)/login"
import HomeScreen from "./app/index";
import { useEffect, useState } from "react";
import LoadingScreen from "./app/(loading)/loading";
import { Redirect } from "expo-router";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "#000",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "Lato-Regular",
//   },
// });

export default function App() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  const getStorage = async () => {
    const value = await AsyncStorage.getItem("ONBOARDED");
    console.log("VALUE:::", value);
    setOnboarded(value === "true");
  };

  useEffect(() => {
    getStorage();
  }, []);

  if (onboarded === null) {
    return <LoadingScreen />;
  }
  if (!onboarded) {
    return <Redirect href="./(onboarding)/onboarding2" />;
  }

  return <HomeScreen />;
}
