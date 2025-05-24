import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function RentReturn() {
  const router = useRouter();

  const handleReturn = () => {
    // Implement return functionality here
    console.log("Return rental item");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Return Rental Item</Text>
      <Text style={styles.description}>
        Confirm the return of your rental item.
      </Text>
      {/* Add confirmation details or steps */}
      <TouchableOpacity style={styles.button} onPress={handleReturn}>
        <Text style={styles.buttonText}>Confirm Return</Text>
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
