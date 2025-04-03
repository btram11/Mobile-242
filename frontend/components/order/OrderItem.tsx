import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type OrderItemProps = {
  name: string;
  quantity: number;
  price: string;
  imageUrl?: string;
};

const OrderItem = ({ name, quantity, price, imageUrl }: OrderItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri:
            imageUrl ||
            "https://m.media-amazon.com/images/I/81UxfL1hChL._AC_UF1000,1000_QL80_.jpg",
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemMeta}>Quantity: {quantity}</Text>
        <Text style={styles.itemPrice}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  itemImage: {
    width: 80,
    height: 110,
    borderRadius: 6,
    resizeMode: "cover",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#222",
  },
  itemMeta: {
    color: "#777",
    fontSize: 14,
    marginBottom: 6,
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#00664f",
  },
});

export default OrderItem;
