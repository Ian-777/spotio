import { useMemo } from "react";

import { useLocation } from "../context/LocationContext";

import {
  getDistance,
  formatDistance,
} from "../utils/distance";

export default function useStoreDistance(
  store
) {
  const { location } =
    useLocation();

  return useMemo(() => {
    if (
      !location ||
      !store?.latitude ||
      !store?.longitude
    ) {
      return null;
    }

    const distance =
      getDistance(
        location.latitude,
        location.longitude,
        Number(store.latitude),
        Number(store.longitude)
      );

    return {
      distance,
      distanceText:
        formatDistance(distance),
    };
  }, [
    location,
    store?.latitude,
    store?.longitude,
  ]);
}