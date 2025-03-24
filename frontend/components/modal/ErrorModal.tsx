import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

export const ErrorModal: React.FC<{
  onClose: any;
  errorMessage: string;
}> = ({ onClose, errorMessage }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      className="flex justify-center items-center bg-black/50"
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={true}
      onRequestClose={() => onClose()}
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <View className="bg-white p-6 rounded-lg shadow-lg w-4/5">
              <Text className="text-lg font-bold text-red-600">Error</Text>
              <Text className="mt-2 text-gray-700">{errorMessage}</Text>
              <TouchableOpacity
                onPress={() => onClose()}
                className="mt-4 bg-red-600 px-4 py-2 rounded-lg"
              >
                <Text className="text-white text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
