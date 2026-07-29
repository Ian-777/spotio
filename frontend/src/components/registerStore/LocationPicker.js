import {
  useContext,
  useRef,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import MapView, {
  Marker,
} from "react-native-maps";

import * as Location from "expo-location";

import {
  RegisterStoreContext,
} from "../../context/RegisterStoreContext";

import mapDarkStyle from "../../styles/mapDarkStyle";

export default function LocationPicker() {

  const {
    storeData,
    updateStoreData,
  } = useContext(
    RegisterStoreContext
  );

  const mapRef = useRef(null);

  const latitude =
    storeData.latitude ?? 4.6482837;

  const longitude =
    storeData.longitude ?? -74.2478944;

  async function useCurrentLocation() {

    try {

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {

        Alert.alert(
          "Permiso requerido",
          "Debes permitir el acceso a la ubicación."
        );

        return;

      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.High,
        });

      updateStoreData({

        latitude:
          location.coords.latitude,

        longitude:
          location.coords.longitude,

      });

      mapRef.current?.animateToRegion(
        {
          latitude:
            location.coords.latitude,

          longitude:
            location.coords.longitude,

          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
        800
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No fue posible obtener la ubicación."
      );

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📍 Ubicación
      </Text>

      <Text style={styles.subtitle}>
        Arrastra el marcador hasta la ubicación exacta del establecimiento.
      </Text>

      <View style={styles.mapContainer}>

        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={mapDarkStyle}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >

          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            draggable
            pinColor="#7C3AED"
            onDragEnd={(e) => {

              const {
                latitude,
                longitude,
              } =
                e.nativeEvent.coordinate;

              mapRef.current?.animateToRegion(
                {
                  latitude,
                  longitude,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                },
                400
              );

              updateStoreData({
                latitude,
                longitude,
              });

            }}
          />

        </MapView>

      </View>

      <TouchableOpacity
        style={[
          styles.locationButton,
          storeData.latitude &&
          styles.locationButtonSuccess,
        ]}
        onPress={useCurrentLocation}
      >

        <Text
          style={styles.locationButtonText}
        >

          {storeData.latitude
            ? "✅ Ubicación obtenida"
            : "📍 Usar mi ubicación actual"}

        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#181818",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    color: "#A1A1AA",
    fontSize: 13,
    marginBottom: 15,
    lineHeight: 18,
  },

  mapContainer: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

  locationButton: {
    marginTop: 16,
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  locationButtonSuccess: {
    backgroundColor: "#16A34A",
  },

  locationButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

});