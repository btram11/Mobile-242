import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const useHideTabBar = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });

    return () => {
      navigation.setOptions({
        tabBarStyle: { display: "flex", height: tabBarHeight },
      });
    };
  }, [navigation, tabBarHeight]);
};
