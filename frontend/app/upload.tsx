import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";
import ControlledDropdown from "@/components/Dropdown";

// 🎯 Autocomplete suggestion
const SUBJECT_OPTIONS = [
  "Mathematics",
  "Computer Science",
  "Literature",
  "Physics",
  "History",
  "Philosophy",
];
const CONDITION_OPTIONS = ["new", "like new", "good", "used", "worn"];
const COVER_OPTIONS = ["Hardcover", "Softcover"];

// Schema validation
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  publisher: yup.string().required("Publisher is required"),
  publishingYear: yup
    .number()
    .typeError("Publishing year must be a number")
    .required("Publishing year is required"),
  subject: yup.string().required("Subject is required"),
  summary: yup.string().required("Summary is required"),
  condition: yup.string().required("Condition is required"),
  pages: yup
    .number()
    .typeError("Pages must be a number")
    .integer("Pages must be an integer")
    .positive("Pages must be positive")
    .required("Pages is required"),
  cover_type: yup.string().required("Cover type is required"),
  forSale: yup.boolean(),
  forRent: yup.boolean(),
  salePrice: yup.string().when("forSale", {
    is: true,
    then: (schema) =>
      schema
        .required("Sale price is required")
        .test(
          "is-valid-price",
          "Sale price must be a non-negative number",
          (value) => {
            const num = Number(value);
            return !isNaN(num) && num >= 0;
          }
        ),
  }),
  rentPrice: yup.string().when("forRent", {
    is: true,
    then: (schema) =>
      schema
        .required("Rent price is required")
        .test(
          "is-valid-rent",
          "Rent price must be a non-negative number",
          (value) => {
            const num = Number(value);
            return !isNaN(num) && num >= 0;
          }
        ),
  }),
  image: yup.mixed().required("Book cover image is required"),
});

export default function UploadBook() {
  const [image, setImage] = React.useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      author: "",
      publisher: "",
      publishingYear: "",
      subject: "",
      summary: "",
      condition: "",
      pages: "",
      cover_type: "",
      forRent: false,
      forSale: false,
      salePrice: "",
      rentPrice: "",
      image: undefined,
    },
  });
  const forRent = watch("forRent");
  const forSale = watch("forSale");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [151, 235],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue("image", result.assets[0].uri);
      clearErrors("image");
    }
  };

  const onSubmit = (data) => {
    if (!image) {
      setError("image", {
        type: "manual",
        message: "Book cover image is required",
      });
      return;
    }
    clearErrors("image");
    console.log({ ...data, forSale, forRent, image });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Title, Author, Publisher, Publishing year */}
      {[
        { label: "Title", name: "title" },
        { label: "Author", name: "author" },
        { label: "Publisher", name: "publisher" },
        {
          label: "Publishing year",
          name: "publishingYear",
          keyboardType: "numeric",
        },
      ].map(({ label, name, ...rest }) => (
        <View key={name} style={styles.inputContainer}>
          <Text>{label}</Text>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                {...rest}
              />
            )}
          />
          {errors[name] && (
            <Text
              style={{ color: "red", position: "absolute", bottom: -20 }}
              className="text-sm"
            >
              {errors[name]?.message}
            </Text>
          )}
        </View>
      ))}

      <ControlledDropdown
        label="Subject"
        control={control}
        name="subject"
        errors={errors}
        listItem={SUBJECT_OPTIONS}
      />

      {/* Summary */}
      <View style={styles.inputContainer}>
        <Text>Summary</Text>
        <Controller
          control={control}
          name="summary"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { minHeight: 80 }]}
              value={value}
              onChangeText={onChange}
              placeholder="Short description..."
              multiline
            />
          )}
        />
        {errors.summary && (
          <Text
            style={{ color: "red", position: "absolute", bottom: -20 }}
            className="text-sm"
          >
            {errors.summary.message}
          </Text>
        )}
      </View>

      <ControlledDropdown
        label="Condition"
        control={control}
        name="condition"
        errors={errors}
        listItem={CONDITION_OPTIONS}
      />

      <ControlledDropdown
        label="Cover Type"
        control={control}
        name="cover_type"
        errors={errors}
        listItem={COVER_OPTIONS}
      />

      {/* Image upload */}
      <Text>Book Cover Image *</Text>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {image ? "Change Image" : "Select Image"}
        </Text>
      </TouchableOpacity>
      {errors.image && (
        <Text style={{ color: "red" }}>{errors.image.message}</Text>
      )}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            marginTop: 10,
            borderRadius: 6,
            aspectRatio: 151 / 235,
          }}
          resizeMode="cover"
        />
      )}

      {/* Sale */}
      <View style={styles.switchRow}>
        <Text>For Sale</Text>
        <Controller
          control={control}
          name="forSale"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      {forSale && (
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="salePrice"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Sale price"
                keyboardType="numeric"
              />
            )}
          />
          {errors.salePrice && (
            <Text
              style={{ color: "red", position: "absolute", bottom: -20 }}
              className="text-sm"
            >
              {errors.salePrice.message}
            </Text>
          )}
        </View>
      )}

      {/* Rent */}
      <View style={styles.switchRow}>
        <Text>For Rent</Text>
        <Controller
          control={control}
          name="forRent"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
      {forRent && (
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="rentPrice"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Rent price"
                keyboardType="numeric"
              />
            )}
          />
          {errors.rentPrice && (
            <Text
              style={{ color: "red", position: "absolute", bottom: -20 }}
              className="text-sm"
            >
              {errors.rentPrice.message}
            </Text>
          )}
        </View>
      )}

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Upload Book</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    // marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#31CFB6",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  imageButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 5,
  },
});
