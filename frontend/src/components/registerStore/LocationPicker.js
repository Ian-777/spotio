import { useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import MapView, {
  Marker,
} from "react-native-maps";

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

  const latitude =
    storeData.latitude ?? 4.6482837;

  const longitude =
    storeData.longitude ?? -74.2478944;

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📍 Ubicación
      </Text>

      <View style={styles.mapContainer}>

        <MapView
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

              updateStoreData({
                latitude,
                longitude,
              });

            }}
          />

        </MapView>

      </View>

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
    marginBottom: 15,
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

});