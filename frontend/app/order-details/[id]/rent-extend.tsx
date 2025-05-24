import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function RentExtend() {
  const router = useRouter();
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentEndDate = new Date("2023-04-20"); // Replace with actual end date from rental details

  const handleExtend = () => {
    if (!newEndDate) {
      Alert.alert("Error", "Please select a new end date.");
      return;
    }

    if (newEndDate <= currentEndDate) {
      Alert.alert(
        "Invalid Date",
        "The new end date must be later than the current end date."
      );
      return;
    }

    // Implement extend functionality here
    console.log("Extend rental period to:", newEndDate.toISOString());
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewEndDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extend Rental Period</Text>
      <Text style={styles.description}>
        Choose a new end date for your rental period. The new date must be later
        than {currentEndDate.toDateString()}.
      </Text>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerButtonText}>
          {newEndDate
            ? `New End Date: ${newEndDate.toDateString()}`
            : "Select New End Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          minimumDate={new Date(currentEndDate.getTime() + 24 * 60 * 60 * 1000)} // Minimum date is one day after current end date
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleExtend}>
        <Text style={styles.buttonText}>Confirm Extension</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  datePickerButton: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  datePickerButtonText: {
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#008C6E",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelButtonText: {
    color: "#555",
    fontSize: 16,
  },
});
