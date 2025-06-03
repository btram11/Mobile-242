import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Rating from "@/components/Rating";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getBookById, getBookListings } from "@/services/book";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";

export default function Providers() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const { book_id } = useLocalSearchParams();

  const { data, refetch } = useQuery({
    queryKey: ["listings", book_id],
    queryFn: () => getBookListings(book_id as string),
  });

  const { data: bookData } = useQuery({
    queryKey: ["book", book_id],
    queryFn: () => getBookById(book_id as string),
  });

  return (
    <View style={{ flex: 1, width: "auto" }}>
      <FlashList
        data={data ?? []}
        horizontal={false}
        estimatedItemSize={200}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#008C6E"]}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListHeaderComponent={() => (
          <View className="py-4">
            <Text className="text-primary text-2xl font-latobold">
              Providers for {bookData?.title}
            </Text>
            <Text className="text-gray-400 text-sm mb-4">
              List of providers available for {bookData?.title}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item?.listing_id?.toString()}
        renderItem={({ item: listing }) => {
          if (!listing) return null;
          return <ListingCard listing={listing} book_id={book_id} />;
        }}
      />
    </View>
  );
}

const ListingCard = ({ listing, book_id }) => {
  const { provider, leased_price, condition, is_leased, sold_price } = listing;
  return (
    <TouchableOpacity
      className="w-full bg-white p-5 rounded-xl shadow-md"
      onPress={() => {
        router.replace({
          pathname: "/book-info/[book_id]",
          params: {
            book_id: String(book_id),
            listing_id: String(listing?.listing_id),
          },
        });
      }}
    >
      {/* Provider Name */}
      <Text className="text-xl font-lato font-bold mb-2 text-gray-900">
        {provider?.provider_name}
      </Text>

      {/* Location and Rating */}
      <View className="flex-col gap-2 mb-3">
        <View className="flex-row items-center space-x-1">
          <Ionicons name="location-outline" size={18} color="#6b7280" />
          <Text className="text-sm text-gray-600">
            {provider?.preferred_location}
          </Text>
        </View>
        <Rating rating={provider?.average_rating} />
      </View>

      {/* Prices */}
      <View className="flex-row justify-between mb-2">
        {leased_price != null && (
          <View className="flex-row">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="time-outline" size={18} color="#10b981" />
              <Text className="text-sm text-green-700 font-semibold">
                Rent: ${leased_price.toLocaleString()}{" "}
              </Text>
              {listing.leased_period && (
                <Text className="text-sm text-gray-500">
                  ({listing.leased_period} day
                  {listing.leased_period > 1 ? "s" : ""})
                </Text>
              )}
            </View>
          </View>
        )}

        {sold_price && (
          <View className="flex-row items-center space-x-1">
            <Ionicons name="cash-outline" size={18} color="#ef4444" />
            <Text className="text-sm text-red-600 font-semibold">
              Sell: ${sold_price.toLocaleString()}
            </Text>
          </View>
        )}
      </View>

      {/* Condition */}
      <View className="inline-block rounded-full px-3 py-1 bg-blue-100">
        <Text className="text-sm font-semibold text-blue-700">
          Condition: {condition ?? "Unknown"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
