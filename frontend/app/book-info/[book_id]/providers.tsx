import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import Rating from "@/components/Rating";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
const mocked_data = {
  book_id: 1,
  title: "The Great Gasby",
  providers: [
    {
      provider_id: 1,
      provider_name: "Name 1",
      preferred_location: "Campus 2",
      average_rating: 4.5,
    },
    {
      provider_id: 2,
      provider_name: "Name 2",
      preferred_location: "Campus 1",
      average_rating: 3.5,
    },
    {
      provider_id: 3,
      provider_name: "Name 3",
      preferred_location: "Campus 1, Campus 2",
      average_rating: 2.5,
    },
  ],
};

export default function Providers() {
  const handlePress = () => {
    console.log("Provider clicked");
  };
  return (
    <View className="p-4">
      <View className="mb-8">
        <Text className="text-primary text-2xl font-latobold">
          Providers for {mocked_data.title}
        </Text>
        <Text className="text-gray-400 text-sm mb-4">
          List of providers available for {mocked_data.title}
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          {mocked_data.providers.map((provider, idx) => (
            <Link
              href={{
                pathname: "/book-info/[book_id]",
                params: {
                  book_id: String(mocked_data.book_id),
                  provider_id: String(provider.provider_id),
                },
              }}
              asChild
            >
              <TouchableOpacity
                key={idx}
                onPress={handlePress}
                className=" w-full bg-gray-200 p-4 shadow-md"
              >
                <View>
                  <Text className="text-lg font-lato">
                    {provider.provider_name}
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
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
