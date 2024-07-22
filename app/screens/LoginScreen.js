import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import authApi from "../api/auth";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";

import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";

import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password").min(4),
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  handleSubmit = async ({ email, password }) => {
    dismissKeyboard();
    setLoading(true);
    const result = await authApi.login(email, password);
    setLoading(false);
    if (result.error) return setLoginError(true);
    if (result && result.stsTokenManager.accessToken) {
      return auth.logIn(result.stsTokenManager.accessToken);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Image source={require("../assets/logo-red.png")} style={styles.logo} />
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={"Invalid Email and/or Password"}
            visible={loginError}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon={"email"}
            name="email"
            keyboardType="email-address"
            placeholder={"Email"}
            textContentType="emailAddress"
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            icon={"lock"}
            secureTextEntry
            placeholder={"Password"}
            textContentType="password"
          />
          <SubmitButton title={"Login"} />
        </AppForm>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
