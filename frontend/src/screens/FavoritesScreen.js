import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import StoreCard from "../components/StoreCard";

import { AuthContext } from "../context/AuthContext";

export default function FavoritesScreen() {
  const { user } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

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
            <StoreCard store={item} />
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