import {
  View,
  ImageBackground,
  useWindowDimensions,
  Text,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { logo1 } from "@/constants/logos";
import { CustomButtonLight } from "@/components/CustomButton";

function Onboarding1({ handleNext }: { handleNext: () => void }) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView
      className="bg-[#00928C] flex flex-col"
      style={{ width: width, height: height - headerHeight + insets.top }}
    >
      <ImageBackground
        source={require("@/assets/images/onboarding1.png")}
        resizeMode="cover"
        // className="flex-1 w-full h-full"
        style={{
          flex: 1,
          width: width,
          height: height * 0.85,
          position: "absolute",
          bottom: 0,
        }}
      />
      <View className="flex flex-1 items-center justify-start">
        <View className="flex flex-col justify-center items-center gap-4 h-1/4">
          <Image
            source={logo1}
            resizeMode="contain"
            style={{ width: 68, height: 52 }}
          />
          <View className="flex flex-col justify-center items-center gap-1">
            <Text className="text-pretty font-medium text-xl text-[#B0DDC9]">
              Welcome to
            </Text>
            <Text className="font-bold text-4xl text-white">
              <Text className="text-[#004435]">B</Text>oo
              <Text className="text-[#004435]">kU</Text>ni
              <Text className="text-[#004435]">ve</Text>rs
              <Text className="text-[#004435]">e</Text>
            </Text>
          </View>
        </View>
        <View className="flex-1 flex items-center justify-end p-9 w-full">
          <CustomButtonLight
            text="NEXT"
            buttonStyle="px-8 bg-white items-center mt-10 w-3/4 rounded-full shadow-md"
            textStyle="text-[#000000]"
            handlePress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Onboarding1;
