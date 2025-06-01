//@ts-nocheck

import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Rating from "@/components/Rating";
import "@/global.css";
import { Skeleton } from "moti/skeleton";

export default function ProviderCard({
  id,
  name,
  img_src,
  description,
  rating,
  color,
}) {
  // rating: 5 scale
  const bgColor = color === "gray" ? "bg-gray-200" : "bg-lightblue";
  const defaultImg =
    color === "gray"
      ? require("@/assets/images/avatar3.jpg")
      : require("@/assets/images/avatar2.jpg");

  return (
    <Link
      href={{
        pathname: "/providers/[provider_id]",
        params: { provider_id: id },
      }}
      asChild
    >
      <Pressable
        className={`${bgColor} rounded-lg shadow-md p-2 m-2 w-44 gap-1`}
      >
        <Image
          style={styles.img}
          source={img_src ?? defaultImg}
          className="w-full h-36 rounded-full bg-white"
          resizeMode="cover"
        />
        <Text
          className="text-lg font-bold text-center leading-5"
          numberOfLines={2}
        >
          {name}
        </Text>
        <View className="flex-1 justify-end flex flex-col items-center gap-1">
          <Text
            className="text-sm font-lato text-center text-gray-500 leading-tight"
            numberOfLines={2}
          >
            {description}
          </Text>
          <Text className="text-sm font-lato text-center">
            Rating: {rating}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

export function ProviderCardSkeleton({
  color,
  text_color = "light",
}: {
  text_color?: "dark" | "light";
}) {
  const bgColor = color === "gray" ? "bg-gray-200" : "bg-lightblue";
  return (
    <View
      className={`${bgColor} rounded-lg shadow-md p-2 m-2 w-44 gap-2 items-center`}
    >
      <Skeleton
        height={144}
        width={"100%"}
        radius={"round"}
        colorMode={text_color}
      />
      <Skeleton height={24} width={"80%"} colorMode={text_color} />
      <View className="flex-1 justify-end flex flex-col items-center gap-3">
        <View className="flex-1 justify-end flex flex-col items-center gap-1">
          <Skeleton colorMode={text_color} width={"70%"} height={14} />
          <Skeleton colorMode={text_color} width={"55%"} height={14} />
        </View>

        <Skeleton colorMode={text_color} width={"65%"} height={16} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "auto",
    height: 144,
    backgroundColor: "#fff",
    borderRadius: 10000,
  },
});
