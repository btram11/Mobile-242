//@ts-nocheck

import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import { useRef, useState, useEffect } from "react";

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
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;

  useEffect(() => {
    if (value || isFocused) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [value, isFocused]);

  const floatingLabelStyle = {
    top: floatingLabelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -24],
    }),
    fontSize: floatingLabelAnimation.interpolate({
      inputRange: [0, 2],
      outputRange: [16, 12],
    }),
  };

  return (
    <View>
      <Animated.Text
        style={[styles.labelStyle2, floatingLabelStyle]}
        className={`absolute left-6 color-[rgba(3,0,71,0.33)] font-bold w-full border-primary`}
      >
        {name}
      </Animated.Text>
      <View
        style={[
          {
            borderRadius: 999999,
            overflow: "hidden",
          },
          rest.style,
        ]}
        className={`relative ${
          isFocused
            ? "border-2  border-[rgb(176,221,201)]"
            : "border-primarydark"
        } w-full flex-row justify-stretch items-center`}
      >
        <TextInput
          style={[rest.style, { borderRadius: 9999999 }]}
          placeholder={isFocused ? placeholder : ""}
          // type={type}
          className={`text-black w-full py-4 pr-4 pl-6 ${inputStyle}`}
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
          importantForAutofill="noExcludeDescendants"
          autoCompleteType="email"
        >
          {/* ${labelColor} */}
        </TextInput>

        {!isFocused && !value && icon && (
          <View className="absolute right-0 p-4">
            <Image
              source={icon}
              style={styles.icon}
              className="w-6 h-6 text-primarydark"
            />
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
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  labelStyle2: {
    position: "absolute",
    left: 24,
  },
});
export { CustomInput, CustomInput2 };
