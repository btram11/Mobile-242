import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookCard2 } from "@/components/BookCard";
import { mockedBooks } from "@/mocks/data";

function LikedBooks() {
  const loadMoreBooks = () => {
    // Logic to fetch more books and update the mockedBooks array
  };

  return (
    <FlatList
      data={mockedBooks}
      keyExtractor={(book, idx) => `${book.id}-${idx}`}
      numColumns={2}
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 16,
      }}
      renderItem={({ item, index }) => (
        <BookCard2
          id={item.id}
          img_src={item.img_src}
          title={item.title}
          sold_price={item.sold_price}
          is_sold={item.is_sold}
          is_leased={item.leased_price}
          leased_price={item.leased_price}
          is_from={item.is_from}
          color={index % 2 == 0 ? "gray" : "green"}
        />
      )}
      onEndReached={loadMoreBooks}
      onEndReachedThreshold={0.5}
    />
  );
}

export default LikedBooks;
