import React from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = "default",
  secureTextEntry = false,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7C7C7C"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        textAlignVertical={
          multiline
            ? "top"
            : "center"
        }
        style={[
          styles.input,
          multiline &&
            styles.multiline,
        ]}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },

    label: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 8,
    },

    input: {
      backgroundColor:
        "#1A1A1A",
      color: "#FFFFFF",
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 15,
      borderWidth: 1,
      borderColor: "#2B2B2B",
    },

    multiline: {
      minHeight: 120,
    },
  });