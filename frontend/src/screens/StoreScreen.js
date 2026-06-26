import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  View,
  Text,
  FlatList,
} from "react-native";

import { searchStores } from "../api/api";

import StoreCard from "../components/cards/StoreCard";

import { AuthContext } from "../context/AuthContext";

import useFavorites from "../hooks/useFavorites";

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

  const { user } =
    useContext(AuthContext);

  const [stores, setStores] =
    useState([]);

  const {
    favoriteStores,
    toggleFavorite,
  } = useFavorites(user);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores =
    async () => {
      try {
        const data =
          await searchStores({
            city_id,
            locality_id,
            neighborhood_id,
            category_id,
          });

        console.log(
          "STORES:",
          data
        );

        setStores(data);
      } catch (error) {
        console.log(
          "ERROR STORES:",
          error
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor:
          "#0D0D0D",
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
          keyExtractor={(
            item
          ) =>
            item.store_id.toString()
          }
          renderItem={({
            item,
          }) => (
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
                    store:
                      item,
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