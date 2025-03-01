import { useRef, useState } from "react";
import {
  ImageBackground,
  useWindowDimensions,
  View,
  Text,
  FlatList,
  Animated,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { CustomButtonOnboarding } from "@/components/CustomButton";
import { router } from "expo-router";
import Onboarding1 from "./onboarding";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

// const requestCameraPermission = async () => {
//   const permission =
//     Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
//   const result = await request(permission);
//   return result === RESULTS.GRANTED;
// };

// const requestNotificationPermission = async () => {
//   const { status } = await requestNotifications(["alert", "sound", "badge"]);
//   return status === "granted";
// };

const OnboardingScreens = [
  {
    id: "0",
    screen: (handleNext: () => void) => <Onboarding1 handleNext={handleNext} />,
  },
  {
    id: "1",
    image: require("@/assets/images/onboarding2.png"),
    descrip:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsum",
    title: "Overview",
  },
  {
    id: "2",
    image: require("@/assets/images/onboarding3.png"),
    descrip: "Accessing to Camera allows you to search for Books by scanning!",
    title: [
      "Can we access your ",
      <Text key="highlight" className="text-secondarydark">
        Camera
      </Text>,
      "?",
    ],
  },
  {
    id: "3",
    image: require("@/assets/images/onboarding4.png"),
    descrip:
      "We will use notification to remind you about Book passing/renting dates and expiration dates for your renting period.",
    title: [
      "Do you want to turn on ",
      <Text key="highlight" className="text-secondarydark">
        Notification
      </Text>,
      "?",
    ],
  },
];

export default function Onboarding2() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const renderItem = ({ item }: any) => {
    if (item.id == 0) return item.screen(handleNext);
    return (
      <SafeAreaView
        className="bg-[#F6F6F7] flex flex-col justify-between items-center"
        style={{ width: width, height: height - headerHeight + insets.top }}
      >
        <ImageBackground
          source={item.image}
          resizeMode="stretch"
          style={{
            flex: 1,
            width: width,
            height: height * 0.5,
            position: "absolute",
            top: 0,
          }}
        />
        <View
          className="w-full flex-1 flex flex-col-reverse"
          style={{ width: width }}
        >
          <View className="h-3/5 flex items-center px-7 pb-4 justify-between">
            <View className="bg-white h-fit w-full rounded-lg flex flex-col items-center p-7 gap-6">
              <Text className="font-bold text-3xl h-1/4 text-center min-h-fit align-middle">
                {item.title}
              </Text>
              <Text className="text-center text-[#756F6F]">{item.descrip}</Text>
              <View className="w-full flex flex-col mt-10 gap-6 items-center justify-center">
                {/* <CustomButtonOnboarding
                  text="Allow"
                  buttonStyle=" w-full items-center max-w-[300px]"
                  textStyle=""
                  handlePress={() => {}}
                /> */}
                <CustomButtonOnboarding
                  text="Next"
                  buttonStyle="bg-[#000000] w-full items-center max-w-[300px]"
                  textStyle=""
                  handlePress={handleNext}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {OnboardingScreens.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: currentIndex === index ? "#000" : "#aaa",
                    marginHorizontal: 5,
                    // borderWidth: currentIndex === index ? 2 : 0,
                    // borderColor: "blue",
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < OnboardingScreens.length - 1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(auth)/login");
    }
  };
  return (
    <SafeAreaView
      //   className="bg-[#F6F6F7] flex flex-col justify-between items-center"
      style={{ width: width, height: height - headerHeight + insets.top }}
    >
      <FlatList
        style={{ marginTop: -insets.top }}
        // scrollEnabled={false}
        ref={flatListRef}
        data={OnboardingScreens}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   { useNativeDriver: false }
        // )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      {/* {renderItem()} */}
    </SafeAreaView>
  );
}
