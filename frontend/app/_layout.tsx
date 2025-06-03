//@ts-nocheck

import { StyleSheet, Text, View } from "react-native";

// enable file-based routing
import { Slot } from "expo-router";

// alternative way to routing
import { Stack } from "expo-router";
import "@/global.css";
import * as Sentry from "@sentry/react-native";

// import fonts
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GlobalProvider } from "@/context/GlobalProvider";
import { ModalProvider } from "@/context/ModalContext";
import ModalManager from "@/components/modal/ModalManager";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/store";
import RouteWatcher from "@/components/BookRouteWatcher";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://523b854f2b046b91a4100dfb56dc4a98@o4509399187783680.ingest.us.sentry.io/4509399193092096",
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

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
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <ModalProvider>
              <ModalManager />
              <RouteWatcher />
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: "#008C6E",
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              >
                <Stack.Screen
                  name="index"
                  options={{ title: "Homepage", headerShown: false }}
                />
                <Stack.Screen
                  name="providers/[provider_id]"
                  options={{
                    headerShown: true,
                    title: "",
                  }}
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
                {/* <Stack.Screen
                  name="discover/[category]"
                  options={{
                    headerShown: true,
                  }}
                /> */}
                <Stack.Screen
                  name="book-info/[book_id]/index"
                  options={{
                    headerShown: true,
                    title: "Book Info",
                  }}
                />
                <Stack.Screen
                  name="book-info/[book_id]/rent"
                  options={{
                    headerShown: true,
                    title: "",
                  }}
                />
                <Stack.Screen
                  name="book-info/[book_id]/listings"
                  options={{
                    headerShown: true,
                    title: "",
                  }}
                />

                <Stack.Screen
                  name="payment/confirm"
                  options={{
                    headerShown: true,
                    title: "Confirm Your Order",
                    headerTitleAlign: "center",
                  }}
                />
                <Stack.Screen
                  name="payment/success"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="order-details/[id]"
                  options={{
                    headerShown: true,
                    title: "Order Details",
                  }}
                />
                <Stack.Screen
                  name="upload"
                  options={{
                    headerShown: true,
                    title: "Upload Book",
                  }}
                />
              </Stack>
            </ModalProvider>
          </GlobalProvider>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default Sentry.wrap(RootLayout);
