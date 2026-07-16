import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";

import MapView, {
    Marker,
} from "react-native-maps";

import mapStyle from "../../config/mapStyle";

export default function StoreMap({
    store,
}) {
    const openMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`;

        Linking.openURL(url);
    };

    if (
        !store.latitude ||
        !store.longitude
    ) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                📍 Ubicación
            </Text>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    customMapStyle={mapStyle}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    initialRegion={{
                        latitude: Number(store.latitude),
                        longitude: Number(store.longitude),
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: Number(store.latitude),
                            longitude: Number(store.longitude),
                        }}
                        title={store.name}
                        pinColor="#7C3AED"
                    />
                </MapView>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={openMaps}
            >
                <Text style={styles.buttonText}>
                    Abrir en Google Maps
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles =
    StyleSheet.create({
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

        button: {
            marginTop: 15,
            backgroundColor: "#7C3AED",
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: "center",
        },

        buttonText: {
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 15,
        },
    });