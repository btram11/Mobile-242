import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import { SaleItem, Sale, SaleItemSkeleton } from "@/components/SaleItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListingsOfProvider } from "@/services/provider";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function InProgressTab() {
  const {
    data: sales,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery<{ data: Sale[]; nextPage: number | undefined }, Error>({
    queryKey: ["sales"],
    queryFn: async ({ pageParam = 1 }) => {
      const providerId = await AsyncStorage.getItem("userId");
      if (!providerId) {
        throw new Error("Provider ID not found in storage");
      }

      return await getListingsOfProvider({
        providerId,
        page: Number(pageParam),
        inProgress: true,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage;
    },
  });
  const salesData = sales?.pages.flatMap((page) => page.data) ?? [];

  const renderItem = useCallback(({ item }: { item: Sale }) => {
    return <SaleItem sale={item} />;
  }, []);

  if (isLoading) {
    return (
      <View className="flex flex-col flex-1 p-4 gap-4">
        {[...Array(2)].map((_, i) => (
          <SaleItemSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View className="flex-1">
      {salesData.length !== 0 ? (
        <FlashList
          data={salesData}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ padding: 16 }}
          renderItem={renderItem}
          estimatedItemSize={220}
          keyExtractor={(item) => item.listing_id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextPage}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="hourglass-outline" size={64} color="#9ca3af" />
          <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
            No in-progress sales
          </Text>
          <Text className="text-gray-400 text-sm text-center mt-2">
            You're all caught up! No listings are currently in progress.
          </Text>
        </View>
      )}
    </View>
  );
}
