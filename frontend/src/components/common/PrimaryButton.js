import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled &&
          styles.disabled,
      ]}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    button: {
      backgroundColor:
        "#7C3AED",
      height: 56,
      borderRadius: 14,
      justifyContent:
        "center",
      alignItems: "center",
      marginTop: 10,
    },

    disabled: {
      opacity: 0.5,
    },

    text: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 16,
    },
  });