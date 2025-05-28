import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { AlarmClock, BadgeDollarSign, Book } from "lucide-react-native";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "🎉 New Book Added",
      message: "Check out the latest books in our collection!",
      icon: <Book size={22} color="#4A90E2" />,
      read: false,
    },
    {
      id: "2",
      title: "⏰ Rental Reminder",
      message:
        "Your rental period ends tomorrow. Please return the book on time.",
      icon: <AlarmClock size={22} color="#F5A623" />,
      read: false,
    },
    {
      id: "3",
      title: "🔥 Special Offer",
      message: "Get 20% off on your next rental. Limited time offer!",
      icon: <BadgeDollarSign size={22} color="#7ED321" />,
      read: true,
    },
  ]);

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id && !n.read ? { ...n, read: true } : n))
    );
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        item.read ? styles.readNotification : styles.unreadNotification,
      ]}
      onPress={() => toggleReadStatus(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>{item.icon}</View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, item.read && styles.readText]}>
          {item.title}
        </Text>
        <Text style={[styles.message, item.read && styles.readText]}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf0",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: "#444",
  },
  unreadNotification: {
    backgroundColor: "rgba(180, 253, 250, 0.2)",
  },
  readNotification: {
    backgroundColor: "#FFFFFF",
  },
  readText: {
    color: "#9e9e9e",
  },
});
