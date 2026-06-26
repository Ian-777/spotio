import {
  useState,
  useEffect,
} from "react";

import {
  Alert,
} from "react-native";

import {
  getUserRating,
  saveRating,
} from "../services/ratingsService";

export default function useRatings(
  store,
  user
) {
  const [userRating, setUserRating] =
    useState(0);

  const [averageRating, setAverageRating] =
    useState(
      Number(
        store.average_rating || 0
      )
    );

  const [totalRatings, setTotalRatings] =
    useState(
      Number(
        store.total_ratings || 0
      )
    );

  useEffect(() => {
    if (
      !store?.store_id ||
      !user?.user_id
    ) {
      return;
    }

    loadUserRating();
  }, []);

  const loadUserRating =
    async () => {
      try {
        const data =
          await getUserRating(
            store.store_id,
            user.user_id
          );

        if (data?.rating) {
          setUserRating(
            Number(data.rating)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  const submitRating =
    async (rating) => {
      try {
        const oldRating =
          userRating;

        setUserRating(rating);

        await saveRating({
          user_id:
            user.user_id,

          store_id:
            store.store_id,

          rating,
        });

        let newAverage =
          averageRating;

        let newTotal =
          totalRatings;

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
            ) /
            totalRatings;
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
          error.message
        );
      }
    };

  return {
    userRating,

    averageRating,

    totalRatings,

    submitRating,

    reloadRating:
      loadUserRating,
  };
}