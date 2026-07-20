import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

const DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function StoreHours({
  store,
}) {

  if (!store?.hours?.length) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        Horarios
      </Text>

      {
        store.status && (

          <View style={styles.statusCard}>

            <MaterialIcons
              name={
                store.status.is_open
                  ? "check-circle"
                  : "schedule"
              }
              size={22}
              color={
                store.status.is_open
                  ? "#22C55E"
                  : "#F59E0B"
              }
            />

            <View style={{ marginLeft: 12 }}>

              <Text
                style={[
                  styles.statusLabel,
                  {
                    color:
                      store.status.is_open
                        ? "#22C55E"
                        : "#F59E0B",
                  },
                ]}
              >
                {store.status.label}
              </Text>

              {
                store.status.closes_in && (

                  <Text style={styles.statusText}>
                    Cierra en {store.status.closes_in}
                  </Text>

                )
              }

              {
                store.status.opens_in && (

                  <Text style={styles.statusText}>
                    Abre en {store.status.opens_in}
                  </Text>

                )
              }

            </View>

          </View>

        )
      }

      {
        store.hours.map((hour) => (

          <View
            key={hour.day_of_week}
            style={styles.row}
          >

            <Text style={styles.day}>
              {DAYS[hour.day_of_week - 1]}
            </Text>

            <Text style={styles.time}>

              {
                hour.is_closed
                  ? "Cerrado"
                  : `${hour.open_time.slice(0,5)} - ${hour.close_time.slice(0,5)}`
              }

            </Text>

          </View>

        ))
      }

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 25,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 18,
  },

  statusCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  statusLabel: {
    fontSize: 17,
    fontWeight: "700",
  },

  statusText: {
    color: "#CFCFCF",
    marginTop: 4,
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  day: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  time: {
    color: "#CFCFCF",
    fontSize: 15,
  },

});