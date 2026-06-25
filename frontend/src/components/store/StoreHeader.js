import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";

import GalleryCarousel from "./GalleryCarousel";

export default function StoreHeader({
  store,
  user,
}) {
  return (
    <View>
      <GalleryCarousel
        store={store}
        user={user}
      />

      <View style={styles.container}>
        <View style={styles.badgeContainer}>
          <Text
            style={[
              styles.badge,
              {
                backgroundColor:
                  store.category_name ===
                  "Comer"
                    ? "#3B82F6"
                    : "#7C3AED",
              },
            ]}
          >
            {store.category_name}
          </Text>
        </View>

        <Text style={styles.title}>
          {store.name}
        </Text>

        <View style={styles.ratingContainer}>
          <FontAwesome
            name="star"
            size={20}
            color="#FACC15"
          />

          <Text style={styles.ratingText}>
            {store.average_rating}

            {"  "}(
            {store.total_ratings}
            {" "}
            calificaciones)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor:
        "#0D0D0D",
    },

    title: {
      color: "#FFFFFF",
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 18,
    },

    badgeContainer: {
      marginBottom: 18,
    },

    badge: {
      alignSelf: "flex-start",
      color: "#FFFFFF",
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 12,
      fontSize: 13,
      fontWeight: "bold",
    },

    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    ratingText: {
      color: "#FFFFFF",
      marginLeft: 8,
      fontSize: 16,
      fontWeight: "600",
    },
  });