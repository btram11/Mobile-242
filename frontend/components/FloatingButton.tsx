import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
  GestureResponderEvent,
} from "react-native";

type FloatingButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  icon?: React.ReactNode;
  label?: string;
  style?: ViewStyle;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon,
  label,
  style,
  ...res
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style]}
    accessibilityLabel={label}
    activeOpacity={0.7}
    {...res}
  >
    {icon ? icon : <Text style={styles.plus}>+</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 15,
    right: 15,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#31CFB6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
  },
  plus: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 2,
  },
});

export default FloatingButton;
