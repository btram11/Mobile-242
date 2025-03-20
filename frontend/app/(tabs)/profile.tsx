// @ts-nocheck
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomButtonLight,
  CustomButtonPrimary,
} from "@/components/CustomSquareButton";
import { router, Redirect, Link } from "expo-router";

const buttons = [
  {
    text: "Liked Books",
    handlePress: () => {
      router.push("/(profile)/liked-books");
    },
  },
  {
    text: "Your Orders",
    handlePress: () => {
      router.push("/(profile)/your-orders");
    },
  },
];

function Profile() {
  return (
    <SafeAreaView className="bg-light flex-1 flex-col items-center gap-6 p-4">
      <View className="flex flex-row items-center gap-5 px-4">
        <Image
          style={styles.profileImage}
          source={require("@/assets/images/avatar3.jpg")}
          // className="w-32 h-32 aspect-square rounded-full"
          resizeMode="contain"
        />
        <View className="flex flex-col gap-1 flex-1 self-stretch justify-between">
          <View className="flex flex-1 justify-center text-lg gap-2">
            <Text className="font-medium text-xl">Name</Text>
            {/* <Text className="font-normal text-white">Email</Text> */}
            <Link href={`/(profile)/following`} asChild>
              <Text className="text-sm">Following</Text>
            </Link>
          </View>
          <CustomButtonLight
            style={{
              margin: 0,
              padding: 8,
              alignSelf: "flex-start",
            }}
            text="Edit Profile"
            textStyle={`text-sm`}
          />
        </View>
      </View>
      <View style={styles.line} className="shadow-md"></View>
      <View className="flex flex-col gap-6 self-stretch flex-1 px-6 pt-4">
        {buttons.map((button, index) => (
          <CustomButtonPrimary
            key={index}
            style={{ margin: 0 }}
            buttonStyle={``}
            text={button.text}
            handlePress={button.handlePress}
          />
        ))}
      </View>
      <View className="self-stretch px-6 pt-4">
        <CustomButtonPrimary
          style={{ margin: 0 }}
          buttonStyle={`w-full items-center`}
          text={`Log out`}
          handlePress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  line: {
    width: "90%",
    height: 1,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 1 },
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    borderStyle: "dashed",
  },
  profileImage: {
    width: 128,
    aspectRatio: 1 / 1,
  },
});
