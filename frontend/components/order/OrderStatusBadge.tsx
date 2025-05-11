import React from "react";
import { View, Text, StyleSheet } from "react-native";

type OrderStatusBadgeProps = {
  status: string;
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusIndicator} />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffd300",
    marginRight: 8,
  },
  statusText: {
    fontSize: 13,
    color: "#555",
  },
});

export default OrderStatusBadge;
