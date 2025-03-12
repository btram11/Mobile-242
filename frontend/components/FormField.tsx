import { TextInput, View, Text } from "react-native";
import { CustomInput, CustomInput2 } from "./CustomInput";
import { CustomButtonSecondary } from "./CustomRoundButton";

interface FormFieldProps {
  name: string;
  placeholder: string;
  value: string;
  handleTextChange: (name: string, text: string) => void;
  labelColor?: string;
  inputStyle?: string;
}
//@
function FormField({
  name,
  placeholder,
  value,
  handleTextChange,
  labelColor,
  inputStyle,
}: FormFieldProps) {
  return (
    <View className="w-5/6 justify-center items-center mb-8">
      <Text
        className={`color-primarylight font-bold mb-2 w-full ${labelColor}`}
      >
        {name}
      </Text>

      <CustomInput
        name={name}
        placeholder={placeholder}
        value={value}
        handleTextChange={handleTextChange}
        inputStyle={`w-full bg-primarylight rounded-xl ${inputStyle}`}
      ></CustomInput>
    </View>
  );
}

function FormField2({
  name,
  placeholder,
  value,
  handleTextChange,
  labelColor,
  inputStyle,
  icon = "",
}: FormFieldProps & { icon?: string }) {
  return (
    <View className="w-5/6 justify-center items-center mb-8">
      <CustomInput2
        name={name}
        placeholder={placeholder}
        value={value}
        handleTextChange={handleTextChange}
        inputStyle={`w-full bg-[rgb(176,221,201,0.4)] rounded-full ${inputStyle}`}
        icon={icon}
      ></CustomInput2>
    </View>
  );
}

export { FormField, FormField2 };
