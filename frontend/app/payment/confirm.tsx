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

export default function PaymentConfirmation() {
  const { book_id, provider_id, paymentType, startDate, endDate } = useSelector(
    (state: any) => state.payment
  );
  // const { book_id, provider_id } = useLocalSearchParams();
  const [bookDetails, setBookDetails] = useState<any>(null);

  useEffect(() => {
    const mockDetails = {
      name: "The Subtle Art of Not Giving a F*ck",
      image: require("@/assets/images/book1.jpg"),
      provider: { name: "Book Provider Inc." },
      price: { type: paymentType, amount: "12.99" },
      rentalDetails: {
        start: startDate,
        end: endDate,
        cycle:
          startDate && endDate
            ? `${Math.ceil(
                (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                  (1000 * 60 * 60 * 24) +
                  1
              )} days`
            : "",
      },
    };
    setTimeout(() => setBookDetails(mockDetails), 500); // giả delay
  }, [book_id, provider_id]);

  const handleConfirmPayment = () => {
    router.replace(`/payment/success`);
  };

  if (!bookDetails) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#008C6E" />
        <Text style={{ marginTop: 10 }}>Loading book details...</Text>
      </View>
    );
  }

  const { name, image, provider, price, rentalDetails } = bookDetails;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Confirm Your Payment</Text> */}

      <Image
        source={image || require("@/assets/images/book1.jpg")}
        style={styles.bookImage}
      />

      <View style={styles.detailsBox}>
        <Text style={styles.infoTitle}>Book:</Text>
        <Text style={styles.infoValue}>{name}</Text>

        <Text style={styles.infoTitle}>Provider:</Text>
        <Text style={styles.infoValue}>{provider.name}</Text>

        <Text style={styles.infoTitle}>
          {price.type === "purchase" ? "Price:" : "Rental Price:"}
        </Text>
        <Text style={styles.infoValue}>${price.amount}</Text>

        {price.type === "rental" && (
          <>
            <Text style={styles.infoTitle}>Rental Duration:</Text>
            <Text style={styles.infoValue}>
              {rentalDetails.start} → {rentalDetails.end} ({rentalDetails.cycle}
              )
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={handleConfirmPayment}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
});
