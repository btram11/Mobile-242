import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type SellerInfoProps = {
  name: string;
  avatar: string;
};

const SellerInfo = ({ name, avatar }: SellerInfoProps) => {
  return (
    <View style={styles.sellerContainer}>
      <Image source={{ uri: avatar }} style={styles.sellerAvatar} />
      <View style={styles.sellerInfo}>
        <Text style={styles.sellerName}>{name}</Text>
        <Text style={styles.sellerLabel}>Seller</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sellerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    backgroundColor: "#e6f2f0",
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#00664f",
  },
  sellerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#fff",
  },
  sellerInfo: {
    marginLeft: 16,
  },
  sellerName: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#333",
  },
  sellerLabel: {
    color: "#777",
    fontSize: 14,
    marginTop: 2,
  },
});

export default SellerInfo;
