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
import { BookHeart, Package } from "lucide-react-native";

const buttons = [
  {
    text: "Liked Books",
    handlePress: () => {
      router.push("/(profile)/liked-books");
    },
    icon: <BookHeart size={22} color="#fff" />,
  },
  {
    text: "Your Orders",
    handlePress: () => {
      router.push("/(profile)/your-orders");
    },
    icon: <Package size={22} color="#fff" />,
  },
];

const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

function Profile() {
  useEffect(() => {
    // Set status bar color when entering this screen
    StatusBar.setBarStyle("light-content"); // Change to light for dark background
    StatusBar.setBackgroundColor("transparent"); // Dark color for status bar
    return () => {
      // Reset status bar to default when leaving screen
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#FFFFFF");
    };
  }, []);

  return (
    <View
      style={styles.container}
      className="flex bg-light flex-1 flex-col items-center gap-6"
    >
      <View
        style={[styles.profileHeader, {}]}
        className="flex flex-row items-center justify-center gap-5 px-4 bg-secondarydark"
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
            <Text className="font-medium text-xl text-white">Name</Text>
          </Pressable>
          <Link href={`/(profile)/following`} asChild>
            <Text className="text-xs text-white">Following</Text>
          </Link>
        </View>
      </View>
      <View className="flex flex-col gap-5 self-stretch flex-1 px-8 pt-4">
        {buttons.map((button, index) => (
          <CustomButtonPrimary
            key={index}
            style={{ margin: 0, elevation: 2 }}
            buttonStyle={`flex-row items-center justify-between px-5 `}
            textStyle={`text-white`}
            text={
              <View className="flex-row items-center ">
                {button.icon}
                <Text className="text-base font-medium ml-3 text-white">
                  {button.text}
                </Text>
              </View>
            }
            handlePress={button.handlePress}
          />
        ))}
      </View>
      <View className="self-stretch px-8 pb-8 pt-4">
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {}}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
