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
import BookCard from "@/components/BookCard";
import NewsCard from "@/components/NewsCard";
import ProviderCard from "@/components/ProviderCard";

import { SafeAreaView } from "react-native-safe-area-context";

import { mockedNews, mockedProviders } from "@/mocks/data";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/services/book";

import * as Sentry from "@sentry/react-native";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await bookRefetch();
    setIsRefreshing(false);
  };

  const { data: booksData, refetch: bookRefetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getBooks(),
  });
  return (
    <SafeAreaView style={styles.container} className="bg-viridian-500">
      {/* <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
      />
      ; */}
      <View className="flex-row items-center bg-secondarylight mx-2 my-1 px-4 py-1 rounded-3xl">
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          className="text-white flex-1 ml-2"
        />
      </View>
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
            // className="z-10"
            // className="absolute w-72 h-72 -bottom-8 right-0 z-10"
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {booksData?.map((book, idx) => {
                  if (!book.sold_price && !book.leased_price) return null;
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {mockedProviders.map((provider, idx) => (
                  <ProviderCard
                    key={provider.name}
                    name={provider.name}
                    img_src={provider.img_src}
                    description={provider.description}
                    rating={provider.rating}
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
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: "row", gap: 8 }}
              >
                <SubjectCard subject="Computer Science" color="purple" />
                <SubjectCard subject="Chemistry" color="blue" />
                <SubjectCard subject="Electrical Engineering" color="orange" />
              </ScrollView>
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
    </SafeAreaView>
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
