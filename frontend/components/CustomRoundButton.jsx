import React from 'react';
import { TouchableOpacity, Text } from "react-native"

const CustomButtonPrimary = ({ buttonStyle, textStyle, text, handlePress }) =>
(
    <TouchableOpacity
        className={`bg-secondarydark p-4 rounded-xl m-4 ${buttonStyle}`}
        onPress={handlePress}>
        <Text className={`text-white font-latobold ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
)

const CustomButtonSecondary = ({ buttonStyle, textStyle, text, handlePress }) =>
(
    <TouchableOpacity
        className={`bg-darkred rounded-3xl m-4 p-4 ${buttonStyle}`}
        onPress={handlePress}>
        <Text className={`text-white font-latobold ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
)

const CustomButtonLight = ({ buttonStyle, textStyle, text, handlePress }) =>
    (
        <TouchableOpacity
            className={`bg-secondarylight p-4 rounded-3xl m-4 ${buttonStyle}`}
            onPress={handlePress}>
            <Text className={`text-secondarydark font-latobold ${textStyle}`}>{text}</Text>
        </TouchableOpacity>
    )

const CustomButtonOnboarding = ({ buttonStyle, textStyle="", text, handlePress, ...rest }) =>
    (
        <TouchableOpacity
            {...rest}
            className={`  p-4 rounded-full ${buttonStyle} bg-secondarydark`}
            onPress={handlePress}>
            <Text className={`text-secondary font-bold ${textStyle}`}>{text}</Text>
        </TouchableOpacity>
    )

export { CustomButtonPrimary, CustomButtonSecondary, CustomButtonLight, CustomButtonOnboarding }