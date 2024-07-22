import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { useNetInfo } from "@react-native-community/netinfo";

import colors from "../config/colors";
import AppText from "./AppText";
function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.type !== "Unknown" && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connnection</AppText>
      </View>
    );
  }

  return null;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryColor,
    height: 50,
    width: "100%",
    position: "absolute",
    zIndex: 1,
    top: Constants.statusBarHeight,
  },
  text: {
    color: colors.white,
  },
});
export default OfflineNotice;
