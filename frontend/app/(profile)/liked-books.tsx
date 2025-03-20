import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookCard2 } from "@/components/BookCard";
import { mockedBooks } from "@/mocks/data";

function LikedBooks() {
  return (
    // <View className="bg-secondarydark flex-1">
    <ScrollView className="bg-white">
      <View className="flex flex-wrap flex-row justify-between p-4">
        {mockedBooks.map((book, idx) => (
          <BookCard2
            key={idx}
            id={book.id}
            img_src={book.img_src}
            title={book.title}
            sold_price={book.sold_price}
            is_sold={book.is_sold}
            is_leased={book.leased_price}
            leased_price={book.leased_price}
            is_from={book.is_from}
            color={idx % 2 == 0 ? "gray" : "green"}
          />
        ))}
      </View>
    </ScrollView>
    // </View>
  );
}

export default LikedBooks;
