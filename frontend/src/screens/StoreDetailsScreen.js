import React, {
  useContext,
} from "react";

import {
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import { AuthContext } from "../context/AuthContext";

import StoreHeader from "../components/store/StoreHeader";
import RatingSection from "../components/store/RatingSection";
import StoreInfo from "../components/store/StoreInfo";
import ReviewSection from "../components/store/ReviewSection";
import StoreMap from "../components/store/StoreMap";

export default function StoreDetailsScreen({
  route,
}) {
  const { store } = route.params;

  const { user } =
    useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <StoreHeader
        store={store}
        user={user}
      />

      <View style={styles.content}>
        <RatingSection
          store={store}
          user={user}
        />

        <StoreInfo
          store={store}
        />

        <StoreMap
          store={store}
        />

        <ReviewSection
          store={store}
          user={user}
        />
      </View>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#0D0D0D",
    },

    content: {
      padding: 20,
    },
  });