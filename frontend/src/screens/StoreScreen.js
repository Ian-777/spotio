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
import { useLocation } from "../context/LocationContext";

import useFavorites from "../hooks/useFavorites";

import {
  getDistance,
  formatDistance,
} from "../utils/distance";

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

  const {
    location,
    permissionGranted,
  } = useLocation();

  const [stores, setStores] =
    useState([]);

  const {
    favoriteStores,
    toggleFavorite,
  } = useFavorites(user);

  useEffect(() => {
    console.log(
      "LOCATION:",
      location
    );

    console.log(
      "PERMISSION:",
      permissionGranted
    );

    loadStores();
  }, [location]);

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

        let storesWithDistance =
          data;

        if (location) {
          storesWithDistance =
            data.map((store) => {
              if (
                !store.latitude ||
                !store.longitude
              ) {
                return store;
              }

              const distance =
                getDistance(
                  location.latitude,
                  location.longitude,
                  Number(
                    store.latitude
                  ),
                  Number(
                    store.longitude
                  )
                );

              return {
                ...store,
                distance,
                distanceText:
                  formatDistance(
                    distance
                  ),
              };
            });

          storesWithDistance.sort(
            (a, b) =>
              (a.distance ??
                Number.MAX_VALUE) -
              (b.distance ??
                Number.MAX_VALUE)
          );
        }

        console.log(
          "STORES:",
          storesWithDistance
        );

        setStores(
          storesWithDistance
        );
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