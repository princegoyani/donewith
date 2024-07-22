import React, { useState } from "react";
import * as Yup from "yup";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";

import AppFormPicker from "../components/forms/AppFormPicker";

import Screen from "../components/Screen";

import useLocation from "../hooks/useLocation";
import listingsApis from "../api/listings";
import UploadScreen from "./UploadScreen";
import useAuth from "../auth/useAuth";

const vadilationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select atleast 1 Image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen(props) {
  const { user } = useAuth();
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listings, { resetForm }) => {
    console.log(progress, 0);
    setProgress(0);
    setUploadVisible(true);
    console.log(listings);
    console.log(progress, 0.4);
    const result = await listingsApis.addListings(
      {
        ...listings,
        location,
        user,
      },
      (progress) => setProgress(progress)
    );
    console.log(progress, 1);
    if (!result.ok) {
      setUploadVisible(false);
      return alert("NOT SUCCESSFULL ! SERVER ERROR");
    }

    if (progress === 1) resetForm();

    // return setProgress(0.5);
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          <UploadScreen
            progress={progress}
            onDone={() => setUploadVisible(false)}
            visible={uploadVisible}
          />
          <AppForm
            initialValues={{
              title: "",
              price: "",
              description: "",
              category: null,
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={vadilationSchema}
          >
            <AppFormImagePicker name={"images"} />
            <AppFormField
              name={"title"}
              placeholder={"Title"}
              maxLength={255}
            />
            <AppFormField
              name={"price"}
              maxLength={8}
              placeholder={"Price"}
              keyboardType="numeric"
              width={120}
            />
            <AppFormPicker
              items={categories}
              name="category"
              placeholder={"Categories"}
              numberOfColumns={3}
              width={"50%"}
              PickerItemComponent={CategoryPickerItem}
            />
            <AppFormField
              name={"description"}
              placeholder={"Description"}
              multiline
              maxLength={255}
              numberOfLines={3}
            />
            <SubmitButton title={"Post"} />
          </AppForm>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

export default ListingEditScreen;
