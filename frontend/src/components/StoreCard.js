import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import {
  useEffect,
  useRef,
} from "react";

import {
  MaterialIcons,
} from "@expo/vector-icons";

export default function StoreCard({
  store,
  onFavorite,
  isFavorite,
}) {
  const scaleAnim = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    let animation;

    if (isFavorite) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.25,
            duration: 700,
            useNativeDriver: true,
          }),

          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();
    } else {
      scaleAnim.setValue(1);
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isFavorite]);

  return (
    <View style={styles.card}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>
          {store.name}
        </Text>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavorite}
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: scaleAnim,
                },
              ],
            }}
          >
            <MaterialIcons
              name={
                isFavorite
                  ? "favorite"
                  : "favorite-border"
              }
              size={28}
              color={
                isFavorite
                  ? "#7C3AED"
                  : "#6B7280"
              }
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* DIRECCIÓN */}

      <Text style={styles.address}>
        {store.address}
      </Text>

      {/* CATEGORÍA */}

      <View style={styles.row}>
        <Text
          style={[
            styles.badge,
            {
              backgroundColor:
                store.category_name === "Comer"
                  ? "#3B82F6"
                  : "#7C3AED",
            },
          ]}
        >
          {store.category_name}
        </Text>
      </View>

      {/* UBICACIÓN */}

      <Text style={styles.meta}>
        {store.locality_name}

        {store.neighborhood_name
          ? ` • ${store.neighborhood_name}`
          : " • Sin barrio"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },

  favoriteButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },

  address: {
    color: "#A1A1AA",
    fontSize: 13,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
  },

  badge: {
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
  },

  meta: {
    color: "#A1A1AA",
    fontSize: 12,
  },
});