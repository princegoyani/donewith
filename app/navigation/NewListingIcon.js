import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function NewListingIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={40}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: colors.white,
    borderWidth: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryColor,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NewListingIcon;
