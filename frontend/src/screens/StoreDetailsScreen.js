import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";

import {
  useContext,
  useState,
} from "react";

import { AuthContext } from "../context/AuthContext";

export default function StoreDetailsScreen({
  route,
}) {
  const { store } = route.params;

  const { user } =
    useContext(AuthContext);

  const [userRating, setUserRating] =
    useState(null);

  const [averageRating, setAverageRating] =
    useState(
      Number(store.average_rating || 0)
    );

  const [totalRatings, setTotalRatings] =
    useState(
      Number(store.total_ratings || 0)
    );

  const submitRating = async (
    rating
  ) => {
    try {
      const previousRating =
        userRating;

      setUserRating(rating);

      const response = await fetch(
        "http://192.168.1.12:3000/api/ratings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            user_id: user.user_id,
            store_id: store.store_id,
            rating,
          }),
        }
      );

      if (!response.ok) {
        return Alert.alert(
          "Error",
          "No se pudo guardar rating"
        );
      }

      /* NUEVO USUARIO */

      if (previousRating === null) {
        const newAverage =
          (
            averageRating *
              totalRatings +
            rating
          ) /
          (totalRatings + 1);

        setAverageRating(newAverage);

        setTotalRatings(
          totalRatings + 1
        );
      }

      /* ACTUALIZAR RATING */

      else {
        const newAverage =
          (
            averageRating *
              totalRatings -
            previousRating +
            rating
          ) / totalRatings;

        setAverageRating(newAverage);
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* IMAGEN */}

      <Image
        source={{
          uri:
            store.image_url ||
            "https://via.placeholder.com/500x300",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        {/* NOMBRE */}

        <Text style={styles.title}>
          {store.name}
        </Text>

        {/* CATEGORÍA */}

        <View style={styles.badgeContainer}>
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

        {/* RATING */}

        <View style={styles.ratingContainer}>
          <FontAwesome
            name="star"
            size={20}
            color="#FACC15"
          />

          <Text style={styles.ratingText}>
            {averageRating.toFixed(1)}

            {"  "}

            (
            {totalRatings}
            {" "}
            calificaciones)
          </Text>
        </View>

        {/* CALIFICAR */}

        <View style={styles.rateContainer}>
          <Text style={styles.rateTitle}>
            Califica este lugar
          </Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() =>
                    submitRating(star)
                  }
                >
                  <FontAwesome
                    name={
                      star <= userRating
                        ? "star"
                        : "star-o"
                    }
                    size={34}
                    color="#FACC15"
                    style={styles.star}
                  />
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* DIRECCIÓN */}

        <View style={styles.section}>
          <Text style={styles.label}>
            Dirección
          </Text>

          <Text style={styles.text}>
            {store.address}
          </Text>
        </View>

        {/* LOCALIDAD */}

        <View style={styles.section}>
          <Text style={styles.label}>
            Localidad
          </Text>

          <Text style={styles.text}>
            {store.locality_name}
          </Text>
        </View>

        {/* BARRIO */}

        <View style={styles.section}>
          <Text style={styles.label}>
            Barrio
          </Text>

          <Text style={styles.text}>
            {store.neighborhood_name ||
              "Sin barrio"}
          </Text>
        </View>

        {/* DESCRIPCIÓN */}

        <View style={styles.section}>
          <Text style={styles.label}>
            Descripción
          </Text>

          <Text style={styles.description}>
            {store.description ||
              "Este establecimiento aún no tiene descripción."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  image: {
    width: "100%",
    height: 260,
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 18,
  },

  badgeContainer: {
    marginBottom: 18,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  ratingText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  rateContainer: {
    marginBottom: 30,
  },

  rateTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  starsRow: {
    flexDirection: "row",
  },

  star: {
    marginRight: 10,
  },

  badge: {
    alignSelf: "flex-start",
    color: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 22,
  },

  label: {
    color: "#7C3AED",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
  },

  description: {
    color: "#D4D4D8",
    fontSize: 15,
    lineHeight: 26,
  },
});