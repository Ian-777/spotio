import {
  useState,
  useEffect,
} from "react";

import {
  Alert,
} from "react-native";

import {
  getStoreReviews,
  getUserReview,
  saveReview,
  deleteReview,
} from "../services/reviewsService";

export default function useReviews(
  store,
  user
) {
  const [reviews, setReviews] =
    useState([]);

  const [reviewText, setReviewText] =
    useState("");

  const [hasReview, setHasReview] =
    useState(false);

  const [reviewImages, setReviewImages] =
    useState([]);

  useEffect(() => {
    if (
      !store?.store_id ||
      !user?.user_id
    ) {
      return;
    }

    loadReviews();
    loadMyReview();
  }, [store, user]);

  const loadReviews = async () => {
    try {
      const data =
        await getStoreReviews(
          store.store_id
        );

      setReviews(data);

    } catch (error) {
      console.log(error);
    }
  };

  const loadMyReview =
    async () => {
      try {
        const review =
          await getUserReview(
            store.store_id,
            user.user_id
          );

        if (
          review &&
          review.comment
        ) {
          setReviewText(
            review.comment
          );

          setHasReview(
            true
          );

        } else {
          setReviewText("");

          setHasReview(
            false
          );
        }

      } catch (error) {
        console.log(error);

        setReviewText("");

        setHasReview(
          false
        );
      }
    };

  const submitReview =
    async (images = []) => {
      try {
        if (
          !reviewText.trim()
        ) {
          return Alert.alert(
            "Error",
            "Escribe una reseña."
          );
        }

        // Compatibilidad con una sola imagen
        if (!Array.isArray(images)) {
          images = images
            ? [images]
            : [];
        }

        // Si no hay imágenes
        if (images.length === 0) {
          await saveReview(
            {
              user_id:
                user.user_id,

              store_id:
                store.store_id,

              comment:
                reviewText,
            },
            null
          );
        }

        // Si hay imágenes
        for (const image of images) {
          await saveReview(
            {
              user_id:
                user.user_id,

              store_id:
                store.store_id,

              comment:
                reviewText,
            },
            image
          );
        }

        setHasReview(
          true
        );

        setReviewImages([]);

        await loadReviews();

        Alert.alert(
          "Éxito",
          "Reseña guardada correctamente."
        );

      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  const removeReview =
    async () => {
      try {
        await deleteReview(
          store.store_id,
          user.user_id
        );

        setReviewText("");

        setReviewImages([]);

        setHasReview(
          false
        );

        await loadReviews();

        Alert.alert(
          "Éxito",
          "Reseña eliminada."
        );

      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return {
    reviews,

    reviewText,

    setReviewText,

    reviewImages,

    setReviewImages,

    hasReview,

    submitReview,

    deleteReview:
      removeReview,

    reloadReviews:
      loadReviews,
  };
}