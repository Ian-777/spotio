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

import {
  useFocusEffect,
} from "@react-navigation/native";

import StoreCard from "../components/cards/StoreCard";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";

export default function FavoritesScreen() {
  const { user } =
    useContext(AuthContext);

  const [favorites, setFavorites] =
    useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites =
    async () => {
      try {
        const data =
          await getFavorites(
            user.user_id
          );

        const favoritesWithState =
          data.map((item) => ({
            ...item,
            isFavorite: true,
          }));

        setFavorites(
          favoritesWithState
        );

      } catch (error) {
        console.log(error);
      }
    };

  const toggleFavorite =
    async (
      store_id,
      isFavorite
    ) => {
      try {
        if (isFavorite) {
          await removeFavorite(
            user.user_id,
            store_id
          );

          setFavorites((prev) =>
            prev.filter(
              (item) =>
                item.store_id !==
                store_id
            )
          );

        } else {
          await addFavorite(
            user.user_id,
            store_id
          );

          await loadFavorites();
        }

      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          error.message
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
                item.isFavorite
              }
              onFavorite={() =>
                toggleFavorite(
                  item.store_id,
                  item.isFavorite
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
    textAlign: "center",
    marginTop: 40,
  },
}); 