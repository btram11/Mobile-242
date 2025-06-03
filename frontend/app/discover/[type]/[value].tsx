import {
  BookCardLandmark,
  BookCardLandmarkSkeleton,
} from "@/components/BookCard";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { capitalizeWords } from "@/lib";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "@/services/book";
import { Book } from "@/types/book";
import { FlashList } from "@shopify/flash-list";

const normalizeValue = (type: string, value: string) => {
  if (type === "category") {
    return value;
  } else if (type === "issold" || type === "isleased") {
    return Boolean(value);
  }
  return value;
};

export default function DiscoverCategory() {
  const { type, value } = useLocalSearchParams();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    console.log("DiscoverCategory", type, value);
    if ((type as string) === "category") {
      const formatted = capitalizeWords(value as string);
      navigation.setOptions({ title: `Category: ${formatted}` });
    } else if (
      (type as string) === "issold" ||
      (type as string) === "isleased"
    ) {
      const formatted =
        (type as string) === "issold" ? "Selling Books" : "Leasing Books";
      navigation.setOptions({ title: `${formatted}` });
    }
  }, [navigation, type, value]);

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<{ data: Book[]; nextPage: number | undefined }, Error>({
      queryKey: ["books-discover", type as string, value as string],
      queryFn: async ({ pageParam = 1 }) => {
        return await getBooks({
          page: Number(pageParam),
          pageSize: 10,
          [type as string]: value as string,
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage;
      },
    });

  const books = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <ScrollView
        className="flex flex-col flex-1 p-4 "
        contentContainerStyle={{ gap: 16 }}
      >
        {[...Array(4)].map((_, i) => (
          <BookCardLandmarkSkeleton key={i} />
        ))}
      </ScrollView>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={books}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        estimatedItemSize={200}
        renderItem={({ item }) => <BookCardLandmark book={item} />}
        keyExtractor={(item) => item.book_id}
        onEndReachedThreshold={0.5}
        onEndReached={fetchNextPage}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" color="#999" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

export const screenOptions = {
  title: "Chi tiết",
  headerShown: true,
  headerStyle: { backgroundColor: "#00664f" },
  headerTintColor: "#fff",
};
