import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Dropdown,
} from "react-native-element-dropdown";

export default function SelectField({
  label,
  data,
  value,
  onChange,
  labelField = "name",
  valueField = "id",
  placeholder = "Seleccionar",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={
          styles.placeholder
        }
        selectedTextStyle={
          styles.selectedText
        }
        itemTextStyle={
          styles.itemText
        }
        containerStyle={
          styles.menu
        }
        activeColor="#2A2A2A"
        data={data}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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

    dropdown: {
      backgroundColor:
        "#1A1A1A",
      borderRadius: 14,
      paddingHorizontal: 16,
      height: 56,
      borderWidth: 1,
      borderColor: "#2B2B2B",
    },

    placeholder: {
      color: "#7C7C7C",
      fontSize: 15,
    },

    selectedText: {
      color: "#FFFFFF",
      fontSize: 15,
    },

    itemText: {
      color: "#FFFFFF",
      fontSize: 15,
    },

    menu: {
      backgroundColor:
        "#1A1A1A",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#2B2B2B",
    },
  });