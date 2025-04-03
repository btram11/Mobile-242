import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

interface OrderItemProps {
  orderId: string;
  title: string;
  status: string;
  editableUntil: string;
  sellerName: string;
  sellerAvatar: string;
  onPress: (orderId: string) => void;
}

const OrderItem = ({
  orderId,
  title,
  status,
  editableUntil,
  sellerName,
  sellerAvatar,
  onPress,
}: OrderItemProps) => {
  return (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => onPress(orderId)}
    >
      <Text style={styles.orderTitle}>{title}</Text>
      <Text style={styles.orderStatus}>Status: {status}</Text>
      <Text style={styles.orderEditable}>Editable until: {editableUntil}</Text>

      <View style={styles.sellerContainer}>
        <Image source={{ uri: sellerAvatar }} style={styles.sellerAvatar} />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerLabel}>Seller/Lender</Text>
          <Text style={styles.sellerName}>{sellerName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#00664f",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  orderStatus: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },
  orderEditable: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  sellerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sellerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerLabel: {
    fontSize: 12,
    color: "#888",
  },
  sellerName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
});

export default OrderItem;
