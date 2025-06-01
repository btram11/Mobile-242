//@ts-nocheck
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

const presetColors = {
  orange: { bg: ["#FF7A4D", "#DD3A03"], decor: "#8F2501" },
  default: { bg: ["#2BBA90", "#135441"], decor: "#005B46" },
  red: { bg: ["#E87272", "#C81A1A"], decor: "#930202" },
  blue: { bg: ["#4997FD", "#0A59BF"], decor: "#013578" },
  yellow: { bg: ["#FFEE6E", "#C59E00"], decor: "#9D7901" },
  purple: { bg: ["#8F98FF", "#2430C3"], decor: "#182A88" },
} as const;

type PresetColorKey = keyof typeof presetColors;

export function SubjectCard({
  color,
  subject,
  textColor = "#fff",
  decorColor = "#2BBA90",
}: {
  color?: PresetColorKey | string[];
  subject: string;
  textColor?: string;
  decorColor?: string;
}) {
  if (Array.isArray(color)) {
    finalColor = { bg: color, decor: decorColor };
  } else if (typeof color === "string") {
    finalColor = presetColors[color] || presetColors["default"];
  } else {
    finalColor = presetColors["default"];
  }
  const [isWrapped, setIsWrapped] = useState(false);

  return (
    <LinearGradient
      colors={finalColor?.bg}
      start={{ x: 0, y: 0 }} // 0%
      end={{ x: 0, y: 1 }}
      style={[styles.majorItem]}
    >
      <View
        style={{
          zIndex: 1,
          flex: 1,
          flexDirection: "col",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={[
            styles.majorText,
            { color: textColor },
            !isWrapped && { marginBottom: 8 },
          ]}
          onTextLayout={(e) => {
            if (e.nativeEvent.lines.length > 1) {
              setIsWrapped(true);
            } else {
              setIsWrapped(false);
            }
          }}
        >
          {subject}
        </Text>
      </View>

      <TopRightDecor color={finalColor?.decor} />
    </LinearGradient>
  );
}

function TopRightDecor({ color }) {
  return (
    <>
      <Svg
        style={{
          position: "absolute",
          aspectRatio: 169 / 166,
          zIndex: 0,
          overflow: "hidden",
          position: "absolute",
          top: -112,
          right: -75,
        }}
        width={169}
        height={166}
        viewBox="0 0 169 166"
        fill="none"
        className="absolute -top-28 -right-[75px] overflow-clip"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M79.346 1.36c17.35-5.1 36.043 5.009 50.468 15.933 14.25 10.79 22.317 27.112 28.535 43.893 6.472 17.466 15.314 36.963 7.73 53.973-7.482 16.781-29.089 20.158-44.919 29.437-13.849 8.118-25.771 21.301-41.814 21.403-16.079.103-31.506-8.833-42.202-20.867-9.593-10.794-6.566-27.206-12.309-40.466C18.111 89.141-4.675 77.344.858 61.353c5.571-16.099 32.231-9.27 45.75-19.603C60.715 30.968 62.322 6.364 79.346 1.36z"
          fill={color || "#2BBA90"}
        />
      </Svg>
      <Text className="text-lg font-bold text-white absolute right-5 top-2.5">
        :
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  majorItem: {
    width: 148,
    height: 119,
    overflow: "hidden",
    padding: 15,
    // backgroundColor: "#ddd",
    // marginRight: 10,
    borderRadius: 16,
    alignItems: "left",
    justifyContent: "end",
  },
  majorText: {
    fontSize: 14,
    fontWeight: "500",
    flexWrap: "wrap",
  },
});
