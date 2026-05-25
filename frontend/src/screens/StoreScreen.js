import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";

import { searchStores } from "../api/api";

import StoreCard from "../components/StoreCard";

import { AuthContext } from "../context/AuthContext";

export default function StoreScreen({
  route,
  navigation,
}) {
  const {
    city_id,
    locality_id,
    neighborhood_id,
    category_id,
  } = route.params;

  const { user } = useContext(AuthContext);

  const [stores, setStores] = useState([]);

  const [favoriteStores, setFavoriteStores] =
    useState([]);

  useEffect(() => {
    loadStores();

    loadFavorites();
  }, []);

  const loadStores = async () => {
    const data = await searchStores({
      city_id,
      locality_id,
      neighborhood_id,
      category_id,
    });

    setStores(data);
  };

  const loadFavorites = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.12:3000/api/favorites/${user.user_id}`
      );

      const data = await response.json();

      const favoriteIds = data.map(
        (item) => item.store_id
      );

      setFavoriteStores(favoriteIds);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (
    store_id
  ) => {
    try {
      const isFavorite =
        favoriteStores.includes(store_id);

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

        setFavoriteStores((prev) =>
          prev.filter(
            (id) => id !== store_id
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

        const data =
          await response.json();

        if (!response.ok) {
          return Alert.alert(
            "Error",
            data.message
          );
        }

        setFavoriteStores((prev) => [
          ...prev,
          store_id,
        ]);
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
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#0D0D0D",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          color: "#FFFFFF",
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        Resultados
      </Text>

      {stores.length === 0 ? (
        <Text
          style={{
            color: "#A1A1AA",
          }}
        >
          No hay resultados
        </Text>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(item) =>
            item.store_id.toString()
          }
          renderItem={({ item }) => (
            <StoreCard
              store={item}
              isFavorite={favoriteStores.includes(
                item.store_id
              )}
              onFavorite={() =>
                toggleFavorite(
                  item.store_id
                )
              }
              onPress={() =>
                navigation.navigate(
                  "StoreDetails",
                  {
                    store: item,
                  }
                )
              }
            />
          )}
        />
      )}
    </View>
  );
}