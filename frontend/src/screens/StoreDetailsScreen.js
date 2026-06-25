import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";

import StoreHeader from "../components/store/StoreHeader";

import {
  useContext,
  useState,
  useEffect,
} from "react";

import { AuthContext } from "../context/AuthContext";

export default function StoreDetailsScreen({
  route,
}) {
  const { store } = route.params;

  const { user } =
    useContext(AuthContext);

  const [userRating, setUserRating] =
    useState(0);

  const [averageRating, setAverageRating] =
    useState(
      Number(store.average_rating || 0)
    );

  const [totalRatings, setTotalRatings] =
    useState(
      Number(store.total_ratings || 0)
    );

  const [reviews, setReviews] =
    useState([]);

  const [reviewText, setReviewText] =
    useState("");

  const [hasReview, setHasReview] =
    useState(false);

  useEffect(() => {
    loadUserRating();
    loadReviews();
    loadMyReview();
  }, []);

  const loadUserRating = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:3000/api/ratings/${store.store_id}/${user.user_id}`
      );

      const data = await response.json();

      if (data?.rating) {
        setUserRating(
          Number(data.rating)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:3000/api/reviews/${store.store_id}`
      );

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };


  const loadMyReview = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:3000/api/reviews/${store.store_id}/${user.user_id}`
      );

      const data = await response.json();

      console.log("Mi reseña:", data);

      if (data && data.comment) {
        setReviewText(data.comment);
        setHasReview(true);
      } else {
        setReviewText("");
        setHasReview(false);
      }
    } catch (error) {
      console.log(error);
      setHasReview(false);
    }
  };


  const deleteReview = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:3000/api/reviews/${store.store_id}/${user.user_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        return Alert.alert(
          "Error",
          "No se pudo eliminar la reseña"
        );
      }

      setReviewText("");
      setHasReview(false);

      loadReviews();

      Alert.alert(
        "Éxito",
        "Reseña eliminada"
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar al servidor"
      );
    }
  };


  const submitReview = async () => {
    try {
      if (!reviewText.trim()) {
        return Alert.alert(
          "Error",
          "Escribe una reseña"
        );
      }

      const response = await fetch(
        "http://192.168.1.8:3000/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            user_id: user.user_id,
            store_id: store.store_id,
            comment: reviewText,
          }),
        }
      );

      if (!response.ok) {
        return Alert.alert(
          "Error",
          "No se pudo guardar la reseña"
        );
      }

      setHasReview(true);

      loadReviews();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar al servidor"
      );
    }
  };

  const submitRating = async (
    rating
  ) => {
    try {
      const oldRating = userRating;

      setUserRating(rating);

      const response = await fetch(
        "http://192.168.1.8:3000/api/ratings",
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

      let newAverage = averageRating;
      let newTotal = totalRatings;

      if (oldRating === 0) {
        newAverage =
          (
            averageRating *
            totalRatings +
            rating
          ) /
          (totalRatings + 1);

        newTotal =
          totalRatings + 1;
      } else {
        newAverage =
          (
            averageRating *
            totalRatings -
            oldRating +
            rating
          ) / totalRatings;
      }

      setAverageRating(
        newAverage
      );

      setTotalRatings(
        newTotal
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar"
      );
    }
  };


  //cCAMBIO*********
  return (
    <ScrollView style={styles.container}>
      {/* IMAGEN */}

      <StoreHeader
  store={{
    ...store,
    average_rating:
      averageRating.toFixed(1),
    total_ratings:
      totalRatings,
  }}
  user={user}
/>

<View style={styles.content}>
       
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
                    submitRating(
                      star
                    )
                  }
                >
                  <FontAwesome
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

          <Text
            style={
              styles.description
            }
          >
            {store.description ||
              "Este establecimiento aún no tiene descripción."}
          </Text>
        </View>

        {/* RESEÑAS */}

        <View style={styles.section}>
          <Text style={styles.label}>
            Reseñas
          </Text>

          <TextInput
            style={
              styles.input
            }
            placeholder="Escribe tu opinión..."
            placeholderTextColor="#888"
            value={reviewText}
            onChangeText={
              setReviewText
            }
            multiline
          />

          <TouchableOpacity
            style={
              styles.button
            }
            onPress={
              submitReview
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              {hasReview
                ? "Actualizar reseña"
                : "Publicar reseña"}
            </Text>
          </TouchableOpacity>


          {hasReview && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteReview}
            >
              <Text style={styles.deleteButtonText}>
                Eliminar mi reseña
              </Text>
            </TouchableOpacity>
          )}


          {reviews.map(
            (review) => (
              <View
                key={
                  review.review_id
                }
                style={
                  styles.reviewCard
                }
              >
                <Text
                  style={
                    styles.reviewAuthor
                  }
                >
                  {review.name}
                </Text>

                <Text
                  style={
                    styles.reviewDate
                  }
                >
                  {new Date(
                    review.created_at
                  ).toLocaleDateString()}
                </Text>

                <Text
                  style={
                    styles.reviewText
                  }
                >
                  {review.comment}
                </Text>
              </View>
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      "#0D0D0D",
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
    textTransform:
      "uppercase",
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

  input: {
    backgroundColor:
      "#1E1E1E",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    minHeight: 90,
    marginBottom: 12,
  },

  button: {
    backgroundColor:
      "#7C3AED",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  reviewCard: {
    backgroundColor:
      "#1E1E1E",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  reviewAuthor: {
    color: "#7C3AED",
    fontWeight: "bold",
    marginBottom: 5,
  },

  reviewDate: {
    color: "#A1A1AA",
    fontSize: 12,
    marginBottom: 8,
  },

  reviewText: {
    color: "#FFFFFF",
  },

  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },

  deleteButtonText: {
    color: "#EF4444",
    fontWeight: "bold",
  },
});