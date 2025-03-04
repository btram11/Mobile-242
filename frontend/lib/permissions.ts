import { AppState, Alert, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";

export async function getCameraPermissions() {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  console.log("Camera permission", status);

  if (status !== Notifications.PermissionStatus.GRANTED) {
    const { status: newStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    return newStatus === "granted";
  }
}

export async function getNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status === Notifications.PermissionStatus.UNDETERMINED) {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    console.log("Notification permission granted");
    return newStatus === Notifications.PermissionStatus.GRANTED;
  } else {
    console.log("Notification permission denied");
    if (status === Notifications.PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "Please enable camera permissions in settings",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
    }
    return false;
  }
}

// AppState.addEventListener("change", (nextAppState) => {
//   if (nextAppState === "active") {
//     // Khi ứng dụng trở lại trạng thái foreground, kiểm tra quyền
//     checkPermissions();
//   }
// });

export default { getCameraPermissions, getNotificationPermissions };
