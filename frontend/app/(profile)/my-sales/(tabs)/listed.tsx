import { SaleItem, Sale, SaleItemSkeleton } from "@/components/SaleItem";
import { getListingsOfProvider } from "@/services/provider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Text, View } from "react-native";

export default function ListedTab() {
  const {
    data: sales,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery<{ data: Sale[]; nextPage: number | undefined }, Error>({
    queryKey: ["sales-listed"],
    queryFn: async ({ pageParam = 1 }) => {
      const providerId = await AsyncStorage.getItem("userId");
      if (!providerId) {
        throw new Error("Provider ID not found in storage");
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      return await getListingsOfProvider({
        providerId,
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
          <Ionicons name="cloud-offline-outline" size={64} color="#9ca3af" />
          <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
            No listed sales available
          </Text>
          <Text className="text-gray-400 text-sm text-center mt-2">
            You haven't listed any books for sale yet. Start listing now to
            reach buyers!
          </Text>
        </View>
      )}
    </View>
  );
}
