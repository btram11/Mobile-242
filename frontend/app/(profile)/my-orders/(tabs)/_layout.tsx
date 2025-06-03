import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
const { Navigator } = createMaterialTopTabNavigator();
// export const Tabs = createMaterialTopTabNavigator();
// const MaterialTopTab = withLayoutContext(Navigator);
export const Tabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MySalesLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="in-progress"
        screenOptions={{
          lazy: true,
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
          tabBarActiveTintColor: "#B4FDFA",
          tabBarInactiveTintColor: "#fffff3",
          tabBarIndicatorStyle: {
            backgroundColor: "#B4FDFA",
            height: 3,
            borderRadius: 1.5,
          },
          tabBarStyle: { backgroundColor: "#008C6E" },
          // tabBarScrollEnabled: true,
          tabBarPressColor: "transparent",
          tabBarPressOpacity: 1,
          tabBarItemStyle: {
            height: 45,
            // width: "auto",
            // paddingHorizontal: 24,
          },
        }}
      >
        {/* <Tabs.Screen
          name="listed"
          options={{ title: "Listed" }}
          // component={ListedTab}
        /> */}
        <Tabs.Screen
          name="in-progress"
          options={{ title: "In Progress" }}
          // component={InProgressTab}
        />
        <Tabs.Screen
          name="complete"
          options={{ title: "Completed" }}
          // component={CompleteTab}
        />

        {/* <MaterialTopTab.Screen name="listed" options={{ title: "Listed" }}></MaterialTopTab.Screen> */}
        {/* <Tabs.Screen name="in-progress" options={{ title: "In Progress" }} />
      <Tabs.Screen name="complete" options={{ title: "Complete" }} /> */}
        {/* You can add more tabs here if needed */}
      </Tabs>
    </View>
  );
}
