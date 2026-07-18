import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import useStoreDistance from "../../hooks/useStoreDistance";

export default function StoreDistance({
  store,
}) {
  const info =
    useStoreDistance(store);

  if (!info) {
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
        A {info.distanceText} de tu ubicación
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 6,
  },
});