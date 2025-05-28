import React from 'react';
import { TouchableOpacity, Text } from "react-native"

const CustomButtonPrimary = ({ buttonStyle, textStyle, text, handlePress,  ...props }) =>
(
    <TouchableOpacity
        {...props}
        className={`bg-secondarydark p-4 rounded-md m-4 ${buttonStyle}`}
        onPress={handlePress}>
        {text && <Text className={`text-white font-latobold ${textStyle}`}>{text}</Text>}
    </TouchableOpacity>
)

const CustomButtonSecondary = ({ buttonStyle, textStyle, text, handlePress, ...res }) =>
(
    <TouchableOpacity
        className={`bg-darkred rounded-md m-4 p-4 ${buttonStyle}`}
        onPress={handlePress}
        {...res}>
        <Text className={`text-white font-latobold ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
)

const CustomButtonLight = ({ buttonStyle, textStyle, text, handlePress, ...props }) =>
    (
        <TouchableOpacity
            style={props.style}
            className={`bg-secondarylight rounded-md items-center m-4 p-4 ${buttonStyle}`}
            onPress={handlePress}>
            <Text className={`text-secondarydark font-latobold ${textStyle}`}>{text}</Text>
        </TouchableOpacity>
    )

const CustomButtonOutlined = ({ title, onPress, containerStyle, textStyle, ...props }) => (
    <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        {...props}>
        <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
)

export { CustomButtonPrimary, CustomButtonSecondary, CustomButtonLight, CustomButtonOutlined }