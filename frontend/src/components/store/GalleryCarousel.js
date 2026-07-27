import React, {
  useState,
} from "react";

import API_URL from "../../config/api";

import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";

import usePhotos from "../../hooks/usePhotos";

import ImageViewer from "../common/ImageViewer";

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

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    viewerVisible,
    setViewerVisible,
  ] = useState(false);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

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

  const images =
    photos.map(photo => ({

      uri:
        photo.image_url.startsWith("http")
          ? photo.image_url
          : `${API_URL}${photo.image_url}`,

    }));

  return (
    <View>

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

        onMomentumScrollEnd={(event) => {

          const index =
            Math.round(
              event.nativeEvent.contentOffset.x /
              width
            );

          setCurrentIndex(index);

        }}

        renderItem={({
          item,
          index,
        }) => {

          if (!item?.image_url) {
            return null;
          }

          const imageUrl =
            item.image_url.startsWith("http")
              ? item.image_url
              : `${API_URL}${item.image_url}`;

          return (

            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {

                setSelectedIndex(index);

                setViewerVisible(true);

              }}
            >

              <Image
                source={{
                  uri: imageUrl,
                }}
                style={styles.image}
              />

              <View style={styles.badge}>

                <Text style={styles.badgeText}>

                  {
                    item.image_type === "cover"
                      ? "📍 Foto oficial"
                      : `👤 ${item.name || "Usuario"}`
                  }

                </Text>

              </View>

            </TouchableOpacity>

          );

        }}

      />

      <View style={styles.counter}>

        <Text style={styles.counterText}>
          {currentIndex + 1}/{photos.length}
        </Text>

      </View>

      <View style={styles.dots}>

        {
          photos.map((_, index) => (

            <View
              key={index}
              style={[

                styles.dot,

                currentIndex === index &&
                styles.activeDot,

              ]}
            />

          ))
        }

      </View>

      <ImageViewer
        visible={viewerVisible}
        images={images}
        imageIndex={selectedIndex}
        onRequestClose={() =>
          setViewerVisible(false)
        }
      />

    </View>
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

  badge: {

    position: "absolute",

    left: 15,

    bottom: 15,

    backgroundColor: "rgba(0,0,0,0.65)",

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 12,

  },

  badgeText: {

    color: "#FFF",

    fontWeight: "700",

    fontSize: 12,

  },

  counter: {

    position: "absolute",

    top: 18,

    right: 18,

    backgroundColor: "rgba(0,0,0,.6)",

    borderRadius: 20,

    paddingHorizontal: 12,

    paddingVertical: 5,

  },

  counterText: {

    color: "#FFF",

    fontWeight: "700",

    fontSize: 13,

  },

  dots: {

    position: "absolute",

    bottom: 15,

    alignSelf: "center",

    flexDirection: "row",

  },

  dot: {

    width: 8,

    height: 8,

    borderRadius: 4,

    marginHorizontal: 4,

    backgroundColor: "#777",

  },

  activeDot: {

    backgroundColor: "#FFF",

    width: 18,

  },

});