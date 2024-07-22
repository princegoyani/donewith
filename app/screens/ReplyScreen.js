import React from "react";
import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";

import ReplyBox from "../components/ReplyBox";

import colors from "../config/colors";

import * as Yup from "yup";

function ReplyScreen({ route, navigation }) {
  const { user } = useAuth();
  const { fromUser, messageToReply } = route.params;

  const handleSent = ({ message }) => {
    messagesApi.sendMessage(user, fromUser, message, messageToReply);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      //behavior="position"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
      style={{
        flex: 1,
        alignContent: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <View style={styles.container}>
        <Button
          title="Cancel"
          color={colors.danger}
          onPress={() => navigation.goBack()}
        />

        <ReplyBox
          user={fromUser}
          messageToReply={messageToReply}
          handleSubmit={handleSent}
          validationSchema={validationSchema}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    maxHeight: "90%",
    width: "100%",
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
});

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Reply"),
});

export default ReplyScreen;
