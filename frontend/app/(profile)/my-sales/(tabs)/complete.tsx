import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import { SaleItem, Sale, SaleItemSkeleton } from "@/components/SaleItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListingsOfProvider } from "@/services/provider";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CompleteTab() {
  const { data: sales, isLoading } = useInfiniteQuery<
    { data: Sale[]; nextPage: number | undefined },
    Error
  >({
    queryKey: ["sales-complete"],
    queryFn: async ({ pageParam = 1 }) => {
      const providerId = await AsyncStorage.getItem("userId");
      if (!providerId) {
        throw new Error("Provider ID not found in storage");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      return await getListingsOfProvider({
        providerId,
        page: Number(pageParam),
        isComplete: true,
        // inProgress: false,
        // isComplete: false,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage;
    },
  });
  const salesData = sales?.pages.flatMap((page) => page.data) ?? [];
  console.log("Sales data of CompleteTab:", salesData);

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
    <View style={{ flex: 1 }}>
      {salesData.length !== 0 ? (
        <FlashList
          data={salesData}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          contentContainerStyle={{ padding: 16 }}
          renderItem={renderItem}
          estimatedItemSize={80}
          keyExtractor={(item) => item.listing_id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="checkmark-done-outline" size={64} color="#9ca3af" />
          <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
            No completed sales
          </Text>
          <Text className="text-gray-400 text-sm text-center mt-2">
            You haven’t finished any listings yet. Once a sale is completed,
            it’ll show up here!
          </Text>
        </View>
      )}
    </View>
  );
}
