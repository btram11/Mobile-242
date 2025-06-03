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
        name="my-orders/(tabs)"
        options={{
          title: "Orders",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="my-sales/(tabs)"
        options={{
          title: "My Sales",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="my-sales/[listing_id]/index"
        options={{
          title: "Sale Detail",
          headerShadowVisible: false,
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

      <Stack.Screen
        name="my-sales/add/select-book"
        options={{
          title: "Select a book",
        }}
      />
      <Stack.Screen
        name="my-sales/add/fill-details"
        options={{
          title: "Return to select book",
        }}
      />
    </Stack>
  );
}
