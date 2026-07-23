import API_URL from "../../config/api";

import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import usePhotos from "../../hooks/usePhotos";

const { width } = Dimensions.get("window");

export default function GalleryCarousel({
  store,
  user,
}) {
  const {
    photos,
    loading,
  } = usePhotos(
    store,
    user
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#7C3AED"
        />
      </View>
    );
  }

console.log("AAAAAAAAAAAAAAAA");
console.log("STORE:", store);
console.log("PHOTOS:", photos);

  return (
    <FlatList
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={photos}
     keyExtractor={(item, index) =>
  item.photo_id
    ? item.photo_id.toString()
    : index.toString()
}
      renderItem={({ item }) => {

  if (!item?.image_url) {
    return null;
  }

  const imageUrl =
    item.image_url.startsWith("http")
      ? item.image_url
      : `${API_URL}${item.image_url}`;

  return (
    <Image
      source={{
        uri: imageUrl,
      }}
      style={styles.image}
    />
  );

}}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height: 260,
  },

  loading: {
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
});