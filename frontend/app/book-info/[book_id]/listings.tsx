import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import Rating from "@/components/Rating";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getBookById, getBookListings } from "@/services/book";
import { useState } from "react";

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

  const handlePress = () => {
    console.log("Provider clicked");
  };
  return (
    <View className="p-4">
      <View className="mb-8">
        <View>
          <Text className="text-primary text-2xl font-latobold">
            Providers for {bookData?.title}
          </Text>
          <Text className="text-gray-400 text-sm mb-4">
            List of providers available for {bookData?.title}
          </Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, overflow: "visible" }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#008C6E"]}
            />
          }
          style={{ height: "100%" }}
        >
          {data?.map((listing, idx: string) => {
            const provider = listing.provider;
            return (
              <Link
                key={idx}
                href={{
                  pathname: "/book-info/[book_id]",
                  params: {
                    book_id: String(book_id),
                    listing_id: String(listing?.listing_id),
                  },
                }}
                asChild
              >
                <TouchableOpacity
                  key={idx}
                  onPress={handlePress}
                  className=" w-full bg-gray-200 p-4 shadow-md rounded-lg"
                >
                  <View>
                    <Text className="text-lg font-lato">
                      {provider.provider_name}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-md font-latolight">
                        Preferred Location:{" "}
                      </Text>
                      <Text className="text-md font-lato">
                        {provider.preferred_location}
                      </Text>
                    </View>
                    <View>
                      <View className="flex-row items-center">
                        <Text className="text-md font-latolight">Rating: </Text>
                        <Rating rating={provider.average_rating} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
