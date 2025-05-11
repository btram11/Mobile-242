import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TotalPriceProps = {
  price: string;
};

const TotalPrice = ({ price }: TotalPriceProps) => {
  return (
    <View style={styles.totalPriceContainer}>
      <Text style={styles.totalPriceLabel}>Total Price</Text>
      <Text style={styles.totalPriceValue}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008C6E",
  },
});

export default TotalPrice;
