// @ts-nocheck
import { useModal } from "@/context/ModalContext";
import { setPaymentData } from "@/features/payment/paymentSlice";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";

export default function RentBook() {
  const { book_id, provider_id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.rental
  );

  const isDateUnavailable = (date) => {
    return unavailableDates.includes(date) || date < providerAvailableFrom;
  };
  const showCalendar = (pickerType) => {
    setCurrentPicker(pickerType);
    setCalendarVisible(true);
  };

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      Alert.alert("Error", "Please select both start and end dates.");
      return;
    }
    dispatch(setPaymentData({ book_id, provider_id, paymentType: "rental" }));
    router.push(`/payment/confirm`);
  };
  const handleSelectDate = () => {
    openModal("DateRangePicker", {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Rental Dates</Text>

      <TouchableOpacity onPress={handleSelectDate} style={styles.dateButton}>
        <Text style={styles.dateText}>
          Start Date: {startDate || "Select a date"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSelectDate} style={styles.dateButton}>
        <Text style={styles.dateText}>
          End Date: {endDate || "Select a date"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dateButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },

  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
