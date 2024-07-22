import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "./Icon";
import colors from "../config/colors";
//import logger from "../utility/logger";

function AppImageInput({ imageUri, onChangeUri }) {
  useEffect(() => {
    requestPermission();
  });

  const requestPermission = async () => {
    const request = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!request.granted) alert(" NEED TO PROVIDE PERMISSION FOR PHOTOS ");
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else
      Alert.alert("Delete", "Do you want to delete this Image?", [
        { text: "Yes", onPress: () => onChangeUri(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const requestImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.2,
      });

      if (!requestImage.cancelled) onChangeUri(requestImage.uri);
    } catch (error) {
      //logger.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <Icon
            name="camera"
            size={80}
            backgroundColor={colors.light}
            iconColor={colors.medium}
          />
        )}

        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
export default AppImageInput;
