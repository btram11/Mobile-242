import React from "react";
import { View, Text, StyleSheet } from "react-native";

type OrderMetadataProps = {
  orderId: string;
  orderDate: string;
  editableUntil: string;
};

const OrderMetadata = ({
  orderId,
  orderDate,
  editableUntil,
}: OrderMetadataProps) => {
  return (
    <>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Order ID:</Text>
        <Text style={styles.infoValue}>{orderId}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Order Date:</Text>
        <Text style={styles.infoValue}>{orderDate}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Editable until:</Text>
        <Text style={styles.infoValue}>{editableUntil}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
});

export default OrderMetadata;
