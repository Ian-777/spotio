import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import useReviews from "../../hooks/useReviews";

export default function ReviewSection({
  store,
  user,
}) {
  const {
    reviews,
    reviewText,
    setReviewText,
    hasReview,
    submitReview,
    deleteReview,
  } = useReviews(
    store,
    user
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Reseñas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu opinión..."
        placeholderTextColor="#888"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submitReview}
      >
        <Text style={styles.buttonText}>
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
          <Text
            style={
              styles.deleteButtonText
            }
          >
            Eliminar mi reseña
          </Text>
        </TouchableOpacity>
      )}

      {reviews.length === 0 ? (
        <Text style={styles.empty}>
          Aún no hay reseñas.
        </Text>
      ) : (
        reviews.map((review) => (
          <View
            key={review.review_id}
            style={styles.reviewCard}
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
        ))
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 30,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
    },

    input: {
      backgroundColor:
        "#1E1E1E",
      color: "#FFFFFF",
      borderRadius: 12,
      padding: 12,
      minHeight: 90,
      marginBottom: 15,
    },

    button: {
      backgroundColor:
        "#7C3AED",
      borderRadius: 12,
      padding: 14,
      alignItems: "center",
      marginBottom: 10,
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },

    deleteButton: {
      alignSelf: "flex-end",
      marginBottom: 20,
    },

    deleteButtonText: {
      color: "#EF4444",
      fontWeight: "bold",
    },

    empty: {
      color: "#888",
      textAlign: "center",
      marginTop: 20,
    },

    reviewCard: {
      backgroundColor:
        "#1E1E1E",
      borderRadius: 12,
      padding: 15,
      marginBottom: 12,
    },

    reviewAuthor: {
      color: "#7C3AED",
      fontWeight: "bold",
      marginBottom: 5,
      fontSize: 16,
    },

    reviewDate: {
      color: "#888",
      fontSize: 12,
      marginBottom: 10,
    },

    reviewText: {
      color: "#FFFFFF",
      lineHeight: 22,
    },
  });