import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppButton from "../components/AppButton";

import colors from "../config/colors";
import routes from "../navigation/routes";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <Text style={styles.tagLine}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={"Login"}
          handlePress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title={"Register"}
          color={"secondaryColor"}
          handlePress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  logoContainer: { position: "absolute", top: 70, alignItems: "center" },
  logo: {
    height: 100,
    width: 100,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  tagLine: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
