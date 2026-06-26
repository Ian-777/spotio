import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

export default function StoreInfo({
  store,
}) {
  const rows = [
    {
      icon: "location-on",
      title: "Dirección",
      value: store.address,
    },
    {
      icon: "location-city",
      title: "Ciudad",
      value: store.city_name,
    },
    {
      icon: "map",
      title: "Localidad",
      value: store.locality_name,
    },
    {
      icon: "place",
      title: "Barrio",
      value:
        store.neighborhood_name ||
        "No especificado",
    },
    {
      icon: "description",
      title: "Descripción",
      value:
        store.description ||
        "Este establecimiento aún no tiene descripción.",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Información
      </Text>

      {rows.map((item, index) => (
        <View
          key={index}
          style={styles.card}
        >
          <View style={styles.header}>
            <MaterialIcons
              name={item.icon}
              size={22}
              color="#8B5CF6"
            />

            <Text
              style={styles.title}
            >
              {item.title}
            </Text>
          </View>

          <Text style={styles.value}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginBottom: 25,
    },

    sectionTitle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 18,
    },

    card: {
      backgroundColor: "#1A1A1A",
      borderRadius: 16,
      padding: 18,
      marginBottom: 14,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 10,
    },

    value: {
      color: "#CFCFCF",
      fontSize: 15,
      lineHeight: 22,
      marginLeft: 32,
    },
  });