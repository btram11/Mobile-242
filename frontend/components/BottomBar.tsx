import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function ConfirmCancelBar({ handleConfirm, handleCancel }) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 80,
    backgroundColor: "#ebf5f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#d0e8e6",
    gap: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#f8d7da",
    borderRadius: 8,
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#31CFB6",
    borderRadius: 8,
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  cancelText: {
    color: "#a94442",
    fontWeight: "bold",
  },
  confirmText: {
    color: "white",
    fontWeight: "bold",
  },
});
