// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomButtonLight,
  CustomButtonPrimary,
} from "@/components/CustomSquareButton";
import { router, Redirect, Link } from "expo-router";
import { BookHeart, Package, ReceiptText } from "lucide-react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProviderById } from "@/services/provider";

const buttons = [
  // {
  //   text: "Liked Books",
  //   handlePress: () => {
  //     router.push("/(profile)/liked-books");
  //   },
  //   icon: <BookHeart size={22} color="#31CFB6" />,
  // },
  // {
  //   text: "My Orders",
  //   handlePress: () => {
  //     router.push("/(profile)/my-orders");
  //   },
  //   icon: <Package size={22} color="#31CFB6" />,
  // },
  {
    text: "My Sales",
    handlePress: () => {
      router.push("/(profile)/my-sales/(tabs)/listed");
    },
    icon: <ReceiptText size={22} color="#31CFB6" />,
  },
];

const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

function Profile() {
  const { data: provider } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const providerId = await AsyncStorage.getItem("userId");
      if (!providerId) {
        throw new Error("Provider ID not found in AsyncStorage");
      }
      return await getProviderById(providerId);
    },
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    mutationKey: ["logout"],
    onSuccess: () => {
      // Handle success
    },
    onError: (error) => {
      // Handle error
      console.error("Mutation error:", error);
    },
    onSettled: async () => {
      // Handle settled state
      await AsyncStorage.clear();
      router.replace("/(auth)/login");
    },
  });
  useEffect(() => {
    // Set status bar color when entering this screen
    StatusBar.setBarStyle("light-content"); // Change to light for dark background
    StatusBar.setBackgroundColor("transparent"); // Dark color for status bar
    return () => {
      // Reset status bar to default when leaving screen
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("transparent"); // Android only
      StatusBar.setTranslucent(true);
    };
  }, []);

  return (
    <View
      style={styles.container}
      className="flex bg-light flex-1 flex-col items-center gap-4"
    >
      <View
        style={[styles.profileHeader, {}]}
        className="flex flex-row items-center justify-center gap-5 px-4 bg-viridian-500"
      >
        <Pressable
          style={styles.profileImage}
          onPress={() => router.push("/(profile)/edit-profile")}
        >
          <Image
            style={styles.profileImage}
            source={require("@/assets/images/avatar3.jpg")}
            resizeMode="contain"
          />
        </Pressable>
        <View
          style={[styles.profileInfo]}
          className="flex flex-1 justify-center text-lg gap-2 "
        >
          <Pressable onPress={() => router.push("/(profile)/edit-profile")}>
            <Text className="font-medium text-xl text-white">
              {provider?.provider_name || "Your Name"}
            </Text>
          </Pressable>
          {/* <Link href={`/(profile)/following`} asChild>
            <Text className="text-xs text-white">Following</Text>
          </Link> */}
        </View>
      </View>

      <View className="flex flex-col gap-2 self-stretch flex-1">
        {buttons.map((button, index) => (
          <Pressable
            key={index}
            onPress={button.handlePress}
            className="px-8 bg-white flex flex-row h-[70px] items-center"
          >
            <View className="flex-row items-center ">
              {button.icon}
              <Text className="text-base font-medium ml-3 text-viridian-400">
                {button.text}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View className="self-stretch px-8 pb-8 pt-4">
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logoutMutation.mutate}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 15,
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    paddingTop: statusBarHeight + 10,
    alignSelf: "stretch",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  profileImage: {
    width: 54,
    height: 54,
    aspectRatio: 1,
  },
  profileInfo: {
    justifyContent: "space-between",
  },
  buttonIcon: {
    width: 22,
    height: 22,
  },
  logoutButton: {
    backgroundColor: "#fef2f2", // nhạt nhẹ
    borderWidth: 1,
    borderColor: "#fca5a5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 1,
  },
  logoutText: {
    color: "#ef4444", // đỏ tươi
    fontSize: 15,
    fontWeight: "600",
  },
});
