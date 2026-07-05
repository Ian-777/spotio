import { TouchableOpacity, Text, Alert } from "react-native";

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
      style={{
        backgroundColor: "#7C3AED",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontWeight: "bold",
        }}
      >
        📷 Agregar fotos
      </Text>
    </TouchableOpacity>
  );
}