import React from 'react';
import { TouchableOpacity, Text } from "react-native"

const CustomButtonPrimary = ({ buttonStyle, textStyle, text, handlePress }) =>
(
    <TouchableOpacity
        className={`bg-secondarydark p-4 rounded-md m-4 ${buttonStyle}`}
        onPress={handlePress}>
        <Text className={`text-white font-latobold ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
)

const CustomButtonSecondary = ({ buttonStyle, textStyle, text, handlePress }) =>
(
    <TouchableOpacity
        className={`bg-darkred rounded-md m-4 p-4 ${buttonStyle}`}
        onPress={handlePress}>
        <Text className={`text-white font-latobold ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
)

const CustomButtonLight = ({ buttonStyle, textStyle, text, handlePress }) =>
    (
        <TouchableOpacity
            className={`bg-secondarylight rounded-md m-4 items-center p-4 ${buttonStyle}`}
            onPress={handlePress}>
            <Text className={`text-secondarydark font-latobold ${textStyle}`}>{text}</Text>
        </TouchableOpacity>
    )

export { CustomButtonPrimary, CustomButtonSecondary, CustomButtonLight }