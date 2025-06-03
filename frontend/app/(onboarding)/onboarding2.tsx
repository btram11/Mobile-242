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
import { CustomButtonOnboarding } from "@/components/CustomRoundButton";
import { router } from "expo-router";
import Onboarding1 from "./onboarding";
import Permissions from "@/lib/permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const scrollX = new Animated.Value(0);

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
    permission: (handleNext: () => void) => (
      <CustomButtonOnboarding
        text="Enable"
        buttonStyle="w-full items-center max-w-[300px]"
        textStyle=""
        handlePress={async () => {
          const granted = await Permissions.getCameraPermissions();
          if (granted) handleNext();
        }}
      />
    ),
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
    permission: (handleNext: () => void) => (
      <CustomButtonOnboarding
        text="Enable"
        buttonStyle="w-full items-center max-w-[300px]"
        textStyle=""
        handlePress={async () => {
          const granted = await Permissions.getNotificationPermissions();
          if (granted) handleNext();
        }}
      />
    ),
  },
];

export default function Onboarding2() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }: any) => {
    if (item.id == 0) return item.screen(handleNext);
    return (
      <View className="bg-[#F6F6F7] flex flex-col justify-between items-center">
        <CustomButtonOnboarding
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            zIndex: 99999,
          }}
          text="Skip"
          buttonStyle="items-center max-w-[100px] absolute right-0 top-16"
          textStyle="text-xs"
          handlePress={handleSkip}
        />
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
        ></ImageBackground>
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
                {item.permission && item.permission(handleNext)}

                <CustomButtonOnboarding
                  style={{ backgroundColor: "#000000" }}
                  text="Next"
                  buttonStyle="bg-black w-full items-center max-w-[300px]"
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
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < OnboardingScreens.length - 1 && flatListRef.current) {
      const nextIndex = currentIndex + 1;
      flatListRef.current.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      AsyncStorage.setItem("ONBOARDED", "true");
      router.replace("/(auth)/login");
    }
  };

  const handleSkip = () => {
    new Promise((resolve) => {
      flatListRef.current?.scrollToOffset({
        offset: width * (OnboardingScreens.length - 1),
        animated: true,
      });
      setTimeout(resolve, 300);
    }).then(() => {
      AsyncStorage.setItem("ONBOARDED", "true");
      router.replace("/(auth)/login");
    });
  };
  return (
    <View>
      <FlatList
        scrollEnabled={true}
        ref={flatListRef}
        data={OnboardingScreens}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      {/* {renderItem()} */}
    </View>
  );
}
