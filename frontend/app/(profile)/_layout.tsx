// @ts-nocheck
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { logo1 } from "../../constants/logos";
import { Stack, router } from "expo-router";
import { GlobalProvider } from "@/context/GlobalProvider";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useHideTabBar } from "@/hooks/useHideTabBar";
import { NavigationContainer } from "@react-navigation/native";

export default function ProfileLayout() {
  const { loggedIn, isLoading } = useGlobalContext();
  //   useHideTabBar();
  if (loggedIn && !isLoading) {
    router.replace("/(tabs)/home");
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#008C6E" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="your-orders"
        options={{
          title: "Orders",
        }}
      />
      <Stack.Screen
        name="liked-books"
        options={{
          title: "Liked books",
          // headerTitleStyle: { color: "#ffffff" },
        }}
      />
      <Stack.Screen
        name="following"
        options={{
          title: "Following",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          headerTitleAlign: "left",
          // headerLeftContainerStyle: { marginLeft: -20 },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Saved!")}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
