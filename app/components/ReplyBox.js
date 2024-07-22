import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "./AppText";
import { AppForm, AppFormField, SubmitButton } from "./forms";
import colors from "../config/colors";
import Screen from "./Screen";

function ReplyBox({ user, messageToReply, handleSubmit, validationSchema }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <AppText style={styles.userName}>{user.name}</AppText>
        <AppText style={styles.email}>{user.email}</AppText>
        <AppText style={styles.message}>{messageToReply}</AppText>
        <View style={styles.form}>
          <AppForm
            initialValues={{ message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name={"message"}
              width="100%"
              placeholder="Reply..."
            />
            <SubmitButton title={"Send"} />
          </AppForm>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  email: {
    color: colors.medium,
  },
  message: {
    margin: 10,
  },
  form: {},
});
export default ReplyBox;
