import { Link } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
export type Sale = {
  listing_id: string;
  book_id: string;
  provider_img_book_url: string | null;
  condition: string;
  listed_at: string;
  is_sold: boolean;
  sold_price: number | null;
  is_leased: boolean;
  leased_price: number | null;
  leased_period: number | null;
  is_in_progress: boolean;
  is_complete: boolean;
  provider_id: string;
  book: {
    book_id: string;
    title: string;
    img_url: string | null;
    author: string;
    publisher: string;
    publishing_year: number;
    subject: string;
    summary: string | null;
    price: number | null;
    category: string;
  };
};

export const SaleItem = ({ sale }: { sale: Sale }) => (
  <Link
    href={{
      pathname: "/(profile)/my-sales/[listing_id]",
      params: { listing_id: sale.listing_id, book_id: sale.book_id },
    }}
    asChild
  >
    <TouchableOpacity
      className="bg-white rounded-lg p-4"
      style={styles.card}
      activeOpacity={0.8}
    >
      <View className="flex-row">
        {/* Book Image */}
        <View className="mr-4">
          {sale.book.img_url ? (
            <Image
              source={{
                uri: sale.book.img_url || require("@/assets/images/book1.jpg"),
              }}
              style={{
                width: 60,
                height: 90,
                borderRadius: 6,
                backgroundColor: "#eee",
              }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: 60,
                height: 90,
                borderRadius: 6,
                backgroundColor: "#eee",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-xs text-gray-400">No Image</Text>
            </View>
          )}
        </View>
        {/* Book Info */}
        <View className="flex-1 justify-between">
          <Text
            className="text-base font-semibold mb-1"
            style={styles.itemText}
            numberOfLines={2}
          >
            {sale.book.title}
          </Text>
          <Text className="text-xs text-gray-500 mb-1">{sale.book.author}</Text>
          <Text className="text-xs text-gray-400 mb-1">
            {sale.book.publisher} • {sale.book.publishing_year}
          </Text>
          <Text className="text-xs text-gray-400 mb-1 capitalize">
            Condition: {sale.condition}
          </Text>
          <Text className="text-xs text-gray-400 mb-1">
            Posted: {new Date(sale.listed_at).toLocaleDateString()}
          </Text>
          <View className="flex-col mt-1">
            {sale.is_sold && (
              <Text className="text-green-600 font-bold text-base mr-2">
                Sell Price: ${sale.sold_price ? `${sale.sold_price}` : "?"}
              </Text>
            )}
            {!sale.is_leased && (
              <Text className="text-blue-600 font-bold text-base">
                Leased Price:{" "}
                {sale.leased_price
                  ? `$${sale.leased_price} for ${sale.leased_period} days`
                  : "?"}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

export const SaleItemSkeleton = () => {
  return (
    <View className="bg-white rounded-lg p-4" style={styles.card}>
      <View className="flex-row">
        {/* Book Image */}
        <View className="mr-4">
          <Skeleton width={60} height={90} colorMode="light" />
        </View>
        {/* Book Info */}
        <View className="flex-1 flex-col gap-2">
          <Skeleton width={"100%"} height={20} colorMode="light" radius={2} />
          <Skeleton width={"90%"} height={20} colorMode="light" radius={2} />

          <Skeleton width={"80%"} height={15} colorMode="light" radius={2} />
          <Skeleton width={"60%"} height={13} colorMode="light" radius={2} />

          <Skeleton width={"30%"} height={13} colorMode="light" radius={2} />
          <Skeleton width={"40%"} height={13} colorMode="light" radius={2} />

          <Skeleton width={"60%"} height={20} colorMode="light" radius={2} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    letterSpacing: 0.5,
  },
  itemText: {
    letterSpacing: 0.2,
  },
  priceText: {
    letterSpacing: 0.2,
  },
});
