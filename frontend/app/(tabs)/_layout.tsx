//@ts-nocheck
import { Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";

// import house from '../../assets/icons/house.png'
import { house, bookmark, create, profile } from "../../constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Bookmark, UserRound, Search, House } from "lucide-react-native";
import "@/global.css";

const TabIcon = ({ focused, name, color, icon }) => {
  return (
    <View className="flex-1 items-center justify-center">
      {/* {iconImage && (
        <Image
          source={iconImage}
          className={`w-6 h-6 ${focused ? "scale-110" : "scale-100"}`}
          tintColor={color}
        />
      )} */}
      {icon && icon}
      <Text
        className={`text-xs ${
          focused ? "font-latobold scale-110" : "font-lato"
        }`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
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
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#078c7f",
        tabBarStyle: {
          backgroundColor: "#ebf5f4",
          borderTopColor: "transparent",
          elevation: 0, // doesn't work in android
          // shadowOpacity: 0.5,
          boxShadowOpacity: 0.5,
          borderTopWidth: 2,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
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
