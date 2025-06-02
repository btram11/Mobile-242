import { getBooks } from "@/services/book";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Book } from "@/types/book";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";

export default function AddListingScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    isError,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<{ data: Book[]; nextPage: number | undefined }, Error>({
    queryKey: ["bookList"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getBooks({ page: Number(pageParam) }),
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
  });
  const books = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={books}
        keyExtractor={(item) => item.book_id}
        estimatedItemSize={147}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: `/(profile)/my-sales/add/fill-details`,
              params: { book_id: item.book_id },
            }}
            asChild
          >
            <TouchableOpacity style={styles.bookItem}>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  aspectRatio: 94 / 144,
                  width: 80,
                  height: "auto",
                  backgroundColor: "#ddd",
                  borderRadius: 8,
                }}
              >
                <Text className="text-center text-sm">No image</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                }}
              >
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.selectBtn}>Select</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <Text style={{ textAlign: "center", marginVertical: 10 }}>
                Loading more...
              </Text>
            );
          }
          if (isError) {
            return (
              <Text style={{ textAlign: "center", color: "red" }}>
                Error fetching data.
              </Text>
            );
          }
          if (!hasNextPage) {
            return (
              <Text style={{ textAlign: "center", marginVertical: 10 }}>
                No more books.
              </Text>
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  bookItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    gap: 12,
  },
  bookTitle: { fontSize: 16, fontWeight: "500" },
  bookAuthor: { color: "#666", fontSize: 14 },
  selectBtn: { color: "#008C6E", fontWeight: "bold", marginLeft: 8 },
});
