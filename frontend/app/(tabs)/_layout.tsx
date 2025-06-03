//@ts-nocheck
import { Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

// import house from '../../assets/icons/house.png'
import { house, bookmark, create, profile } from "../../constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
  Bookmark,
  UserRound,
  Search,
  House,
  MessageCircle,
  Bell,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchHeader = () => {
  return (
    <SafeAreaView edges={["top"]} className="bg-viridian-500">
      <View className="flex-row items-center bg-secondarylight mx-2 my-1 px-4 py-1 rounded-3xl">
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          className="text-white flex-1 ml-2"
        />
      </View>
    </SafeAreaView>
  );
};
const TabIcon = ({ focused, icon, name, color }) => {
  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 items-center justify-center w-full h-full">
        {icon && icon}
        {/* <Text
        className={`text-xs ${
          focused ? "font-latobold scale-110" : "font-lato"
          }`}
          style={{ color: color }}
          >
          {name}
          </Text> */}
        {focused && (
          <View className="absolute -bottom-6 h-1.5 w-1.5 bg-viridian-400 rounded-full" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default function TabLayout() {
  const { isLoading, loggedIn } = useGlobalContext();
  console.log(isLoading, loggedIn);
  if (!isLoading && !loggedIn) {
    router.replace("/(auth)/login");
  }
  return (
    <Tabs
      screenOptions={{
        // tabBarStyle: { display: "none" },
        headerShown: false,
        headerStyle: {
          backgroundColor: "#008C6E",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#31CFB6",
        tabBarStyle: {
          backgroundColor: "#ebf5f4",
          borderTopColor: "transparent",
          elevation: 0, // doesn't work in android
          // shadowOpacity: 0.5,
          boxShadowOpacity: 0.5,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          header: () => <SearchHeader />,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<House size={24} color={color} />}
              color={color}
              name="Home"
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#078c7f",
          tabBarStyle: {
            backgroundColor: "#ebf5f4",
            borderTopColor: "transparent",
            elevation: 0, // doesn't work in android
            shadowOpacity: 0.5,
            borderTopWidth: 2,
            height: 60,
          },
          //   tabBarIcon: ({ focused, color }) => (
          //     <TabIcon
          //       focused={focused}
          //       icon={bookmark}
          //       color={color}
          //       name="Bookmark"
          //     />
          //   ),
        }}
      /> */}

      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Search color={color} size={24} />}
              color={color}
              name="Discover"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notification",
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<Bell color={color} size={24} />}
              color={color}
              name="Notification"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<MessageCircle color={color} size={24} />}
              color={color}
              name="Message"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              focused={focused}
              icon={<UserRound color={color} size={24} />}
              color={color}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
