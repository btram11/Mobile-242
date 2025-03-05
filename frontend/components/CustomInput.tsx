//@ts-nocheck

import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
} from "react-native";
import { useRef, useState } from "react";

import { eye, eyeHide, search } from "../constants/icons";

const CustomInput = ({
  name,
  value,
  placeholder,
  handleTextChange,
  inputStyle = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className={`border-2 rounded-xl ${
        isFocused ? "border-primarydark" : "border-primary"
      } w-full flex-row justify-stretch items-center`}
    >
      <TextInput
        placeholder={placeholder}
        // type={type}
        className={`text-primarydark w-full p-4 ${inputStyle}`}
        onChangeText={handleTextChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        secureTextEntry={name === "Password" && !showPassword}
      ></TextInput>

      {name === "Password" && (
        <View className="absolute right-0 p-4">
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
            <Image
              source={showPassword ? eye : eyeHide}
              className="w-6 h-6 text-primarydark"
            />
          </TouchableOpacity>
        </View>
      )}

      {name === "Search" && (
        <View className="absolute right-0 p-4">
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
            <Image source={search} className="w-6 h-6 text-primarydark" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const CustomInput2 = ({
  name,
  value,
  placeholder,
  handleTextChange,
  inputStyle = "",
  icon = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;

  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 0],
      outputRange: [12, -24],
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 2],
      outputRange: [16, 12],
    }),
  };

  return (
    <View
      className={` rounded-full relative ${
        isFocused ? "border-2 border-primarydark" : "border-primary"
      } w-full flex-row justify-stretch items-center`}
    >
      <Animated.Text
        className={`absolute left-6 color-[rgba(3,0,71,0.33)] font-bold w-full border-primary`}
        style={floatingLabelStyle}
      >
        {name}
      </Animated.Text>
      <TextInput
        placeholder={isFocused ? placeholder : ""}
        // type={type}
        className={`text-black w-full py-4 pr-4 pl-6 placeholder:text-[rgba(3,0,71,0.5)] ${inputStyle}`}
        onChangeText={handleTextChange}
        onFocus={() => {
          setIsFocused(true);
          Animated.timing(floatingLabelAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }}
        onBlur={() => {
          setIsFocused(false);
          if (!value) {
            Animated.timing(floatingLabelAnimation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
        }}
        secureTextEntry={name === "Password" && !showPassword}
        value={value}
      >
        {/* ${labelColor} */}
      </TextInput>

      {!isFocused && !value && icon && (
        <View className="absolute right-0 p-4">
          <Image source={icon} className="w-6 h-6 text-primarydark" />
        </View>
      )}

      {name === "Password" && (isFocused || value) && (
        <View className="absolute right-0 p-4">
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
            <Image
              source={showPassword ? eye : eyeHide}
              className="w-6 h-6 text-primarydark"
            />
          </TouchableOpacity>
        </View>
      )}

      {name === "Search" && (
        <View className="absolute right-0 p-4">
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Text className="text-primarydark">{showPassword ? 'Hide' : 'Show'}</Text> */}
            <Image source={search} className="w-6 h-6 text-primarydark" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export { CustomInput, CustomInput2 };
