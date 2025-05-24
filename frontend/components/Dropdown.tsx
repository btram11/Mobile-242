import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Controller, Control, FieldErrors } from "react-hook-form";

type ControlledDropdownProps = {
  control: Control<any>;
  name: string;
  listItem: string[];
  placeholder?: string;
  errors?: FieldErrors;
  label?: string;
};

export const ControlledDropdown: React.FC<ControlledDropdownProps> = ({
  control,
  name,
  listItem,
  placeholder = "Select an option",
  errors,
  label = "Select",
}) => {
  return (
    <View style={{ marginBottom: 25, flexDirection: "column", gap: 5 }}>
      <Text>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              mode="dropdown"
              style={{ height: 50, width: "100%" }}
            >
              <Picker.Item
                label={placeholder}
                value=""
                style={{ fontSize: 14 }}
              />
              {listItem.map((item) => (
                <Picker.Item
                  key={item}
                  label={item}
                  value={item}
                  style={{ fontSize: 14 }}
                />
              ))}
            </Picker>
          </View>
        )}
      />
      {errors?.[name] && (
        <Text style={styles.error}>{errors[name]?.message as string}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  error: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    bottom: -20,
  },
});

export default ControlledDropdown;
