//@ts-nocheck
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinkProps, Link, useRouter } from "expo-router";
import BookCard from "@/components/BookCard";
import { SubjectCard } from "@/components/SubjectCard";
import { StatusBar } from "expo-status-bar";
import { SUBJECTS } from "@/constants/category";
import { useInfiniteQuery } from "@tanstack/react-query";
import { capitalizeWords, getRandomNumInRange } from "@/lib";
import { getBooks } from "@/services/book";
import { Book } from "@/types/book";
import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "lucide-react-native";
import { presetColors } from "@/constants/Colors";

type HrefType = LinkProps["href"];

const Discover = () => {
  const router = useRouter();

  const { data: booksRentData, fetchNextPage: fetchNextBookRent } =
    useInfiniteQuery<{ data: Book[]; nextPage: number | undefined }, Error>({
      queryKey: ["books-discover", "rent"],
      queryFn: async ({ pageParam = 1 }) => {
        return await getBooks({
          page: Number(pageParam),
          pageSize: 6,
          isRented: true,
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage && lastPage.nextPage < 3;
      },
    });

  const {
    data: booksSellData,
    fetchNextPage: fetchNextBookSell,
    isFetchingNextPage: isFetchingMoreSell,
  } = useInfiniteQuery<{ data: Book[]; nextPage: number | undefined }, Error>({
    queryKey: ["books-discover", "sold"],
    queryFn: async ({ pageParam = 1 }) => {
      return await getBooks({
        page: Number(pageParam),
        pageSize: 6,
        isSold: true,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage && lastPage.nextPage < 3;
    },
  });

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Major List */}
        <View style={styles.section}>
          <Text style={styles.title}>MAJOR</Text>
          <FlatList
            data={SUBJECTS}
            horizontal
            contentContainerStyle={{ padding: 8, gap: 12 }}
            renderItem={({ item }) => (
              <SubjectCard
                href={{
                  pathname: "/discover/[type]/[value]",
                  params: { type: "category", value: item },
                }}
                color={
                  presetColors[getRandomNumInRange(0, presetColors.length - 1)]
                }
                subject={capitalizeWords(item)}
              />
            )}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Books Lists */}

        <View style={styles.section}>
          <Text style={styles.title}>
            {"renting books".replace("-", " ").toUpperCase()}
          </Text>
          <FlatList
            style={{ height: 300 }}
            data={booksRentData?.pages.flatMap((page) => page.data) ?? []}
            estimatedItemSize={300}
            keyExtractor={(item) => item.book_id}
            onEndReachedThreshold={0.5}
            onEndReached={fetchNextBookRent}
            horizontal
            contentContainerStyle={{ padding: 8 }}
            renderItem={({ item, index }) => (
              <BookCard
                key={index}
                id={item.book_id}
                listing_id={item.listing_id}
                img_src={item?.img_url}
                title={item.title}
                sold_price={item.sold_price}
                is_sold={item.sold_price}
                is_leased={item.leased_price}
                leased_price={item.leased_price}
                is_from={item.is_from}
                color={
                  index % 2 == 0
                    ? "bg-viridian-400 text-black"
                    : "bg-viridian-600/90 text-white"
                }
                text_color={`${index % 2 == 0 ? "dark" : "light"}`}
              />
            )}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={renderFooter({
              fetchNext: fetchNextBookSell,
              isFetchMore: isFetchingMoreSell,
              href: {
                pathname: "/discover/[type]/[value]",
                params: { type: "isleased", value: "true" },
              },
            })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>
            {"selling books".replace("-", " ").toUpperCase()}
          </Text>
          <FlatList
            data={booksSellData?.pages.flatMap((page) => page.data) ?? []}
            horizontal
            estimatedItemSize={300}
            keyExtractor={(item) => item.book_id}
            onEndReachedThreshold={0.5}
            onEndReached={fetchNextBookSell}
            contentContainerStyle={{ padding: 8 }}
            renderItem={({ item, index }) => (
              <BookCard
                key={index}
                id={item.book_id}
                listing_id={item.listing_id}
                img_src={item?.img_url}
                title={item.title}
                sold_price={item.sold_price}
                is_sold={item.sold_price}
                is_leased={item.leased_price}
                leased_price={item.leased_price}
                is_from={item.is_from}
                color={
                  index % 2 == 0
                    ? "bg-viridian-400 text-black"
                    : "bg-viridian-600/90 text-white"
                }
                text_color={`${index % 2 == 0 ? "dark" : "light"}`}
              />
            )}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={renderFooter({
              fetchNext: fetchNextBookSell,
              isFetchMore: isFetchingMoreSell,
              href: {
                pathname: "/discover/[type]/[value]",
                params: { type: "issold", value: "true" },
              },
            })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderFooter = ({ fetchNext, isFetchMore, href }: { href: HrefType }) => {
  return (
    <View className="min-h-[248px] flex-1 ml-3 flex items-center justify-center">
      {isFetchMore ? (
        <ActivityIndicator
          size="large"
          color="#31CFB6"
          style={{ marginVertical: 16 }}
        />
      ) : (
        <Link asChild href={href}>
          <TouchableOpacity
            onPress={fetchNext}
            style={{
              padding: 8,
              backgroundColor: "#31CFB6",
              borderRadius: 16000,
            }}
          >
            <ChevronRight size={19} color="#fff" />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 8 },
  section: { marginBottom: 20, flex: 1, flexDirection: "column" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginLeft: 16 },

  item: {
    padding: 15,
    backgroundColor: "#ddd",
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: { fontSize: 14, fontWeight: "500" },
});

export default Discover;
