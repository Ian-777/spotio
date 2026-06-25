import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import UploadPhotoButton from "./UploadPhotoButton";

const { width } = Dimensions.get("window");

export default function GalleryCarousel({
  store,
  user,
}) {
  const [photos, setPhotos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:3000/api/photos/${store.store_id}`
      );

      const data =
        await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0
      ) {
        setPhotos(data);
      } else {
        setPhotos([
          {
            photo_id: 0,
            image_url:
              store.image_url,
          },
        ]);
      }
    } catch (error) {
      console.log(error);

      setPhotos([
        {
          photo_id: 0,
          image_url:
            store.image_url,
        },
      ]);
    }

    setLoading(false);
  };

  const uploadPhoto = async (
    image
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "user_id",
        user.user_id
      );

      formData.append(
        "store_id",
        store.store_id
      );

      formData.append(
        "image",
        {
          uri: image.uri,
          type:
            image.mimeType ||
            "image/jpeg",
          name:
            image.fileName ||
            image.fileName ||
            `photo_${Date.now()}.jpg`,
        }
      );

      const response = await fetch(
        "http://192.168.1.8:3000/api/photos",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        Alert.alert(
          "Error",
          "No se pudo subir la foto"
        );

        return;
      }

      Alert.alert(
        "Éxito",
        "Foto subida correctamente"
      );

      loadPhotos();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar al servidor"
      );
    }
  };

  if (loading) {
    return (
      <View
        style={styles.loading}
      >
        <ActivityIndicator
          size="large"
          color="#7C3AED"
        />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={
          false
        }
        data={photos}
        keyExtractor={(item) =>
          item.photo_id.toString()
        }
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item.image_url.startsWith("http")
                ? item.image_url
                : `http://192.168.1.8:3000${item.image_url}`,
            }}
            style={styles.image}
          />
        )}
      />

      <View
        style={styles.buttonContainer}
      >
        <UploadPhotoButton
          onImageSelected={
            uploadPhoto
          }
        />
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    image: {
      width,
      height: 260,
    },

    loading: {
      height: 260,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        "#111",
    },

    buttonContainer: {
      padding: 15,
    },
  });