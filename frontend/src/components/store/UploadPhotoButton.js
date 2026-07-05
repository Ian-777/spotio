import React from "react";

import {
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function UploadPhotoButton({
  onImageSelected,
}) {
  const pickImage = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      return Alert.alert(
        "Permiso requerido",
        "Debes permitir acceso a la galería."
      );
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 0.8,
      });

    if (!result.canceled) {
      onImageSelected(result.assets);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      style={styles.button}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>
        📷 Agregar fotos
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5B21B6",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 14,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});