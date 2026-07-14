import React, {
  useRef,
} from "react";

import {
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function LikeButton({
  liked,
  likes,
  onPress,
}) {

  const scale =
    useRef(
      new Animated.Value(1)
    ).current;

  const handlePress = () => {

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.25,
        duration: 120,
        useNativeDriver: true,
      }),

      Animated.timing(scale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();

  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
      }}
    >

      <Animated.View
        style={{
          transform: [
            {
              scale,
            },
          ],
        }}
      >

        <Ionicons
          name={
            liked
              ? "heart"
              : "heart-outline"
          }
          size={20}
          color={
            liked
              ? "#EF4444"
              : "#AAAAAA"
          }
        />

      </Animated.View>

      <Text
        style={{
          color: liked
            ? "#EF4444"
            : "#AAAAAA",

          marginLeft: 6,

          fontWeight: "600",

          fontSize: 14,
        }}
      >
        {likes}
      </Text>

    </TouchableOpacity>
  );

}