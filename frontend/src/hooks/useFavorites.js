import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
} from "react-native";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";

export default function useFavorites(
  user
) {
  const [
    favoriteStores,
    setFavoriteStores,
  ] = useState([]);

  useEffect(() => {
    if (!user?.user_id) {
      return;
    }

    loadFavorites();
  }, [user]);

  const loadFavorites =
    async () => {
      try {
        const data =
          await getFavorites(
            user.user_id
          );

        const favoriteIds =
          data.map(
            (item) =>
              item.store_id
          );

        setFavoriteStores(
          favoriteIds
        );
      } catch (error) {
        console.log(error);
      }
    };

  const toggleFavorite =
    async (store_id) => {
      try {
        const isFavorite =
          favoriteStores.includes(
            store_id
          );

        if (isFavorite) {
          await removeFavorite(
            user.user_id,
            store_id
          );

          setFavoriteStores(
            (prev) =>
              prev.filter(
                (id) =>
                  id !== store_id
              )
          );
        } else {
          await addFavorite(
            user.user_id,
            store_id
          );

          setFavoriteStores(
            (prev) => [
              ...prev,
              store_id,
            ]
          );
        }
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return {
    favoriteStores,
    toggleFavorite,
    reloadFavorites:
      loadFavorites,
  };
}