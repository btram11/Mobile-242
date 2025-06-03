import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

type InfoItemProps = {
  content: string;
  type?: "payment" | "address" | string;
  contentStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const InfoItem = ({
  content,
  type = "default",
  contentStyle,
  containerStyle,
}: InfoItemProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, contentStyle]}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#00664f",
    marginBottom: 16,
  },
  text: {
    color: "#444",
    lineHeight: 20,
  },
});

export default InfoItem;
