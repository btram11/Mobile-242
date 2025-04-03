// import { useState, useEffect } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";

// type ProfileType = {
//   avatar: string | null;
//   name: string;
//   bio: string;
//   gender: string;
//   birthday: string;
//   phone: string;
//   email: string;
// };

// function EditProfile() {
//   const navigation = useNavigation();
//   const [profile, setProfile] = useState<ProfileType>({
//     avatar: null,
//     name: "John Doe",
//     bio: "Hello, I'm using this app!",
//     gender: "Male",
//     birthday: "2000-01-01",
//     phone: "1234567890",
//     email: "johndoe@example.com",
//   });

//   const [originalProfile, setOriginalProfile] = useState<ProfileType>(profile);

//   useEffect(() => {
//     navigation.addListener("beforeRemove", (e) => {
//       if (JSON.stringify(profile) !== JSON.stringify(originalProfile)) {
//         e.preventDefault();
//         Alert.alert(
//           "Unsaved Changes",
//           "You have unsaved changes. Do you want to leave?",
//           [
//             { text: "Cancel", style: "cancel", onPress: () => {} },
//             {
//               text: "Leave",
//               style: "destructive",
//               onPress: () => navigation.dispatch(e.data.action),
//             },
//           ]
//         );
//       }
//     });
//   }, [profile, navigation]);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfile((prev) => ({ ...prev, avatar: result.assets[0].uri }));
//     }
//   };

//   const saveChanges = () => {
//     setOriginalProfile(profile);
//     Alert.alert("Success", "Your profile has been updated.");
//   };

//   return (
//     <ScrollView className="p-4">
//       <View className="items-center mb-4">
//         <TouchableOpacity onPress={pickImage}>
//           <Image
//             source={
//               profile.avatar
//                 ? { uri: profile.avatar }
//                 : require("@/assets/images/avatar2.jpg")
//             }
//             className="w-24 h-24 rounded-full"
//           />
//         </TouchableOpacity>
//         <Text className="mt-2 text-gray-500">Tap to change photo</Text>
//       </View>

//       {(
//         [
//           { label: "Name", key: "name" },
//           { label: "Bio", key: "bio" },
//           { label: "Gender", key: "gender" },
//           { label: "Birthday", key: "birthday" },
//           { label: "Phone", key: "phone" },
//           { label: "Email", key: "email" },
//         ] as { label: string; key: keyof ProfileType }[]
//       ) // Cập nhật kiểu dữ liệu chính xác
//         .map(({ label, key }) => (
//           <View key={key} className="mb-3">
//             <Text className="text-gray-700 mb-1">{label}</Text>
//             <TextInput
//               value={profile[key] ?? ""}
//               onChangeText={(text) =>
//                 setProfile((prev) => ({ ...prev, [key]: text }))
//               }
//               className="border border-gray-300 rounded p-2"
//             />
//           </View>
//         ))}

//       <TouchableOpacity
//         className="bg-blue-500 p-3 rounded mt-4"
//         onPress={saveChanges}
//       >
//         <Text className="text-white text-center font-bold">Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// export default EditProfile;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://placeholder.com/150" }}
            style={styles.profileImage}
          />
          <Text style={styles.changePhotoText}>Tap to Change</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Fields */}
      <View style={styles.profileFields}>
        <ProfileField label="Username" value="" hasArrow />
        <ProfileField label="Gender" value="Set Now" hasArrow />
        <ProfileField label="Birthday" value="Set Now" hasArrow />
        <ProfileField label="Phone" value="*****gg" hasArrow />
        <ProfileField label="Email" value="n*****o@hotmail.com" hasArrow />
        <ProfileField label="Social Media Accounts" value="" hasArrow />
        <ProfileField label="Change Password" value="" hasArrow />
      </View>
    </ScrollView>
  );
};

const ProfileField = ({ label, value, hasArrow }) => (
  <TouchableOpacity style={styles.fieldContainer}>
    <View style={styles.fieldContent}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueContainer}>
        {value ? <Text style={styles.fieldValue}>{value}</Text> : null}
        {hasArrow && <Ionicons name="chevron-forward" size={20} color="#999" />}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: "#FF5722",
    fontSize: 16,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
  changePhotoText: {
    marginTop: 8,
    color: "#FF5722",
  },
  profileFields: {
    paddingHorizontal: 16,
  },
  fieldContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  fieldContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLabel: {
    fontSize: 16,
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldValue: {
    color: "#999",
    marginRight: 8,
  },
});

export default EditProfileScreen;
