import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import OrderItem from "@/components/OrderItem";

export default function YourOrders() {
  const router = useRouter();

  const navigateToOrderDetails = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <OrderItem
        orderId="123"
        title="The name of the Rose"
        status="Waiting for confirmation"
        editableUntil="19/02/2025"
        sellerName="John Bookstore"
        sellerAvatar="https://randomuser.me/api/portraits/men/32.jpg"
        onPress={navigateToOrderDetails}
      />
      <OrderItem
        orderId="123"
        title="The name of the Rose"
        status="Waiting for confirmation"
        editableUntil="19/02/2025"
        sellerName="John Bookstore"
        sellerAvatar="https://randomuser.me/api/portraits/men/32.jpg"
        onPress={navigateToOrderDetails}
      />
      <OrderItem
        orderId="123"
        title="The name of the Rose"
        status="Waiting for confirmation"
        editableUntil="19/02/2025"
        sellerName="John Bookstore"
        sellerAvatar="https://randomuser.me/api/portraits/men/32.jpg"
        onPress={navigateToOrderDetails}
      />
      <OrderItem
        orderId="123"
        title="The name of the Rose"
        status="Waiting for confirmation"
        editableUntil="19/02/2025"
        sellerName="John Bookstore"
        sellerAvatar="https://randomuser.me/api/portraits/men/32.jpg"
        onPress={navigateToOrderDetails}
      />
    </ScrollView>
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
