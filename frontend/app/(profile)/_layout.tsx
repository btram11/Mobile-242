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
    <GlobalProvider>
      <Stack>
        <Stack.Screen
          name="your-orders"
          options={{
            title: "Orders",
            headerShown: true,
            headerStyle: { backgroundColor: "#00664f" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="liked-books"
          options={{
            title: "Liked books",
            headerShown: true,
            headerStyle: { backgroundColor: "#00664f" },
            headerTintColor: "#fff",
            // headerTitleStyle: { color: "#ffffff" },
          }}
        />
        <Stack.Screen
          name="following"
          options={{
            title: "Following",
            headerShown: true,
            headerStyle: { backgroundColor: "#00664f" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{
            title: "Edit Profile",
            headerShown: true,
            headerStyle: { backgroundColor: "#00664f" },
            headerTintColor: "#fff",
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
    </GlobalProvider>
  );
}
