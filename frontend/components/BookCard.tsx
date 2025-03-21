//@ts-nocheck

import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Rating from "@/components/Rating";
import { Link } from "expo-router";
import "@/global.css";

export default function BookCard({
  id,
  img_src,
  title,
  is_leased,
  is_sold,
  leased_price,
  sold_price,
  is_from,
  color,
}) {
  // sold_price and leased_price are nullable lists of prices
  // rating: 5 scale
  //   if (color === "gray") {
  return (
    <Link href={`/book-info/${id}`} asChild>
      <TouchableOpacity
        className={`${
          color == "gray" ? "bg-gray-200" : "bg-secondarylight"
        } rounded-lg shadow-md p-4 m-2 w-44 gap-1`}
      >
        <Image style={styles.img} source={img_src} resizeMode="contain" />
        <Text className="text-xll font-bold text-center">{title}</Text>
        {is_leased && !is_sold && !is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            ${leased_price}
          </Text>
        )}
        {is_leased && !is_sold && is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            From ${leased_price}
          </Text>
        )}
        {is_sold && !is_leased && !is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            ${sold_price}
          </Text>
        )}
        {is_sold && !is_leased && is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            From ${sold_price}
          </Text>
        )}
        {is_sold && is_leased && (
          <Text className="text-lg font-latobold text-lightred text-center">
            From ${leased_price}
          </Text>
        )}

        {is_leased && !is_sold && (
          <Text className="text-sm font-lato text-gray-500 text-center">
            Sold
          </Text>
        )}
        {is_sold && !is_leased && (
          <Text className="text-sm font-lato text-gray-500 text-center">
            Leased
          </Text>
        )}
        {is_sold && is_leased && (
          <Text className="text-sm font-lato text-gray-500 text-center">
            Sold/Leased
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
  //   } else if (color === "green") {
  //     console.log("green");
  //     return (
  //       <Link href={`/book-info/${id}`} asChild>
  //         <TouchableOpacity className="bg-secondarylight rounded-lg shadow-md p-4 m-2 w-44 gap-1">
  //           <Image
  //             source={img_src}
  //             className="w-36 h-36 rounded-lg bg-white"
  //             resizeMode="contain"
  //           />
  //           <Text className="text-xll font-bold text-center">{title}</Text>
  //           {is_leased && !is_sold && !is_from && (
  //             <Text className="text-lg font-latobold text-lightred text-center">
  //               ${leased_price}
  //             </Text>
  //           )}
  //           {is_leased && !is_sold && is_from && (
  //             <Text className="text-lg font-latobold text-lightred text-center">
  //               From ${leased_price}
  //             </Text>
  //           )}
  //           {is_sold && !is_leased && !is_from && (
  //             <Text className="text-lg font-latobold text-lightred text-center">
  //               ${sold_price}
  //             </Text>
  //           )}
  //           {is_sold && !is_leased && is_from && (
  //             <Text className="text-lg font-latobold text-lightred text-center">
  //               From ${sold_price}
  //             </Text>
  //           )}
  //           {is_sold && is_leased && (
  //             <Text className="text-lg font-latobold text-lightred text-center">
  //               From ${leased_price}
  //             </Text>
  //           )}

  //           {is_leased && !is_sold && (
  //             <Text className="text-sm font-lato text-gray-500 text-center">
  //               Sold
  //             </Text>
  //           )}
  //           {is_sold && !is_leased && (
  //             <Text className="text-sm font-lato text-gray-500 text-center">
  //               Leased
  //             </Text>
  //           )}
  //           {is_sold && is_leased && (
  //             <Text className="text-sm font-lato text-gray-500 text-center">
  //               Sold/Leased
  //             </Text>
  //           )}
  //         </TouchableOpacity>
  //       </Link>
  //     );
  //   }
}

export function BookCard2({
  id,
  img_src,
  title,
  is_leased,
  is_sold,
  leased_price,
  sold_price,
  is_from,
  color,
}) {
  // sold_price and leased_price are nullable lists of prices
  // rating: 5 scale
  //   if (color === "gray") {
  return (
    <Link href={`/book-info/${id}`} asChild>
      <TouchableOpacity
        className={`${
          color == "gray" ? "bg-gray-200" : "bg-secondarylight"
        } rounded-lg shadow-md p-4 m-2 w-[164px] gap-1`}
      >
        <Image style={styles.img} source={img_src} resizeMode="contain" />
        <Text className="text-xll font-bold text-center">{title}</Text>
        {is_leased && !is_sold && !is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            ${leased_price}
          </Text>
        )}
        {is_leased && !is_sold && is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            From ${leased_price}
          </Text>
        )}
        {is_sold && !is_leased && !is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            ${sold_price}
          </Text>
        )}
        {is_sold && !is_leased && is_from && (
          <Text className="text-lg font-latobold text-lightred text-center">
            From ${sold_price}
          </Text>
        )}
        {is_sold && is_leased && (
          <Text className="text-lg font-latobold text-lightred text-center">
            From ${leased_price}
          </Text>
        )}

        {is_leased && !is_sold && (
          <Text className="text-sm font-lato text-gray-500 text-center">
            Sold
          </Text>
        )}
        {is_sold && !is_leased && (
          <Text className="text-sm font-lato text-gray-500 text-center">
            Leased
          </Text>
        )}
        {is_sold && is_leased && (
          <Text className="text-sm font-lato text-gray-500 text-center">
            Sold/Leased
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
}
const styles = StyleSheet.create({
  img: { width: "auto", height: 144, backgroundColor: "#fff" },
});
