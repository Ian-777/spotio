import { useEffect, useState, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { getCities } from "../api/api";

import { AuthContext } from "../context/AuthContext";

export default function CityScreen({ navigation }) {
  const [cities, setCities] = useState([]);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    const data = await getCities();

    setCities(data);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Selecciona una ciudad
        </Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() =>
              navigation.navigate("Favorites")
            }
          >
            <Text style={styles.favoriteText}>
              ❤️
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutText}>
              Salir
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTA */}

      <FlatList
        data={cities}
        keyExtractor={(item) =>
          item.city_id.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Localities", {
                city_id: item.city_id,
              })
            }
            style={styles.card}
          >
            <Text style={styles.cardText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0D0D0D",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  favoriteButton: {
    backgroundColor: "#1E1E1E",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  favoriteText: {
    fontSize: 18,
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  card: {
    padding: 15,
    backgroundColor: "#1E1E1E",
    marginBottom: 12,
    borderRadius: 12,
  },

  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});