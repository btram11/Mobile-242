import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import OrderItem from "@/components/OrderItem";

export default function InProgressOrders() {
  const router = useRouter();

  const navigateToOrderDetails = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  const orders = [
    {
      orderId: "1",
      title: "1984",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "George Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$12.50",
    },
    {
      orderId: "2",
      title: "To Kill a Mockingbird",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Harper Books",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$10.99",
    },
    {
      orderId: "3",
      title: "Pride and Prejudice",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Jane's Library",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$8.45",
    },
    {
      orderId: "4",
      title: "The Great Gatsby",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Fitzgerald Hub",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$11.25",
    },
    {
      orderId: "5",
      title: "The Catcher in the Rye",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Salinger Books",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$9.30",
    },
    {
      orderId: "6",
      title: "Brave New World",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Huxley House",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$13.40",
    },
    {
      orderId: "7",
      title: "Moby-Dick",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Melville Mart",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$14.75",
    },
    {
      orderId: "8",
      title: "Crime and Punishment",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Dostoevsky Den",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$13.80",
    },
    {
      orderId: "9",
      title: "War and Peace",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Tolstoy Books",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$16.20",
    },
    {
      orderId: "10",
      title: "The Brothers Karamazov",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "Russian Classics",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      // bookImage: require("@/assets/images/book1.jpg"),
      price: "$15.60",
    },
  ];

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.orderId}
      renderItem={({ item, index }) => (
        <OrderItem
          key={index}
          orderId={item.orderId}
          title={item.title}
          status={item.status}
          editableUntil={item.editableUntil}
          sellerName={item.sellerName}
          bookImage={item.bookImage}
          price={item.price}
          onPress={navigateToOrderDetails}
        />
      )}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 16,
  },
});
