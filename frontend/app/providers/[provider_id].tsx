import { ScrollView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import {
  BookCardListing,
  BookCardSkeletonListing,
} from "@/components/BookCard";
import { useCallback } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Sale } from "@/components/SaleItem";
import { useLocalSearchParams } from "expo-router";
import { getListingsOfProvider, getProviderById } from "@/services/provider";
import { Skeleton } from "moti/skeleton";

export default function Provider() {
  const { provider_id } = useLocalSearchParams();
  const {
    data: listings,
    refetch,
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<{ data: Sale[]; nextPage: number | undefined }, Error>({
    queryKey: ["listings", provider_id],
    staleTime: 0,
    queryFn: async ({ pageParam = 1 }) => {
      return await getListingsOfProvider({
        providerId: provider_id as string,
        page: Number(pageParam),
        inProgress: false,
        isComplete: false,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage;
    },
  });

  const { data: provider } = useQuery({
    queryKey: ["provider", provider_id],
    queryFn: () => getProviderById(provider_id as string),
    enabled: !!provider_id,
  });

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <View
          style={{
            width: "97%",
            height: 290,
            marginRight: index % 2 === 0 ? "auto" : undefined,
            marginLeft: index % 2 === 1 ? "auto" : undefined,
          }}
        >
          <BookCardListing book={item} index={index} />
        </View>
      );
    },
    []
  );
  const listingsData = listings?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <ProviderSkeleton />;
  }

  return (
    <ScrollView className="flex-1 flex-col gap-3">
      <View className="flex flex-col py-4 px-6 gap-2">
        <View className="flex flex-row  gap-5">
          <View className="bg-black w-16 h-auto aspect-square rounded-full" />
          <View className="flex-1 flex-col justify-center">
            <Text className="text-lg font-bold">
              {provider?.provider_name || "Provider Name"}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <FontAwesome name="star" size={14} color="gold" />
              <Text className="text-sm text-gray-400">
                {provider?.average_rating || "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-gray-500 text-sm">
          Preferred Location: {provider?.preferred_location || "N/A"}
        </Text>
        <Text className="text-gray-500 text-sm">
          Description: {provider?.description || "N/A"}
        </Text>
      </View>
      {listingsData.length === 0 ? (
        <View className="items-center justify-center py-10 px-4">
          <Text className="text-gray-400 text-center">
            No listings available from this provider.
          </Text>
        </View>
      ) : (
        <FlashList
          data={listingsData}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ padding: 8 }}
          renderItem={renderItem}
          estimatedItemSize={80}
          keyExtractor={(item) => item.listing_id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
        />
      )}
    </ScrollView>
  );
}

function ProviderSkeleton() {
  return (
    <ScrollView className="flex-1 flex-col gap-3">
      <View className="flex flex-col py-4 px-6 gap-2">
        <View className="flex flex-row  gap-5">
          {/* <View className="bg-black w-16 h-auto aspect-square rounded-full" /> */}
          <Skeleton width={64} height={64} radius={"round"} colorMode="light" />
          <View className="flex-1 flex-col justify-center gap-1">
            <Skeleton width={"50%"} height={20} radius={0} colorMode="light" />

            {/* <Text className="text-lg font-bold">
              {provider?.provider_name || "Provider Name"}
            </Text> */}
            <View className="flex flex-row gap-2 items-center">
              <Skeleton
                width={"50%"}
                height={20}
                radius={0}
                colorMode="light"
              />

              {/* <FontAwesome name="star" size={14} color="gold" />
              <Text className="text-sm text-gray-400">
                {provider?.average_rating || "N/A"}
              </Text> */}
            </View>
          </View>
        </View>
        <Skeleton width={"80%"} height={20} radius={0} colorMode="light" />
        <Skeleton width={"50%"} height={20} radius={0} colorMode="light" />
        {/* <Text className="text-gray-500 text-sm">
          Preferred Location: {provider?.preferred_location || "N/A"}
        </Text>
        <Text className="text-gray-500 text-sm">
          Description: {provider?.description || "N/A"}
        </Text> */}
      </View>

      <FlashList
        data={[...Array(4)]}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ index }) => (
          <View
            style={{
              width: "97%",
              height: 290,
              marginRight: index % 2 === 0 ? "auto" : undefined,
              marginLeft: index % 2 === 1 ? "auto" : undefined,
            }}
          >
            <BookCardSkeletonListing />
          </View>
        )}
        estimatedItemSize={80}
        keyExtractor={(_, idx) => idx.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </ScrollView>
  );
}
