import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

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
import { ChevronRight } from "lucide-react-native";

export default function OrderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // In a real app, you would fetch the order details using the ID
  const orderDetails = {
    title: "The name of the Rose",
    status: "Waiting for confirmation",
    orderDate: "15/02/2023",
    editableUntil: "19/02/2025",
    items: [
      {
        name: "The name of the Rose",
        quantity: 1,
        price: "15.99€",
        id: "1",
        book_image: require("@/assets/images/book2.jpg"),
      },
    ],
    totalPrice: "15.99€",
    shippingAddress: "123 Main St, City, Country",
    paymentMethod: "Credit Card",
    seller: {
      name: "Book Store Official",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    type: "rent",
    rental: {
      startDate: "20/02/2023",
      endDate: "20/04/2023",
      returnStatus: "Ongoing",
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Card: Basic Info */}
        <View style={styles.card}>
          <View className="flex flex-col items-end">
            <OrderStatusBadge status={orderDetails.status} />
          </View>

          <OrderMetadata
            orderId={id as string}
            orderDate={orderDetails.orderDate}
            editableUntil={orderDetails.editableUntil}
          />
        </View>

        {orderDetails.type === "rent" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Rental Details</Text>

            <View style={styles.rentalRow}>
              <View style={styles.rentalItem}>
                <Text style={styles.rentalLabel}>Start Date</Text>
                <Text style={styles.rentalValue}>
                  {orderDetails.rental.startDate}
                </Text>
              </View>

              <View style={styles.rentalItem}>
                <Text style={styles.rentalLabel}>End Date</Text>
                <Text style={styles.rentalValue}>
                  {orderDetails.rental.endDate}
                </Text>
              </View>

              <View style={styles.rentalItem}>
                <Text style={styles.rentalLabel}>Cycle</Text>
                <Text style={styles.rentalValue}>2 months</Text>
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={styles.rentalLabel}>Return Status</Text>
              <Text style={styles.returnStatus}>
                {orderDetails.rental.returnStatus}
              </Text>
            </View>
          </View>
        )}

        {/* Card: Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items</Text>

          <TouchableOpacity
            style={styles.sellerRow}
            onPress={
              () => {}
              // navigation.navigate("SellerProfile", {
              //   sellerId: orderDetails.seller.id,
              // })
            }
          >
            <View style={styles.sellerLink}>
              <Text style={styles.sellerValue}>{orderDetails.seller.name}</Text>
              <ChevronRight size={16} color="#888" />
            </View>
          </TouchableOpacity>

          {orderDetails.items.map((item, index) => (
            <OrderItem
              key={index}
              id={item.id}
              imageUrl={item.book_image}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          ))}

          <Divider />
          <TotalPrice price={orderDetails.totalPrice} />
        </View>

        {/* Card: Shipping Info */}
        <View style={styles.card}>
          <SectionTitle title="Shipping Address" />
          <InfoItem content={orderDetails.shippingAddress} type="address" />

          <SectionTitle title="Payment Method" />
          <InfoItem content={orderDetails.paymentMethod} type="payment" />
        </View>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          {/* <CustomButtonPrimary title="Edit Order" onPress={handleEdit} /> */}
          <CustomButtonOutlined
            title="Cancel Order"
            onPress={handleCancel}
            containerStyle={styles.outlinedButton}
            textStyle={styles.outlinedText}
          />
        </View>
      </ScrollView>
      <View style={[styles.bottomBar, { paddingBottom: 12 }]}>
        <View className="flex flex-row justify-between gap-x-5">
          {orderDetails.type === "buy" && (
            <TouchableOpacity className="flex-1 justify-center items-center border border-viridian-400 py-3 rounded">
              <Text className="text-viridian-400 text-base">Rate</Text>
            </TouchableOpacity>
          )}

          {orderDetails.type === "rent" && (
            <>
              <TouchableOpacity
                className="flex-1 justify-center items-center border border-viridian-400 py-3 rounded"
                onPress={() => router.push(`/order-details/${id}/rent-return`)}
              >
                <Text className="text-viridian-400 text-base">Return</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 justify-center items-center bg-viridian-400 py-3 rounded"
                onPress={() => router.push(`/order-details/${id}/rent-extend`)}
              >
                <Text className="text-white text-base">Extend</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  sellerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  sellerLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // nếu dùng react-native 0.71+
  },
  sellerValue: {
    color: "#007BFF",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#008C6E",
  },

  rentalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  rentalItem: {
    flex: 1,
  },
  rentalLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  rentalValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  returnStatus: {
    fontSize: 14,
    color: "#1e90ff",
    fontWeight: "600",
    marginTop: 4,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  container: {
    flex: 1,
    backgroundColor: "#f0f4f5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flexShrink: 1,
    paddingRight: 8,
  },
  buttonGroup: {
    marginTop: 12,
    gap: 12,
  },
  outlinedButton: {
    borderColor: "#b33939",
    borderWidth: 1.5,
    backgroundColor: "#fff",
  },
  outlinedText: {
    color: "#b33939",
    fontWeight: "600",
  },
});
