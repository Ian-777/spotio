import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
} from "react-native";

import {
  getStorePhotos,
  uploadStorePhoto,
} from "../services/photosService";

export default function usePhotos(
  store,
  user
) {
  const [photos, setPhotos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!store?.store_id) {
      return;
    }

    loadPhotos();
  }, [store]);

  const loadPhotos =
    async () => {
      try {
        const data =
          await getStorePhotos(
            store
          );

        setPhotos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const uploadPhoto =
    async (image) => {
      try {
        await uploadStorePhoto(
          image,
          store,
          user
        );

        await loadPhotos();

        Alert.alert(
          "Éxito",
          "Foto subida correctamente."
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
    photos,
    loading,
    uploadPhoto,
    reloadPhotos:
      loadPhotos,
  };
}