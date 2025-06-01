//@ts-nocheck

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Rating from "@/components/Rating";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import "@/global.css";
import { Sale } from "./SaleItem";
import { Skeleton } from "moti/skeleton";

export default function BookCard({
  id,
  listing_id,
  img_src,
  title,
  is_leased,
  is_sold,
  leased_price,
  sold_price,
  is_from,
  color,
  text_color = "dark",
}: {
  text_color?: "dark" | "light";
}) {
  // sold_price and leased_price are nullable lists of prices
  // rating: 5 scale
  //   if (color === "gray") {
  const showPrice = (is_sold && sold_price) || (is_leased && leased_price);
  const price = is_sold ? sold_price : leased_price;
  const priceLabel = is_from ? `From $${price}` : `$${price}`;

  let statusLabel = null;
  if (is_sold && is_leased) statusLabel = "Sold/Leased";
  else if (is_sold) statusLabel = "Sold";
  else if (is_leased) statusLabel = "Leased";
  return (
    <Link href={`/book-info/${id}?listing_id=${listing_id}`} asChild>
      <TouchableOpacity
        className={`${color} rounded-lg shadow-md p-3 m-2 w-44 gap-1 min-h-[283px]`}
      >
        <Image
          style={styles.img}
          source={img_src ?? require("@/assets/images/book1.jpg")}
          resizeMode="contain"
        />
        <View className="flex-1 flex items-center justify-center">
          <Text
            className={`text-xll font-bold text-center ${
              text_color == "dark" ? "text-black" : "text-white"
            }`}
            numberOfLines={3}
          >
            {title}
          </Text>
        </View>
        <View className="flex flex-col items-center justify-end flex-1">
          {showPrice && (
            <Text className="text-lg font-latobold text-lightred text-center">
              {priceLabel}
            </Text>
          )}

          {statusLabel && (
            <Text
              className={`text-sm font-lato text-center ${
                text_color == "dark" ? "text-[#3A4D45]" : "text-[#E5E7EB]"
              } `}
            >
              {statusLabel}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export function BookCardSkeleton({
  color,
  text_color = "light",
}: {
  text_color?: "dark" | "light";
}) {
  return (
    <View
      className={`${color} rounded-lg shadow-md p-3 m-2 w-44 gap-1 min-h-[283px]`}
    >
      <Skeleton colorMode="light" width={"100%"} height={144} />
      <View className="flex-1 flex items-center justify-start pt-2 gap-1">
        <Skeleton colorMode={text_color} width={"90%"} height={14} />
        <Skeleton colorMode={text_color} width={"90%"} height={14} />
        <Skeleton colorMode={text_color} width={"80%"} height={14} />
      </View>
      <View className="flex flex-col items-center justify-end flex-1 gap-2">
        <Skeleton colorMode={text_color} width={"50%"} height={20} />

        <Skeleton colorMode={text_color} width={"70%"} height={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: "auto", height: 144, backgroundColor: "#fff" },
});

export function BookCardListing({
  book,
  index,
}: {
  book: Sale;
  index?: number;
}) {
  return (
    <Link
      href={{
        pathname: "/book-info/[book_id]",
        params: {
          book_id: book?.book_id,
          listing_id: String(book?.listing_id),
        },
      }}
      asChild
    >
      <Pressable className="flex flex-col gap-4 px-2 pb-4 w-full h-full bg-white rounded-lg shadow-md">
        <View className="flex flex-col items-center justify-between">
          {book?.img_url && (
            <Image
              style={{ width: "auto", height: 130, aspectRatio: 94 / 144 }}
              source={book?.img_url || require("@/assets/images/book1.jpg")}
              resizeMode="cover"
            />
          )}
          {!book?.img_url && (
            <View
              style={{
                width: "auto",
                height: 130,
                aspectRatio: 94 / 144,
                backgroundColor: "#eee",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-xs text-gray-400">No Image</Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <Text
            className="text-base font-semibold leading-tight"
            numberOfLines={2}
          >
            {book?.book?.title || "Book Title"}
          </Text>
          <Text className="text-sm text-gray-500" numberOfLines={1}>
            {book?.book?.author || "Author Name"}
          </Text>

          <View className="flex flex-row items-center justify-between">
            <Text className="text-[10px] text-gray-600 capitalize">
              Condition:
            </Text>
            {book?.condition && (
              <View className="ml-2 bg-gray-200 px-2 py-[2px] rounded-full">
                <Text className="text-[10px] text-gray-600 capitalize">
                  {book.condition}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-1 flex justify-end">
            <View className="mt-2 flex-col items-end justify-between">
              {book?.sold_price && (
                <Text className="text-base font-bold text-lightred">
                  Sale: ${book.sold_price}
                </Text>
              )}
              {book?.leased_price && (
                <Text className="text-base font-bold text-blue-500">
                  Rent: ${book.leased_price}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function BookCardSkeletonListing() {
  return (
    <View className="flex flex-col gap-4 px-2 pb-4 w-full h-full bg-white rounded-lg shadow-md">
      <View className="flex flex-col items-center justify-between">
        <Skeleton colorMode="light" width={"100%"} height={130} radius={0} />
      </View>
      <View className="flex-1 flex flex-col gap-1">
        <Skeleton colorMode="light" width={"90%"} height={20} radius={0} />
        <Skeleton colorMode="light" width={"70%"} height={20} radius={0} />
        {/* <Text
          className="text-base font-semibold leading-tight"
          numberOfLines={2}
        >
          {book?.book?.title || "Book Title"}
        </Text>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {book?.book?.author || "Author Name"}
        </Text> */}

        <Skeleton colorMode="light" width={"60%"} height={16} radius={0} />
        <View className="flex flex-row items-center justify-between">
          <Skeleton colorMode="light" width={"60%"} height={14} radius={0} />
          <View className="flex flex-col items-end">
            <Skeleton colorMode="light" width={"40%"} height={14} radius={0} />
          </View>
          {/* <Text className="text-[10px] text-gray-600 capitalize">
            Condition:
          </Text>
          {book?.condition && (
            <View className="ml-2 bg-gray-200 px-2 py-[2px] rounded-full">
              <Text className="text-[10px] text-gray-600 capitalize">
                {book.condition}
              </Text>
            </View>
          )} */}
        </View>

        <View className="flex-1 flex justify-end">
          <View className="mt-2 flex-col items-end justify-between flex gap-1">
            <Skeleton colorMode="light" width={"50%"} height={18} radius={0} />
            <Skeleton colorMode="light" width={"50%"} height={18} radius={0} />
            {/* {book?.sold_price && (
              <Text className="text-base font-bold text-lightred">
                Sale: ${book.sold_price}
              </Text>
            )}
            {book?.leased_price && (
              <Text className="text-base font-bold text-blue-500">
                Rent: ${book.leased_price}
              </Text>
            )} */}
          </View>
        </View>
      </View>
    </View>
  );
}

export function BookCardLandmark({ book }) {
  const [image, setImage] = useState({ width: 0, height: 0 });
  return (
    <Link href={`/book-info/${book?.id}`}>
      <View
        className="flex flex-row items-end relative"
        style={{ height: image.height + 16 }}
      >
        <Image
          style={{
            width: 127,
            height: "auto",
            // height: 191,
            zIndex: 9999,
            aspectRatio: 127 / 191,
          }}
          className="w-4 rounded-md absolute bottom-2 left-2"
          resizeMode="cover"
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setImage({ width, height });
          }}
          source={book?.img_src || require("@/assets/images/book1.jpg")}
        />
        <View
          className="bg-white shadow-lg flex flex-row w-full rounded-xl"
          style={{
            height: (image.height * 8) / 9,
            minHeight: "auto",
            paddingLeft: image.width + 16,
            paddingRight: 8,
            paddingVertical: 8,
          }}
        >
          <View className="flex flex-col gap-2">
            <View>
              <Text
                style={{
                  flexShrink: 1,
                  flexWrap: "wrap",
                  maxWidth: "90%",
                  lineHeight: 20,
                }}
                className="text-lg font-semibold text-wrap"
              >
                {book?.title || `If on a Winter’s Night a Traveler `}
              </Text>
              <Text className="text-sm">{book?.title || `Umberto Eco`}</Text>
            </View>
            <View>
              <Text className="text-base">
                <Text>{`Buy from: `}</Text>
                <Text className="font-semibold text-lightred">
                  {book?.sold_price || `20$`}
                </Text>
              </Text>
            </View>
          </View>

          {/* Buttons */}
          {/* <View style={stylesLandmark.buttonParent}>
          <LinearGradient
            style={[stylesLandmark.button, stylesLandmark.buttonShadowBox]}
            locations={[0, 0.43, 0.8]}
            colors={["#ccc", "#c0bfbf", "#726f6f"]}
            useAngle={true}
            angle={108.13}
          >
            <Text style={[stylesLandmark.login, stylesLandmark.loginTypo]}>
              Rent
            </Text>
          </LinearGradient>
          <LinearGradient
            style={[stylesLandmark.button1, stylesLandmark.buttonShadowBox]}
            locations={[0, 0.69]}
            colors={["#b0ddc9", "#278c5f"]}
            useAngle={true}
            angle={100.63}
          >
            <Text style={[stylesLandmark.login1, stylesLandmark.loginTypo]}>
              Buy
            </Text>
          </LinearGradient>
        </View> */}
        </View>
      </View>
    </Link>
  );
}
