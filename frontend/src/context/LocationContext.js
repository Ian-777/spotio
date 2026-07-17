import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Location from "expo-location";

const LocationContext =
  createContext();

export function LocationProvider({
  children,
}) {
  const [location, setLocation] =
    useState(null);

  const [loadingLocation, setLoadingLocation] =
    useState(true);

  const [permissionGranted, setPermissionGranted] =
    useState(false);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation =
    async () => {
      try {
        const {
          status,
        } =
          await Location.requestForegroundPermissionsAsync();

        if (
          status !== "granted"
        ) {
          setPermissionGranted(
            false
          );

          setLoadingLocation(
            false
          );

          return;
        }

        setPermissionGranted(
          true
        );

        const currentLocation =
          await Location.getCurrentPositionAsync({
            accuracy:
              Location.Accuracy.High,
          });

        setLocation({
          latitude:
            currentLocation.coords.latitude,

          longitude:
            currentLocation.coords.longitude,
        });
      } catch (error) {
        console.log(
          "LOCATION ERROR:",
          error
        );
      } finally {
        setLoadingLocation(
          false
        );
      }
    };

  return (
    <LocationContext.Provider
      value={{
        location,

        loadingLocation,

        permissionGranted,

        refreshLocation:
          requestLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(
    LocationContext
  );
}