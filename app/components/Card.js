import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import AppText from "./AppText";

import storeImage from "../api/storeImage";

function Card({ title, subTitle, imageUrl, thumbnailUrl, onPress }) {
  const [imageUrlState, setimageUrlState] = useState();

  const getImageUrl = async (image) => {
    //console.log("image", image);
    setimageUrlState(await storeImage.getImage(image));
  };
  useEffect(() => {
    getImageUrl(imageUrl);
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          uri={imageUrlState}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          style={styles.image}
        />
        <View style={styles.detailContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.price} numberOfLines={1}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
  },
  price: {
    color: colors.secondaryColor,
    fontWeight: "bold",
  },
});

export default Card;
