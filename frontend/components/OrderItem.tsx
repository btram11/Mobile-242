import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import SellerInfo from "./order/SellerInfo";

interface OrderItemProps {
  orderId: string;
  title: string;
  status: string;
  editableUntil: string;
  sellerName: string;
  bookImage?: string; // New prop for book image
  price: string; // New prop for price
  onPress: (orderId: string) => void;
}

const OrderItem = ({
  orderId,
  title,
  status,
  editableUntil,
  sellerName,
  bookImage, // Destructure the new prop
  price, // Destructure the new prop
  onPress,
  ...props
}: OrderItemProps) => {
  const isComplete = status.toLowerCase() === "complete"; // Check if the order is complete

  return (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => onPress(orderId)}
      {...props}
    >
      <View style={styles.headerRow}>
        <Text style={styles.sellerName}>{sellerName}</Text>
        <Text style={styles.orderStatus} className="text-viridian-500">
          {status}
        </Text>
      </View>
      <View style={styles.contentRow}>
        {bookImage && (
          <Image
            source={bookImage || require("@/assets/images/book1.jpg")}
            style={styles.bookImage}
          />
        )}
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.orderTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.orderPrice}>Price: {price}</Text>
          </View>
          {!isComplete && (
            <Text style={styles.orderEditable}>
              Editable until: {editableUntil}
            </Text>
          )}
        </View>
      </View>
      {/* Display price */}
      {isComplete && (
        <View className="flex flex-row justify-end">
          <TouchableOpacity className="flex justify-center items-center border-[1.2px] border-viridian-400 py-2 px-5 rounded">
            <Text className="text-viridian-400 text-sm">Rate</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#008C6E",
    flexDirection: "column",
    gap: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  contentRow: {
    flexDirection: "row",
  },
  bookImage: {
    width: 70,
    height: "auto",
    aspectRatio: 94 / 144,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderStatus: {
    fontSize: 11.2,
    fontWeight: "medium",
  },
  orderEditable: {
    fontSize: 11.5,
    color: "#777",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  sellerName: {
    fontSize: 11.5,
    color: "#333",
    fontWeight: "bold",
  },
  orderPrice: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default OrderItem;
