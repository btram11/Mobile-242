import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import OrderItem from "@/components/OrderItem";

export default function YourOrders() {
  const router = useRouter();

  const navigateToOrderDetails = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  const orders = [
    {
      orderId: "1",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "2",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "3",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "4",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "5",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "6",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "7",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "8",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "9",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      orderId: "10",
      title: "The name of the Rose",
      status: "Waiting for confirmation",
      editableUntil: "19/02/2025",
      sellerName: "John Bookstore",
      sellerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.orderId}
      renderItem={({ item }) => (
        <OrderItem
          orderId={item.orderId}
          title={item.title}
          status={item.status}
          editableUntil={item.editableUntil}
          sellerName={item.sellerName}
          sellerAvatar={item.sellerAvatar}
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
