//@ts-nocheck
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Touchable,
  TouchableWithoutFeedback,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useState, useLayoutEffect, useEffect } from "react";
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
import { useHeaderHeart } from "@/hooks/useFavoriteHeader";
import { useDispatch } from "react-redux";
import { setPaymentData } from "@/features/payment/paymentSlice";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "@/services/book";

import { Skeleton } from "moti/skeleton";

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const route = useRoute();
  // const { book_id } = route.params;
  const { book_id, provider_id } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["book", book_id],
    queryFn: () => getBookById(book_id),
  });

  const selected_book = mockedBooks.filter(
    (book) => book.id == Number(book_id)
  )[0];
  // const provider = selected_book.provider;

  const handleProviderPress = () => {
    router.push(`/book-info/${book_id}/providers`);
  };

  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const handleInfoExpand = () => setIsInfoExpanded(!isInfoExpanded);

  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const handleSummaryExpand = () => setIsSummaryExpanded(!isSummaryExpanded);

  const maxLength = 200;
  const fullSummary = data?.summary ?? "";
  const shouldShowExpand = fullSummary.length > maxLength;

  const displayedSummary = shouldShowExpand
    ? isSummaryExpanded
      ? fullSummary
      : fullSummary.slice(0, maxLength) + "…"
    : fullSummary;

  // useHeaderHeart(selected_book.in_wishlist);

  // const [isFavorited, setIsFavorited] = useState(selected_book.in_wishlist);
  // const handleLike = () => {
  //   setIsFavorited((prev) => !prev);
  //   // add a function to change "in_wishlist" status in the backend
  // };
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         key={String(isFavorited)}
  //         onPressIn={handleLike}
  //         // use onPressIn as onPress is not firing in the header (issue related to https://github.com/software-mansion/react-native-screens/issues/2219)
  //         style={{ marginRight: 16 }}
  //       >
  //         <Ionicons
  //           name={isFavorited ? "heart" : "heart-outline"}
  //           size={32}
  //           color={"red"}
  //         />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, isFavorited]);
  if (isLoading) {
    return <BookInfoSkeleton />;
  }

  return (
    <ScrollView
      className="p-4 bg-[#F7F7F7]"
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center gap-2">
        <View className="flex flex-row w-full gap-5">
          <Image
            style={styles.bookImg}
            source={data?.img_url || require("@/assets/images/book1.jpg")}
            // className="w-44 h-60"
            resizeMode="stretch"
          />
          <View className="flex-1 flex">
            <View className="flex-1">
              <Text className="text-2xl font-latobold">
                {(data?.title || "").split("/")[0].trim()}
              </Text>
              <Text className="text-lg text-gray-600 font-latolight">
                Condition: {data?.condition}
              </Text>
              {/* display sold_price and/or leased_price */}
              {selected_book?.is_leased && !selected_book?.is_sold && (
                <Text className="text-lg">
                  Leased Price: ${selected_book?.leased_price}
                </Text>
              )}
              {selected_book?.is_sold && !selected_book?.is_leased && (
                <Text className="text-lg">
                  Sold Price: ${selected_book?.sold_price}
                </Text>
              )}
              {selected_book?.is_sold && selected_book?.is_leased && (
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-lg font-lato">Leased Price: </Text>
                    <Text className="text-lg font-latobold text-lightred">
                      ${selected_book?.leased_price}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-lg font-lato">Sold Price: </Text>
                    <Text className="text-lg font-latobold text-lightred">
                      ${selected_book?.sold_price}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity className="flex border-2 border-black rounded-md w-28 h-10 items-center justify-center">
              <Text className="text-xs font-medium text-viridian-500">
                Preview
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.line}></View>

        {/* display buy/rent button */}
        <View className="flex flex-row">
          {data?.is_sold && (
            <CustomButtonPrimary
              handlePress={() => {
                dispatch(
                  setPaymentData({
                    book_id,
                    provider_id,
                    paymentType: "purchase",
                  })
                );
                router.push("/payment/confirm");
              }}
              text="Buy"
              buttonStyle={"px-8 flex-1 flex items-center"}
              style={{ maxWidth: "50%" }}
            />
          )}
          {data?.is_leased && (
            <CustomButtonLight
              handlePress={() => {
                router.push(
                  `/book-info/${book_id}/rent?provider_id=${provider_id || 1}`
                );
              }}
              text="Rent"
              buttonStyle={"px-8 flex-1 flex items-center max-w-1/2"}
              style={{ maxWidth: "50%" }}
            />
          )}
        </View>

        {/* display provider information */}
        {/* <View className="w-full items-center">
          <Text className="text-2xl font-latobold self-start">Providers</Text>
          <Text className="text-md font-latolight self-start">
            Select a Provider
          </Text>
          <TouchableOpacity
            onPress={handleProviderPress}
            className=" w-full bg-gray-200 p-4 m-4 shadow-lg shadow-black rounded-xl"
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
                    {provider?.preferred_location}
                  </Text>
                </View>
                <View>
                  <View className="flex-row items-center">
                    <Text className="text-md font-latolight">Rating: </Text>
                    <Rating rating={provider?.average_rating} />
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
        </View> */}

        {/* display information */}
        <View className="w-full items-center gap-2">
          <Text className="text-2xl font-latobold self-start">Information</Text>

          <View className="w-full items-center">
            {[
              { label: "Author", value: data?.author },
              { label: "Original price", value: data?.org_price },
              {
                label: "Major",
                value: data?.major || data?.subject,
                expandable: true,
              },
              {
                label: "Publisher",
                value: data?.publisher,
                expandable: true,
              },
              {
                label: "Publishing Year",
                value: data?.publishing_year,
                expandable: true,
              },
              {
                label: "Cover Type",
                value: data?.cover_type,
                expandable: true,
              },
              { label: "Pages", value: data?.pages, expandable: true },
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
          </View>

          {/* <CustomButtonPrimary
            handlePress={handleInfoExpand}
            text={isInfoExpanded ? "Show Less" : "Show More"}
          /> */}
          <Text
            onPress={handleInfoExpand}
            style={{ textDecorationLine: "underline" }}
          >
            {isInfoExpanded ? "Show Less" : "Show More"}
          </Text>
        </View>

        <View className="w-full items-center gap-2 mb-2">
          <Text className="text-2xl font-latobold self-start">Summary</Text>
          <Text className="text-md font-lato text-justify w-full">
            {displayedSummary || "No summary available"}
          </Text>
          {/* <CustomButtonPrimary
            handlePress={handleSummaryExpand}
            text={isSummaryExpanded ? "Show Less" : "Show More"}
          /> */}
          {shouldShowExpand && (
            <Text
              onPress={handleSummaryExpand}
              style={{ textDecorationLine: "underline" }}
            >
              {isSummaryExpanded ? "Show Less" : "Show More"}
            </Text>
          )}
        </View>

        <View className="w-full items-center">
          <Text className="text-2xl font-latobold self-start">
            Related Books
          </Text>
          <View className="w-full">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selected_book?.related_books.map((book, idx) => (
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1.2,
    backgroundColor: "#88889D",
    marginTop: 16,
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
  },
  container: {
    padding: 20,
  },
  contentContainer: {
    paddingVertical: 20,
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
  bookImg: { width: 151, height: 235 },
});

function BookInfoSkeleton() {
  return (
    <ScrollView
      className="p-4 bg-[#F7F7F7]"
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header: ảnh + title */}
      <View className="items-center gap-5">
        <View className="flex flex-row w-full gap-5">
          <Skeleton colorMode="light" radius={12} height={235} width={151} />
          <View className="flex-1 flex gap-2">
            <Skeleton colorMode="light" radius={4} height={60} width="100%" />
            <Skeleton colorMode="light" radius={4} height={20} width="70%" />
            <Skeleton colorMode="light" radius={4} height={20} width="80%" />
          </View>
        </View>
        <Skeleton colorMode="light" radius={4} height={2} width="100%" />
        <View className="flex items-center">
          <Skeleton
            colorMode="light"
            radius={4}
            height={40}
            width="80%"
            // style={{ marginRight: 10 }}
          />
        </View>

        {/* Provider information */}
        <View className="w-full flex flex-col gap-2">
          <Skeleton
            colorMode="light"
            radius={4}
            height={40}
            width="40%"
            className="self-start"
          />
          <Skeleton
            colorMode="light"
            radius={4}
            height={28}
            width="20%"
            className="self-start"
          />
          <Skeleton colorMode="light" radius={4} height={130} width="100%" />
        </View>

        {/* Information section */}
        <View className="w-full gap-2">
          <Skeleton
            colorMode="light"
            radius={4}
            height={40}
            width="50%"
            className="self-start"
          />

          <View className="w-full items-center">
            <Skeleton colorMode="light" radius={4} height={130} width="100%" />
          </View>
        </View>
      </View>

      {/* Information rows */}
    </ScrollView>
  );
}
