import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import API_URL from "../../config/api";
import UploadPhotoButton from "./UploadPhotoButton";
import useReviews from "../../hooks/useReviews";
import { deletePhoto } from "../../services/photosService";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import LikeButton from "../review/LikeButton";

export default function ReviewSection({
  store,
  user,
}) {
  const [photos, setPhotos] =
    useState([]);

  const pulse =
    useRef(
      new Animated.Value(1)
    ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.delay(1800),
      ])
    ).start();
  }, []);

  const removePreviewPhoto = (indexToRemove) => {
    setPhotos((prev) =>
      prev.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const {
    reviews,
    reviewText,
    setReviewText,
    hasReview,
    submitReview,
    deleteReview,
    reloadReviews,
    toggleLike,
  } = useReviews(
    store,
    user
  );


  const pickImages = async () => {
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
      setPhotos((prev) => [
        ...prev,
        ...result.assets,
      ]);
    }
  };


  const removePhoto = async (photo_id) => {
    try {
      await deletePhoto(
        photo_id,
        user.user_id
      );

      await reloadReviews();

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Reseñas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu opinión..."
        placeholderTextColor="#888"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />



      <View
        style={[
          styles.previewRow,
          photos.length === 0 &&
          styles.previewRowEmpty,
        ]}
      >

        <View style={styles.addPhotoContainer}>

          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={pickImages}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    scale: pulse,
                  },
                ],
              }}
            >
              <Ionicons
                name="add"
                size={34}
                color="#7C3AED"
              />
            </Animated.View>
          </TouchableOpacity>

          {photos.length === 0 && (
            <>
              <Text style={styles.addPhotoTitle}>
                Agregar fotos
              </Text>

              <Text style={styles.addPhotoSubtitle}>
                Puedes subir hasta 10 fotos
              </Text>
            </>
          )}

        </View>

        {photos.map((photo, index) => (
          <View
            key={index}
            style={styles.previewContainer}
          >
            <Image
              source={{ uri: photo.uri }}
              style={styles.preview}
            />

            <TouchableOpacity
              style={styles.removePreviewButton}
              onPress={() =>
                removePreviewPhoto(index)
              }
            >
              <Ionicons
                name="close"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ))}

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await submitReview(photos);
          setPhotos([]);
        }}
      >
        <Text style={styles.buttonText}>
          {hasReview
            ? "Actualizar reseña"
            : "Publicar reseña"}
        </Text>
      </TouchableOpacity>

      {hasReview && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteReview}
        >
          <Text
            style={
              styles.deleteButtonText
            }
          >
            Eliminar mi reseña
          </Text>
        </TouchableOpacity>
      )}

      {reviews.length === 0 ? (
        <Text style={styles.empty}>
          Aún no hay reseñas.
        </Text>
      ) : (
        reviews.map((review) => (
          <View
            key={review.review_id}
            style={styles.reviewCard}
          >
            <Text
              style={
                styles.reviewAuthor
              }
            >
              {review.name}
            </Text>

            <Text
              style={
                styles.reviewDate
              }
            >
              {new Date(
                review.created_at
              ).toLocaleDateString()}
            </Text>

            <Text
              style={
                styles.reviewText
              }
            >
              {review.comment}
            </Text>

            <LikeButton
              liked={review.liked}
              likes={review.likes}
              onPress={() =>
                toggleLike(review.review_id)
              }
            />

            {review.photos &&
              review.photos.length >
              0 && (
                <View
                  style={
                    styles.photosRow
                  }
                >
                  {review.photos.map(
                    (photo) => (
                      <View
                        key={photo.photo_id}
                        style={styles.photoContainer}
                      >
                        <Image
                          source={{
                            uri:
                              photo.image_url.startsWith("http")
                                ? photo.image_url
                                : `${API_URL}${photo.image_url}`,
                          }}
                          style={styles.reviewPhoto}
                        />

                        {review.user_id === user.user_id && (
                          <TouchableOpacity
                            style={styles.deletePhotoButton}
                            onPress={() =>
                              removePhoto(photo.photo_id)
                            }
                          >
                            <Text
                              style={styles.deletePhotoText}
                            >
                              ✕
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )
                  )}
                </View>
              )}
          </View>
        ))
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 30,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
    },

    input: {
      backgroundColor:
        "#1E1E1E",
      color: "#FFFFFF",
      borderRadius: 12,
      padding: 12,
      minHeight: 90,
      marginBottom: 15,
    },

    previewRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 15,
      marginBottom: 15,
    },

    previewContainer: {
      position: "relative",
      marginRight: 10,
      marginBottom: 10,
    },

    removePreviewButton: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#EF4444",
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
    },

    preview: {
      width: 90,
      height: 90,
      borderRadius: 12,
      marginRight: 10,
      marginBottom: 10,
    },

    button: {
      backgroundColor: "#7C3AED",
      borderRadius: 14,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 2,
      marginBottom: 14,
    },

    buttonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 16,
    },

    deleteButton: {
      alignSelf: "flex-end",
      marginTop: 6,
      marginBottom: 24,
    },

    deleteButtonText: {
      color: "#EF4444",
      fontWeight: "bold",
    },

    empty: {
      color: "#888",
      textAlign: "center",
      marginTop: 20,
    },

    reviewCard: {
      backgroundColor:
        "#1E1E1E",
      borderRadius: 12,
      padding: 15,
      marginBottom: 12,
    },

    reviewAuthor: {
      color: "#7C3AED",
      fontWeight: "bold",
      marginBottom: 5,
      fontSize: 16,
    },

    reviewDate: {
      color: "#888",
      fontSize: 12,
      marginBottom: 10,
    },

    reviewText: {
      color: "#FFFFFF",
      lineHeight: 22,
    },



    photosRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 12,
    },

    photoContainer: {
      position: "relative",
      marginRight: 8,
      marginBottom: 8,
    },

    reviewPhoto: {
      width: 70,
      height: 70,
      borderRadius: 8,
      marginRight: 8,
      marginBottom: 8,
    },

    deletePhotoButton: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: "#EF4444",
      justifyContent: "center",
      alignItems: "center",
    },

    deletePhotoText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "bold",
    },

    addPhotoButton: {
      width: 72,
      height: 72,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: "#7C3AED",
      borderStyle: "dashed",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      marginBottom: 10,
      backgroundColor: "#181818",
      alignSelf: "center",
    },

    previewRowEmpty: {
      justifyContent: "center",
    },

    addPhotoContainer: {
      alignItems: "center",
      marginRight: 18,
    },

    addPhotoTitle: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "700",
      marginTop: 10,
    },

    addPhotoSubtitle: {
      color: "#8A8A8A",
      fontSize: 12,
      marginTop: 3,
      textAlign: "center",
    },
  });