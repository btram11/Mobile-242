import { addListingForBook, getBookById } from "@/services/book";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Redirect, useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Book } from "@/types/book";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Activity } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Condition =
  | "Brand New"
  | "Like New"
  | "Very Good"
  | "Good"
  | "Acceptable"
  | "Worn"
  | "Damaged"
  | "Annotated"
  | "Water Damaged"
  | "Missing Pages";

const conditions: Condition[] = [
  "Brand New",
  "Like New",
  "Very Good",
  "Good",
  "Acceptable",
  "Worn",
  "Damaged",
  "Annotated",
  "Water Damaged",
  "Missing Pages",
];

const schema = yup
  .object()
  .shape(
    {
      is_sold: yup.boolean(),
      is_leased: yup.boolean(),
      sold_price: yup.string().when("is_sold", {
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
      leased_price: yup.string().when("is_leased", {
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
      leased_period: yup.string().when("is_leased", {
        is: true,
        then: (schema) =>
          schema
            .required("Leased period is required")
            .min(1, "Must be at least 1 day")
            .test(
              "is-valid-leased_period",
              "Leased period must be a non-negative number and greater than 0",
              (value) => {
                const num = Number(value);
                return !isNaN(num) && num > 0;
              }
            ),
      }),

      condition: yup
        .string()
        .oneOf(conditions, "Invalid condition")
        .required("Condition is required"),
    },
    [["is_sold", "is_leased"]]
  )
  .test(
    "at-least-one-option",
    "At least one option (Sell or Rent) must be selected",
    (obj) => obj.is_sold || obj.is_leased
  );

export default function FillDetails() {
  const { book_id } = useLocalSearchParams();
  const {
    data: selectedBook,
    isLoading,
    isError,
  } = useQuery<Book, Error>({
    queryKey: ["book-FillDetail", book_id],
    queryFn: () => getBookById(book_id as string),
    enabled: !!book_id,
  });

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
      is_sold: false,
      is_leased: false,
      sold_price: "",
      leased_price: "",
      leased_period: "",
      condition: "Brand New",
    },
  });

  const isSold = watch("is_sold");
  const isLeased = watch("is_leased");
  const selectedCondition = watch("condition");

  const submitMutation = useMutation({
    mutationFn: (data: any) => addListingForBook(book_id as string, data),
    onSuccess: () => {
      console.log("Listing posted successfully");
      Alert.alert("Successfully add listing", "Your listing has been posted.", [
        {
          text: "OK",
          onPress: () => router.replace("/home"),
        },
      ]);
    },
    onError: (error) => {
      console.error("Error posting listing:", error);
      setError("root", { message: "Failed to post listing" });
    },
  });
  const handleAddListing = async (data: any) => {
    const provider_id = await AsyncStorage.getItem("userId");
    submitMutation.mutate({
      ...data,
      provider_id: provider_id,
      sold_price: data.sold_price ? Number(data.sold_price) : 0,
      leased_price: data.leased_price ? Number(data.leased_price) : 0,
      leased_period: data.leased_period ? Number(data.leased_period) : 0,
    });
    clearErrors("root");
  };

  if (!book_id || book_id.length === 0) {
    return <Redirect href="/(profile)/my-sales/add/select-book" />;
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !selectedBook) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>
          Book not found or an error occurred!
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(profile)/my-sales/add/select-book")}
        >
          <Text style={styles.link}>Go back to select a book</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Book Info */}
        <Text style={styles.title}>{selectedBook.title}</Text>
        <View style={styles.noImage}>
          {selectedBook.img_url ? (
            <Image
              source={{ uri: selectedBook.img_url }}
              style={styles.image}
            />
          ) : (
            <Text>No image available</Text>
          )}
        </View>
        <Text style={styles.label}>Author: {selectedBook.author}</Text>
        <Text style={styles.label}>Publisher: {selectedBook.publisher}</Text>
        <Text style={styles.label}>Year: {selectedBook.publishing_year}</Text>
        <Text style={styles.label}>Subject: {selectedBook.subject}</Text>
        {selectedBook.summary && (
          <Text style={styles.label}>Summary: {selectedBook.summary}</Text>
        )}

        {/* Form */}
        <Text style={styles.section}>Book Condition</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Controller
            control={control}
            name="condition"
            render={({ field: { onChange, value } }) => (
              <View style={styles.row}>
                {conditions.map((cond) => (
                  <TouchableOpacity
                    key={cond}
                    style={[
                      styles.conditionBtn,
                      value === cond && styles.conditionBtnSelected,
                    ]}
                    onPress={() => onChange(cond)}
                  >
                    <Text
                      style={
                        value === cond
                          ? styles.conditionTextSelected
                          : styles.conditionText
                      }
                    >
                      {cond}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </ScrollView>
        {errors?.condition && (
          <Text style={styles.error}>{errors?.condition?.message}</Text>
        )}

        {/* Sale Toggle */}
        <View style={styles.switchRow}>
          <Text>Sell this book</Text>
          <Controller
            control={control}
            name="is_sold"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                thumbColor={value ? "#008C6E" : "#f4f3f4"}
                trackColor={{ true: "rgba(0, 140, 110, 0.3)" }}
              />
            )}
          />
        </View>

        {isSold && (
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="sold_price"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Sale price (VND)"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {errors?.sold_price && (
              <Text style={styles.error}>{errors?.sold_price?.message}</Text>
            )}
          </View>
        )}

        {/* Rent Toggle */}
        <View style={styles.switchRow}>
          <Text>Rent this book</Text>
          <Controller
            control={control}
            name="is_leased"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                thumbColor={value ? "#008C6E" : "#f4f3f4"}
                trackColor={{ true: "rgba(0, 140, 110, 0.3)" }}
              />
            )}
          />
        </View>

        {isLeased && (
          <>
            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="leased_price"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Rental price (VND)"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors?.leased_price && (
                <Text style={styles.error}>
                  {errors?.leased_price?.message}
                </Text>
              )}
            </View>
            <View style={styles.inputGroup}>
              <Controller
                control={control}
                name="leased_period"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Rental period (days)"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.leased_period && (
                <Text style={styles.error}>{errors.leased_period.message}</Text>
              )}
            </View>
          </>
        )}

        {(errors as any)[""]?.message && (
          <Text style={styles.error}>{(errors as any)[""]?.message}</Text>
        )}

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(handleAddListing)}
        >
          <Text style={styles.submitBtnText}>Post Listing</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginTop: 16,
    color: "#007bff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
  image: {
    width: "auto",
    height: "100%",
    aspectRatio: 94 / 144,
    marginBottom: 16,
    borderRadius: 8,
  },
  noImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  conditionBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 5,
  },
  conditionBtnSelected: {
    backgroundColor: "#008C6E",
    borderColor: "#008C6E",
  },
  conditionText: {
    color: "#333",
  },
  conditionTextSelected: {
    color: "#fff",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  submitBtn: {
    marginTop: 24,
    backgroundColor: "#008C6E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
