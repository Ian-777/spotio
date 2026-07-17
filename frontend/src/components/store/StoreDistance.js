import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { useLocation } from "../../context/LocationContext";

import {
  getDistance,
  formatDistance,
} from "../../utils/distance";

export default function StoreDistance({
  store,
}) {
  const { location } =
    useLocation();

  if (
    !location ||
    !store?.latitude ||
    !store?.longitude
  ) {
    return null;
  }

  const distance =
    getDistance(
      location.latitude,
      location.longitude,
      Number(store.latitude),
      Number(store.longitude)
    );

  const distanceText =
    formatDistance(distance);

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="location-on"
        size={18}
        color="#7C3AED"
      />

      <Text style={styles.text}>
        A {distanceText} de tu ubicación
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