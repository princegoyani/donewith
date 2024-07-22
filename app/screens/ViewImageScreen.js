import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
function ViewImageScreen(props) {
  return (
    <View style={style.container}>
      <View style={style.close}>
        <MaterialCommunityIcons name="close" color="white" size={35} />
      </View>
      <View style={style.delete}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="white"
          size={35}
        />
      </View>

      <Image
        resizeMode="contain"
        source={require("../assets/chair.jpg")}
        style={style.image}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  image: {
    height: "100%",
    width: "100%",
  },

  close: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  delete: {
    position: "absolute",
    top: 40,
    right: 30,
  },
});

export default ViewImageScreen;
