import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";

import {
  useEffect,
  useRef,
} from "react";

import {
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import StoreDistance from "../store/StoreDistance";

export default function StoreCard({
  store,
  onFavorite,
  isFavorite,
  onPress,
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
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
    >
      <View style={styles.card}>
        {/* IMAGEN */}

        <Image
          source={{
            uri:
              store.images?.[0]?.image_url ||
              "https://via.placeholder.com/400x200",
          }}
          style={styles.image}
        />

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
                  store.category_name ===
                    "Comer"
                    ? "#3B82F6"
                    : "#7C3AED",
              },
            ]}
          >
            {store.category_name}
          </Text>
        </View>

        {/* ESTADO */}

        {
          store.status && (

            <View style={styles.statusContainer}>

              <MaterialIcons
                name={
                  store.status.is_open
                    ? "check-circle"
                    : "schedule"
                }
                size={16}
                color={
                  store.status.is_open
                    ? "#22C55E"
                    : "#F59E0B"
                }
              />

              <Text
                style={[
                  styles.statusText,
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
                store.status.is_open &&
                store.status.closes_in && (

                  <Text style={styles.statusExtra}>
                    {" • "}
                    Cierra en {store.status.closes_in}
                  </Text>

                )
              }


              {
                !store.status.is_open &&
                store.status.opens_in && (

                  <Text style={styles.statusExtra}>
                    {" • "}
                    Abre en {store.status.opens_in}
                  </Text>

                )
              }

            </View>

          )
        }

        {/* CALIFICACIÓN */}

        <View style={styles.ratingContainer}>
          <FontAwesome
            name="star"
            size={15}
            color="#FACC15"
          />

          <Text style={styles.ratingText}>
            {store.average_rating || "0.0"}

            {"  "}

            ({store.total_ratings || 0})
          </Text>
        </View>

        {/* DISTANCIA */}

        {store.distanceText && (
          <View style={styles.distanceContainer}>
            <MaterialIcons
              name="location-on"
              size={16}
              color="#7C3AED"
            />

            <Text style={styles.distanceText}>
              {store.distanceText}
            </Text>
          </View>
        )}

        {/* DISTANCIA */}

        <StoreDistance
          store={store}
        />

        {/* UBICACIÓN */}

        <Text style={styles.meta}>
          {store.locality_name}

          {store.neighborhood_name
            ? ` • ${store.neighborhood_name}`
            : " • Sin barrio"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 14,
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

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  ratingText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  distanceText: {
    color: "#7C3AED",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
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

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 5,
  },

  statusExtra: {
    color: "#A1A1AA",
    fontSize: 12,
    marginLeft: 4,
  },
});