//@ts-nocheck
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
// import { Menu, Provider } from 'react-native-paper';
// import mockedBooks from '../../../backend/prisma/data/database_books.json';
import { Ionicons } from "@expo/vector-icons";
import Rating from "@/components/Rating";
import {
  CustomButtonLight,
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "@/components/CustomSquareButton";
import BookCard from "@/components/BookCard";

const mockedBooks = [
  {
    // this is the fetched book from be, specified by book_id & listing_id
    id: 1,
    title: "The Great Gatsby",
    img_src: require("@/assets/images/book1.jpg"),
    condition: "used",
    leased_price: 30,
    sold_price: 20,
    is_leased: true,
    is_sold: true,
    in_wishlist: true,
    // providers: [{ provider_id: 1, provider_name: "Name 1", preferred_location: "campus 2", average_rating: 4.5}, { provider_id: 2, provider_name: "Name 2", average_rating: 4.5, preferred_location: "campus 1" }, { provider_id: 3, provider_name: "Name 3", average_rating: 4.5, preferred_location: "campus 2" }],
    provider: {
      provider_id: 1,
      provider_name: "Name 1",
      preferred_location: "campus 2",
      average_rating: 4.5,
    },
    author: "Author A",
    org_price: 80,
    major: "Computer Science",
    publisher: "Publisher A",
    cover_type: "Hardcover",
    pages: 300,
    publishing_year: 2020,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    related_books: [
      {
        id: 2,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
      {
        id: 3,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
      {
        id: 4,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
    ],
  },

  {
    id: 2,
    title: "The Catcher in the Rye",
    img_src: require("@/assets/images/book3.jpg"),
    condition: "good",
    leased_price: 30,
    sold_price: 25,
    is_leased: true,
    is_sold: false,
    provider: {
      provider_id: 1,
      provider_name: "Name 1",
      preferred_location: "campus 2",
      average_rating: 4.5,
    },
    author: "Author A",
    org_price: 80,
    major: "Computer Science",
    publisher: "Publisher A",
    cover_type: "Hardcover",
    pages: 300,
    publishing_year: 2020,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    related_books: [
      {
        id: 2,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
      {
        id: 3,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
      {
        id: 4,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
    ],
  },
  {
    // this is the fetched book from be, specified by book_id & listing_id
    id: 3,
    title: "If on a winter night a traveller hehehe",
    img_src: require("@/assets/images/book1.jpg"),
    condition: "used",
    leased_price: 30,
    sold_price: 20,
    is_leased: true,
    is_sold: true,
    in_wishlist: true,
    // providers: [{ provider_id: 1, provider_name: "Name 1", preferred_location: "campus 2", average_rating: 4.5}, { provider_id: 2, provider_name: "Name 2", average_rating: 4.5, preferred_location: "campus 1" }, { provider_id: 3, provider_name: "Name 3", average_rating: 4.5, preferred_location: "campus 2" }],
    provider: {
      provider_id: 1,
      provider_name: "Name 1",
      preferred_location: "campus 2",
      average_rating: 4.5,
    },
    author: "Author A",
    org_price: 80,
    major: "Computer Science",
    publisher: "Publisher A",
    cover_type: "Hardcover",
    pages: 300,
    publishing_year: 2020,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    related_books: [
      {
        id: 2,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
      {
        id: 3,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
      {
        id: 4,
        title: "The Great Gatsby",
        img_src: require("@/assets/images/book1.jpg"),
        condition: "used",
        leased_price: 30,
        sold_price: 20,
        is_leased: true,
        is_sold: true,
        is_from: true,
      },
    ],
  },
];

// get mocked data from backend/prisma/data/database_books.json

export default function BookInfo() {
  // add a function to fetch for book information
  const { book_id, provider_id } = useLocalSearchParams();
  const selected_book = mockedBooks.filter(
    (book) => book.id == Number(book_id)
  )[0];

  const provider = selected_book.provider;

  const handleProviderPress = () => {
    router.push(`/providers/${selected_book.id}`);
  };

  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const handleInfoExpand = () => setIsInfoExpanded(!isInfoExpanded);

  const maxLength = 200;
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const summary = isSummaryExpanded
    ? selected_book.summary
    : selected_book.summary.slice(0, maxLength) + "...";
  const handleSummaryExpand = () => setIsSummaryExpanded(!isSummaryExpanded);

  const [is_liked, setIsLiked] = useState(selected_book.in_wishlist);
  const handleLike = () => {
    setIsLiked(!is_liked);
    // add a function to change "in_wishlist" status in the backend
  };

  return (
    <ScrollView className="p-4">
      <View className="items-center">
        <Image
          style={styles.bookImg}
          source={selected_book.img_src}
          className="w-44 h-60"
          resizeMode="contain"
        />
        <TouchableOpacity className="bg-gray-200 rounded-lg shadow-md p-4 m-2 w-44 items-center">
          <Text>Preview</Text>
        </TouchableOpacity>

        <View style={styles.line} className="shadow-md"></View>

        <View className="w-full justify-center items-center relative">
          <Text
            className="text-2xl font-latobold text-center"
            style={{ width: "80%" }}
          >
            {selected_book?.title}
          </Text>
          <Text className="text-lg text-gray-600 font-latolight">
            Condition: {selected_book?.condition}
          </Text>

          <TouchableOpacity onPress={handleLike} style={styles.heart}>
            {is_liked && <Ionicons name="heart" size={28} color="red" />}
            {!is_liked && (
              <Ionicons name="heart-outline" size={28} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {/* display sold_price and/or leased_price */}
        {selected_book.is_leased && !selected_book.is_sold && (
          <Text className="text-lg">
            Leased Price: ${selected_book?.leased_price}
          </Text>
        )}
        {selected_book.is_sold && !selected_book.is_leased && (
          <Text className="text-lg">
            Sold Price: ${selected_book?.sold_price}
          </Text>
        )}
        {selected_book.is_sold && selected_book.is_leased && (
          <View>
            <View className="flex-row items-center">
              <Text className="text-lg font-lato">Leased Price: </Text>
              <Text className="text-lg font-latobold text-lightred">
                ${selected_book.leased_price}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-lg font-lato">Sold Price: </Text>
              <Text className="text-lg font-latobold text-lightred">
                ${selected_book.sold_price}
              </Text>
            </View>
          </View>
        )}

        {/* display buy/rent button */}
        <View className="flex flex-row">
          {selected_book.is_sold && (
            <CustomButtonPrimary
              handlePress={() => {}}
              text="Buy"
              buttonStyle={"px-8"}
            />
          )}
          {selected_book.is_leased && (
            <CustomButtonLight
              handlePress={() => {}}
              text="Rent"
              buttonStyle={"px-8 m-4"}
            />
          )}
        </View>

        {/* display provider information */}
        <View className="w-full items-center">
          <Text className="text-2xl font-latobold self-start">Providers</Text>
          <Text className="text-md font-latolight self-start">
            Select a Provider
          </Text>
          <TouchableOpacity
            onPress={handleProviderPress}
            className=" w-full bg-gray-200 p-4 m-4 shadow-md"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-lato">
                  {provider?.provider_name}
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
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* display information */}
        <View className="w-full items-center">
          <Text className="text-2xl font-latobold self-start">Information</Text>

          {[
            { label: "Author", value: selected_book.author },
            { label: "Original price", value: selected_book.org_price },
            { label: "Major", value: selected_book.major, expandable: true },
            {
              label: "Publisher",
              value: selected_book.publisher,
              expandable: true,
            },
            {
              label: "Cover Type",
              value: selected_book.cover_type,
              expandable: true,
            },
            { label: "Pages", value: selected_book.pages, expandable: true },
          ]
            .filter((item) => isInfoExpanded || !item.expandable) // Ẩn nếu chưa mở rộng
            .map(({ label, value }, index) => (
              <View key={label} className="w-full flex-row">
                <View
                  className="w-40"
                  style={
                    index === 0 ? styles.topStartTableCell : styles.tableCell
                  }
                >
                  <Text className="text-md font-latolight">{label}</Text>
                </View>
                <View
                  className="flex-1"
                  style={
                    index === 0 ? styles.topEndTableCell : styles.tableCell
                  }
                >
                  <Text className="text-md font-lato flex-1">{value}</Text>
                </View>
              </View>
            ))}

          <CustomButtonPrimary
            handlePress={handleInfoExpand}
            text={isInfoExpanded ? "Show Less" : "Show More"}
          />
        </View>

        <View className="w-full items-center">
          <Text className="text-2xl font-latobold self-start">Summary</Text>
          <Text className="text-md font-lato text-justify">{summary}</Text>
          <CustomButtonPrimary
            handlePress={handleSummaryExpand}
            text={isSummaryExpanded ? "Show Less" : "Show More"}
          />
        </View>

        <View className="w-full items-center">
          <Text className="text-2xl font-latobold self-start">
            Related Books
          </Text>
          <ScrollView horizontal>
            {selected_book.related_books.map((book, idx) => (
              <BookCard
                key={idx}
                id={book.id}
                img_src={book.img_src}
                title={book.title}
                is_leased={book.is_leased}
                is_sold={book.is_sold}
                leased_price={book.leased_price}
                sold_price={book.sold_price}
                is_from={book.is_from}
                color="gray"
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
    shadowOffset: { width: 0, height: 1 },
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  topStartTableCell: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderTopStartRadius: 10,
  },
  topEndTableCell: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderTopEndRadius: 10,
  },
  bottomStartTableCell: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderBottomStartRadius: 10,
  },
  bottomEndTableCell: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderBottomEndRadius: 10,
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
  heart: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  bookImg: { width: 176, height: 240 },
});
