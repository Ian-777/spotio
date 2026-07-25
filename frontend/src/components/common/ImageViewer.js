import React from "react";

import ImageViewing from "react-native-image-viewing";

export default function PhotoViewer({
  visible,
  images,
  imageIndex,
  onRequestClose,
}) {
  return (
    <ImageViewing
      images={images}
      imageIndex={imageIndex}
      visible={visible}
      onRequestClose={onRequestClose}
      presentationStyle="fullScreen"
      animationType="fade"
    />
  );
}