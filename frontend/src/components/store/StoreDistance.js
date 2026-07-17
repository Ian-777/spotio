import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export default function StoreDistance({
  distance,
}) {
  if (!distance) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="location-on"
        size={18}
        color="#7C3AED"
      />

      <Text style={styles.text}>
        A {distance} de tu ubicación
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
});