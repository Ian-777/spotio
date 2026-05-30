import {
  useState,
  useContext,
  useCallback,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import StoreCard from "../components/StoreCard";

import { AuthContext } from "../context/AuthContext";

export default function FavoritesScreen() {
  const { user } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.12:3000/api/favorites/${user.user_id}`
      );

      const data = await response.json();

      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (
    store_id,
    isFavorite
  ) => {
    try {
      if (isFavorite) {
        const response = await fetch(
          `http://192.168.1.12:3000/api/favorites/${user.user_id}/${store_id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          return Alert.alert(
            "Error",
            "No se pudo eliminar favorito"
          );
        }

        setFavorites((prev) =>
          prev.map((item) =>
            item.store_id === store_id
              ? {
                  ...item,
                  isFavorite: false,
                }
              : item
          )
        );
      } else {
        const response = await fetch(
          "http://192.168.1.12:3000/api/favorites",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              user_id: user.user_id,
              store_id,
            }),
          }
        );

        if (!response.ok) {
          return Alert.alert(
            "Error",
            "No se pudo agregar favorito"
          );
        }

        setFavorites((prev) =>
          prev.map((item) =>
            item.store_id === store_id
              ? {
                  ...item,
                  isFavorite: true,
                }
              : item
          )
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar al servidor"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mis favoritos ❤️
      </Text>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>
          No tienes favoritos
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) =>
            item.favorite_id.toString()
          }
          renderItem={({ item }) => (
            <StoreCard
              store={item}
              isFavorite={
                item.isFavorite !== false
              }
              onFavorite={() =>
                toggleFavorite(
                  item.store_id,
                  item.isFavorite !== false
                )
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  empty: {
    color: "#A1A1AA",
  },
});