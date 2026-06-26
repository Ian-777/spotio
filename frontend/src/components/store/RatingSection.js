import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";

import useRatings from "../../hooks/useRatings";

export default function RatingSection({
  store,
  user,
}) {
  const {
    userRating,
    averageRating,
    totalRatings,
    submitRating,
  } = useRatings(
    store,
    user
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Calificación
      </Text>

      <View style={styles.averageContainer}>
        <Text style={styles.average}>
          ⭐{" "}
          {averageRating.toFixed(
            1
          )}
        </Text>

        <Text style={styles.total}>
          ({totalRatings}{" "}
          calificaciones)
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Tu calificación
      </Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <FontAwesome
              key={star}
              name={
                star <=
                userRating
                  ? "star"
                  : "star-o"
              }
              size={34}
              color="#FACC15"
              style={
                styles.star
              }
              onPress={() =>
                submitRating(
                  star
                )
              }
            />
          )
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 25,
      padding: 20,
      backgroundColor:
        "#1A1A1A",
      borderRadius: 18,
    },

    title: {
      fontSize: 20,
      color: "#FFFFFF",
      fontWeight: "bold",
      marginBottom: 12,
    },

    averageContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
    },

    average: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FACC15",
    },

    total: {
      marginLeft: 10,
      fontSize: 15,
      color: "#A1A1AA",
    },

    subtitle: {
      color: "#FFFFFF",
      fontSize: 16,
      marginBottom: 12,
    },

    stars: {
      flexDirection: "row",
      justifyContent:
        "space-between",
    },

    star: {
      padding: 4,
    },
  });