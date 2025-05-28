import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

export default function Animation() {
  const animationRef = useRef<LottieView>(null);

  const handleAnimationFinish = () => {
    setTimeout(() => {
      router.replace("/home");
    }, 500);
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("@/assets/animation/success.json")}
        style={styles.animation}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
      <Text style={styles.message}>Payment Successful!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 250,
    height: 250,
  },
  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#008C6E",
  },
});
