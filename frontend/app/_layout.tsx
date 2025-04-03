//@ts-nocheck

import { StyleSheet, Text, View } from "react-native";

// enable file-based routing
import { Slot } from "expo-router";

// alternative way to routing
import { Stack } from "expo-router";
import "@/global.css";

// import fonts
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GlobalProvider } from "@/context/GlobalProvider";
import { ModalProvider } from "@/context/ModalContext";
import ModalManager from "@/components/modal/ModalManager";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontLoaded, error] = useFonts({
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
    "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
    "Lato-BlackItalic": require("../assets/fonts/Lato-BlackItalic.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Lato-BoldItalic": require("../assets/fonts/Lato-BoldItalic.ttf"),
    "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
    "Lato-LightItalic": require("../assets/fonts/Lato-LightItalic.ttf"),
  });

  useEffect(() => {
    if (fontLoaded) {
      // hide the plash screen before the font is fully applied
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (error) {
    // Handle the error gracefully
    console.error(error);
    return <Text>Error loading fonts</Text>;
  }

  if (!fontLoaded) return null;

  return (
    <NavigationContainer>
      <GlobalProvider>
        <ModalProvider>
          <ModalManager />
          <Stack>
            <Stack.Screen
              name="index"
              options={{ title: "Homepage", headerShown: false }}
            />
            <Stack.Screen
              name="(auth)"
              options={{ title: "Authentication", headerShown: false }}
            />
            {/* <Stack.Screen
          name="(onboarding)"
          options={{ title: "Onboarding", headerShown: false }}
        /> */}
            <Stack.Screen
              name="(tabs)"
              options={{ title: "Tabs", headerShown: false }}
            />
            <Stack.Screen
              name="(profile)"
              options={{ title: "Profile", headerShown: false }}
            />
          </Stack>
        </ModalProvider>
      </GlobalProvider>
    </NavigationContainer>
  );
};

export default RootLayout;
