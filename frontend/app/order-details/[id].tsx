import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Import components
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import SellerInfo from "@/components/order/SellerInfo";
import OrderMetadata from "@/components/order/OrderMetadata";
import OrderItem from "@/components/order/OrderItem";
import TotalPrice from "@/components/order/TotalPrice";
import InfoItem from "@/components/order/InfoItem";
import SectionTitle from "@/components/common/SectionTitle";
import Divider from "@/components/common/Divider";

// Assuming these custom button components exist
import {
  CustomButtonPrimary,
  CustomButtonOutlined,
} from "@/components/CustomSquareButton";

export default function OrderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // In a real app, you would fetch the order details using the ID
  const orderDetails = {
    title: "The name of the Rose",
    status: "Waiting for confirmation",
    orderDate: "15/02/2023",
    editableUntil: "19/02/2025",
    items: [{ name: "The name of the Rose", quantity: 1, price: "15.99€" }],
    totalPrice: "15.99€",
    shippingAddress: "123 Main St, City, Country",
    paymentMethod: "Credit Card",
    seller: {
      name: "Book Store Official",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  };

  const handleEdit = () => {
    // Implement edit functionality here
    console.log("Edit order", id);
  };

  const handleCancel = () => {
    // Implement cancel functionality here
    console.log("Cancel order", id);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Order Details</Text>
      <View style={styles.detailCard}>
        <Text style={styles.title}>{orderDetails.title}</Text>
        <OrderStatusBadge status={orderDetails.status} />

        {/* Seller information */}
        <SellerInfo
          name={orderDetails.seller.name}
          avatar={orderDetails.seller.avatar}
        />

        {/* Order metadata */}
        <OrderMetadata
          orderId={id as string}
          orderDate={orderDetails.orderDate}
          editableUntil={orderDetails.editableUntil}
        />

        <SectionTitle title="Item" />
        <OrderItem
          name={orderDetails.items[0].name}
          quantity={orderDetails.items[0].quantity}
          price={orderDetails.items[0].price}
        />

        <Divider />
        <TotalPrice price={orderDetails.totalPrice} />
        <Divider />

        <SectionTitle title="Shipping Address" />
        <InfoItem content={orderDetails.shippingAddress} type="address" />

        <SectionTitle title="Payment Method" />
        <InfoItem content={orderDetails.paymentMethod} type="payment" />

        {/* Button section */}
        <View style={styles.buttonContainer}>
          <CustomButtonOutlined
            title="Edit Order"
            onPress={handleCancel}
            containerStyle={styles.editButton}
            textStyle={styles.editButtonText}
          />
          <CustomButtonOutlined
            title="Cancel Order"
            onPress={handleCancel}
            containerStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f7",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  editButton: {
    backgroundColor: "#00664f",
    padding: 14,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  editButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b33939",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  cancelButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#b33939",
  },
});
