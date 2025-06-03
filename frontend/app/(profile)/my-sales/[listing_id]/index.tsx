import ConfirmCancelBar from "@/components/BottomBar";
import {
  confirmBuyBook,
  confirmRentBook,
  getBookDetailByBookIdandListingId,
  getBuyerInfo,
  deleteListingByBookIdandListingId,
} from "@/services/book";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

const buyer = {
  name: "Nguyen Van A",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  email: "nguyenvana@example.com",
  phone: "0901234567",
};

export default function MySalesDetail() {
  const { listing_id, book_id } = useLocalSearchParams();
  const { data: saleDetail } = useQuery({
    queryKey: ["sale-detail", listing_id, book_id],
    queryFn: () =>
      getBookDetailByBookIdandListingId(
        book_id as string,
        listing_id as string
      ),
    enabled: !!listing_id && !!book_id,
  });
  const { data: buyerData } = useQuery({
    queryKey: ["buyer", listing_id, book_id],
    queryFn: () => getBuyerInfo(book_id as string, listing_id as string),
    enabled: !!listing_id && !!book_id,
  });

  const confirmMutation = useMutation({
    mutationFn: () => {
      if (saleDetail?.is_bought) {
        return confirmBuyBook(book_id as string, listing_id as string);
      }
      return confirmRentBook(book_id as string, listing_id as string);
    },
    onSuccess: () => {
      console.log("Confirm action successful");
    },
    onError: (error) => {
      console.error("Error confirming action:", error);
    },
  });

  const cancleMutation = useMutation({
    mutationFn: () => {
      if (saleDetail?.is_bought) {
        return confirmBuyBook(book_id as string, listing_id as string);
      }
      return confirmRentBook(book_id as string, listing_id as string);
    },
    onSuccess: () => {
      console.log("Cancel action successful");
    },
    onError: (error) => {
      console.error("Error canceling action:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteListingByBookIdandListingId(
        book_id as string,
        listing_id as string
      ),
    onSuccess: () => {
      console.log("Delete action successful");
      navigation.goBack(); // Quay lại trang trước sau khi xoá
    },
    onError: (error) => {
      console.error("Error deleting listing:", error);
      Alert.alert("Error", "Failed to delete the listing. Please try again.");
    },
  });
  const navigation = useNavigation();

  useLayoutEffect(() => {
    console.log("Sale detail:", saleDetail);
    if (saleDetail && !saleDetail.is_in_progress && !saleDetail.is_complete) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this listing?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      await deleteMutation.mutateAsync();
                    },
                  },
                ]
              )
            }
            style={{ marginRight: 12 }}
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({ headerRight: undefined }); // Ẩn nút nếu không đủ điều kiện
    }
  }, [navigation, saleDetail?.is_in_progress, saleDetail?.is_complete]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>📚 Book Information</Text>
        <View style={styles.card}>
          <View style={styles.bookCoverHolder}>
            {saleDetail?.book?.img_url && (
              <Image
                source={saleDetail?.book?.img_url}
                style={styles.bookCover}
              />
            )}
            {!saleDetail?.book?.img_url && (
              <View
                style={[
                  styles.bookCover,
                  {
                    backgroundColor: "#eee",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text className="text-xs text-gray-400">No Image</Text>
              </View>
            )}
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{saleDetail?.book?.title}</Text>
            <Text style={styles.bookAuthor}>
              Author: {saleDetail?.book?.author}
            </Text>

            <Text style={styles.bookDescription}>
              {saleDetail?.book?.summary || "No summary available"}
            </Text>
            <Text style={styles.bookField}>
              Publisher: {saleDetail?.book?.publisher || "Unknown"}
            </Text>
            <Text style={styles.bookField}>
              Year: {saleDetail?.book?.publishing_year || "Unknown"}
            </Text>
            <Text style={styles.bookField}>
              Subject: {saleDetail?.book?.subject || "Unknown"}
            </Text>
            <Text style={styles.bookField}>
              Category: {saleDetail?.book?.category || "Unknown"}
            </Text>

            {saleDetail?.is_bought && (
              <Text style={styles.bookPrice}>
                Price: {saleDetail?.sold_price}
              </Text>
            )}
            {saleDetail?.is_rented && (
              <Text style={styles.bookPrice}>
                Rent Price: {saleDetail?.leased_price}
              </Text>
            )}

            {saleDetail?.is_rented && (
              <View style={styles.rentalInfo}>
                <Text style={styles.rentalTitle}>📅 Rental Information</Text>
                <Text style={styles.rentalText}>
                  Start: {saleDetail?.is_rented_rel?.startDate}
                </Text>
                <Text style={styles.rentalText}>
                  End: {saleDetail?.is_rented_rel?.endDate}
                </Text>
              </View>
            )}
          </View>
        </View>

        {buyerData && (
          <>
            <Text style={styles.sectionTitle}>👤 Buyer Information</Text>
            <View style={styles.card}>
              <View style={styles.buyerRow}>
                <Image
                  source={{ uri: buyer.avatar }}
                  style={styles.buyerAvatar}
                />
                <View style={styles.buyerInfo}>
                  <Text style={styles.buyerName}>{buyerData?.username}</Text>
                  <Text style={styles.buyerContact}>📧 {buyerData?.email}</Text>
                  <Text style={styles.buyerContact}>
                    📞 {buyerData?.phone_number}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {saleDetail?.inprogress && (
        <ConfirmCancelBar
          handleConfirm={confirmMutation.mutate}
          handleCancel={cancleMutation.mutate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  bookCoverHolder: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "cover",
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  bookCover: {
    width: "auto",
    height: "100%",
    aspectRatio: 94 / 144,
  },
  bookInfo: {
    gap: 6,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  bookAuthor: {
    fontSize: 15,
    color: "#666",
  },
  bookPrice: {
    fontSize: 16,
    color: "#e53935",
    fontWeight: "600",
  },
  bookDescription: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  bookField: {
    fontSize: 14,
    color: "#444",
  },

  rentalInfo: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  rentalTitle: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  rentalText: {
    fontSize: 14,
    color: "#555",
  },
  buyerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buyerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  buyerInfo: {
    flex: 1,
    gap: 4,
  },
  buyerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  buyerContact: {
    fontSize: 14,
    color: "#555",
  },
});
