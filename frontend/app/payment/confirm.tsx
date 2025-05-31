import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  buyBook,
  getBookDetailByBookIdandListingId,
  rentBook,
} from "@/services/book";
import { getProviderById } from "@/services/provider";

export default function PaymentConfirmation() {
  const { book_id, listing_id, paymentType, startDate, endDate } = useSelector(
    (state: any) => state.payment
  );
  // const { book_id, provider_id } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["bookDetails", book_id, listing_id],
    queryFn: () => getBookDetailByBookIdandListingId(book_id, listing_id),
    enabled: !!book_id && !!listing_id, // chỉ gọi khi có book_id và provider_id
  });

  const { data: provider, refetch: refetchProvider } = useQuery({
    queryKey: ["provider", book_id],
    queryFn: () => getProviderById(data?.provider_id),
    enabled: !!data?.provider_id,
  });

  const confirmPayment = useMutation({
    mutationFn: async () => {
      if (paymentType === "rental")
        return rentBook(book_id, listing_id, startDate, endDate);
      return buyBook(book_id, listing_id);
    },
    onSuccess: () => {
      router.replace(`/payment/success`);
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Failed to confirm payment");
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#008C6E" />
        <Text style={{ marginTop: 10 }}>Loading book details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Confirm Your Payment</Text> */}

      <Image
        source={data?.book?.img_url || require("@/assets/images/book1.jpg")}
        style={styles.bookImage}
      />

      <View style={styles.detailsBox}>
        <Text style={styles.infoTitle}>Book:</Text>
        <Text style={styles.infoValue}>{data?.book?.title}</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.infoTitle}>Condition:</Text>
          <View
            style={{
              backgroundColor: getConditionColor(data?.condition),
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
              {data?.condition}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.infoTitle}>Provider:</Text>
        <Text style={styles.infoValue}>{provider?.provider_name ?? "N/A"}</Text>

        {paymentType === "rental" && (
          <>
            <Text style={styles.infoTitle}>Rental Duration:</Text>
            <Text style={styles.infoValue}>
              {startDate} → {endDate}
            </Text>
            <Text style={[styles.infoValue, { fontSize: 13, color: "#888" }]}>
              (
              {Math.ceil(
                (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                  (1000 * 60 * 60 * 24) +
                  1
              )}{" "}
              days)
            </Text>
          </>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: 10,
            marginTop: 16,
          }}
        >
          <Text style={{ fontWeight: "600", color: "#555", fontSize: 16 }}>
            {paymentType === "purchase" ? "Price:" : "Rental Price:"}
          </Text>
          <Text style={{ fontWeight: "700", fontSize: 23, color: "#008C6E" }}>
            $
            {paymentType === "purchase" ? data?.sold_price : data?.leased_price}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={confirmPayment.mutate}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const getConditionColor = (condition: string) => {
  condition = condition.toLocaleLowerCase();
  switch (condition) {
    case "new":
      return "#4CAF50";
    case "like new":
      return "#2196F3";
    case "used":
      return "#FF9800";
    case "worn":
      return "#F44336";
    default:
      return "#9E9E9E";
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F9F9F9",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  bookImage: {
    width: 200,
    height: "auto",
    aspectRatio: 94 / 144,
    borderRadius: 12,
    marginBottom: 24,
    resizeMode: "cover",
  },
  detailsBox: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginTop: 12,
  },
  infoValue: {
    fontSize: 16,
    color: "#222",
    marginTop: 4,
  },
  confirmButton: {
    backgroundColor: "#008C6E",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
  },
});
