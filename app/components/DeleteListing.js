import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
function DeleteListing({ handleDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDelete}>
        <MaterialCommunityIcons
          name="trash-can"
          size={40}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
});
export default DeleteListing;
