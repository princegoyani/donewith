import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../config/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItemDeleteAction({ onDelete }) {
  return (
    <TouchableWithoutFeedback onPress={onDelete}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={30}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ListItemDeleteAction;
