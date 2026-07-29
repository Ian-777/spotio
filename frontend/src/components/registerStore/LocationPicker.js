import { useContext } from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import MapView, {
  Marker,
} from "react-native-maps";

import {
  RegisterStoreContext,
} from "../../context/RegisterStoreContext";

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

      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          draggable
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
  );

}

const styles = StyleSheet.create({

  container:{
    marginTop:20,
    borderRadius:18,
    overflow:"hidden",
  },

  map:{
    height:280,
    width:"100%",
  },

});