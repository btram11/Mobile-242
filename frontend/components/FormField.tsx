import { TextInput, View, Text } from 'react-native'
import { CustomInput } from './CustomInput'
import { CustomButtonSecondary } from './CustomButton'


interface FormFieldProps {
    name: string,
    placeholder: string,
    value: string,
    handleTextChange: (name: string, text: string) => void,
    labelColor: string,
    inputStyle: string
}
//@
function FormField({ name, placeholder, value, handleTextChange, labelColor, inputStyle }: FormFieldProps) {
    return (
        <View className='w-5/6 justify-center items-center mb-8'>
            <Text className={`color-primarylight font-bold mb-2 w-full ${labelColor}`}>
                {name}
            </Text>

            <CustomInput
                name={name}
                placeholder={placeholder}
                value={value}
                handleTextChange={handleTextChange}
                inputStyle={`w-full bg-primarylight rounded-xl ${inputStyle}`}
            >
            </CustomInput>
        </View>

    )
}

export { FormField }