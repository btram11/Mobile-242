// @ts-nocheck

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  RefreshControl,
  Button,
  // SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Trending from "@/components/Trending";
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { Ionicons } from "@expo/vector-icons";

import { SubjectCard } from "@/components/SubjectCard";
import BookCard, { BookCardSkeleton } from "@/components/BookCard";
import NewsCard from "@/components/NewsCard";
import ProviderCard, { ProviderCardSkeleton } from "@/components/ProviderCard";

import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "@/components/FloatingButton";
import { Plus } from "lucide-react-native";

import { mockedNews, mockedProviders } from "@/mocks/data";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/services/book";
import { getProviders } from "@/services/provider";

import * as Sentry from "@sentry/react-native";
import { router } from "expo-router";
import { SUBJECTS } from "@/constants/category";
import { presetColors } from "@/constants/Colors";
import { capitalizeWords, getRandomNumInRange } from "@/lib";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await bookRefetch();
    setIsRefreshing(false);
  };

  const {
    data: booksData,
    refetch: bookRefetch,
    isLoading: isBookLoading,
  } = useQuery({
    queryKey: ["books-home"],
    queryFn: () => getBooks({}),
  });

  const {
    data: providersData,
    refetch: providerRefetch,
    isLoading: isProvidersLoading,
  } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders({ pageSize: 5 }),
  });

  const books = booksData?.data?.filter(
    (book) => book.sold_price != null || book.leased_price != null
  );
  return (
    <View style={styles.container} className="bg-viridian-500">
      {/* <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
      />
      ; */}
      <ScrollView
        className="flex-1 py-4"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#008C6E"]}
          />
        }
      >
        <View className="block relative h-72 w-full z-10">
          <Image
            style={styles.globe}
            source={require("@/assets/images/globe-books.png")}
            resizeMode="contain"
          />
        </View>

        <View className="bg-white rounded-t-3xl p-4">
          <View className="mb-8 mt-2">
            <Text className="text-primary text-2xl font-latobold">
              New books available
            </Text>
            <Text className="text-gray-400 text-sm">
              Expand your knowledge right now
            </Text>

            <View className="flex-row mt-2 space-x-3">
              {!isBookLoading && books?.length === 0 && (
                <View className="items-center justify-center w-full mt-4 mb-6">
                  <Text className="text-base text-gray-500 mb-2">
                    No books available at the moment.
                  </Text>
                  <Text className="text-sm text-gray-400">
                    Try refreshing or check back later.
                  </Text>
                </View>
              )}

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {isBookLoading &&
                  [...Array(3)].map((_, idx) => (
                    <BookCardSkeleton
                      key={idx}
                      color={
                        idx % 2 == 0
                          ? "bg-viridian-400 text-black"
                          : "bg-viridian-600/90 text-white"
                      }
                    />
                  ))}
                {books?.map((book, idx) => {
                  return (
                    <BookCard
                      key={idx}
                      id={book.book_id}
                      listing_id={book.listing_id}
                      img_src={book.img_url}
                      title={(book.title || "").split("/")[0].trim()}
                      sold_price={book.sold_price}
                      is_sold={book.sold_price}
                      is_leased={book.leased_price}
                      leased_price={book.leased_price}
                      is_from={book.is_from}
                      color={
                        idx % 2 == 0
                          ? "bg-viridian-400 text-black"
                          : "bg-viridian-600/90 text-white"
                      }
                      text_color={`${idx % 2 == 0 ? "dark" : "light"}`}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-primary text-2xl font-latobold">
              News & Updates
            </Text>
            <Text className="text-gray-400 text-sm">
              Stuffs you should know
            </Text>

            <View className="flex-row mt-2 space-x-3">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {mockedNews.map((news, idx) => (
                  <NewsCard
                    key={news.title}
                    title={news.title}
                    img_src={news.img_src}
                    summary={news.summary}
                    color={idx % 2 == 0 ? "orange" : "gray"}
                  />
                ))}
              </ScrollView>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-primary text-2xl font-latobold">
              Providers near you
            </Text>
            <Text className="text-gray-400 text-sm">
              Discover providers recommended for you
            </Text>

            <View className="flex-row mt-2 space-x-3">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: 4,
                  gap: 2,
                }}
              >
                {isProvidersLoading &&
                  [...Array(3)].map((_, idx) => (
                    <ProviderCardSkeleton
                      key={idx}
                      color={idx % 2 == 0 ? "gray" : "blue"}
                    />
                  ))}
                {providersData?.data?.map((provider, idx) => (
                  <ProviderCard
                    key={idx}
                    id={provider?.provider_id}
                    name={provider?.provider_name}
                    img_src={provider?.img_src}
                    description={
                      provider?.description || "No description available"
                    }
                    rating={provider?.rating || "N/A"}
                    color={idx % 2 == 0 ? "gray" : "blue"}
                  />
                ))}
              </ScrollView>
            </View>
          </View>

          <View>
            <Text className="text-primary text-2xl font-latobold">Majors</Text>
            <Text className="text-gray-400 text-sm">
              Recommendations for you
            </Text>

            <View className="flex-row mt-2 space-x-3">
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
                      presetColors[
                        getRandomNumInRange(0, presetColors.length - 1)
                      ]
                    }
                    subject={capitalizeWords(item)}
                  />
                )}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.aboutUs}>
          <Text className="text-white font-latobold text-lg">About us</Text>
          {/* <Text className='text-gray-200 text-center font-lato text-sm' style={{color: '#e5e7eb'}}>We are a team of developers who are passionate about education and technology. We aim to provide a platform for students to access used books easily and effectively.</Text> */}
          <Text
            className="text-gray-400 font-lato text-sm"
            style={{ color: "#9ca3af" }}
          >
            Group name: meomeo
          </Text>
        </View>

        <View style={{ height: 20 }}></View>
      </ScrollView>
      <FloatingButton
        onPress={() => router.push("/(profile)/my-sales/add/select-book")}
        icon={<Plus size={24} color="white" />}
        className="bg-viridian-500 shadow-lg shadow-viridian-600/50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  aboutUs: {
    flex: 1,
    backgroundColor: "#024435",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    marginHorizontal: 6,
    marginVertical: 8,
    borderRadius: 8,
  },
  globe: {
    position: "absolute",
    width: 288,
    aspectRatio: 1 / 1,
    bottom: -195,
    right: 0,
  },
});
