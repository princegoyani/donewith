import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Yup from "yup";
import * as Notifications from "expo-notifications";

import messagesApi from "../api/messages";

import { AppForm, AppFormField, SubmitButton } from "./forms";
import useAuth from "../auth/useAuth";

function ContactSellerForm({ listing, user }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    // const result = await messagesApi.sendMessage(message, listing.id);
    const result = await messagesApi.sendMessage(user, listing.userby, message);

    if (!result.ok) {
      //logger.log(result);
      return Alert.alert("Error", "Error sending message");
    }

    resetForm();

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the seller.",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={225}
        multiline
        name={"message"}
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title={"Contact Seller"} />
    </AppForm>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
