import AsyncStorage from "@react-native-async-storage/async-storage";

export const buildHeaders = async () => {
  const accessToken = await AsyncStorage.getItem("access_token");
  const userId = await AsyncStorage.getItem("userId");
  if (!accessToken || !userId) throw new Error("User not authenticated");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    client_id: userId,
  };
};
