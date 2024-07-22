import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

const AppFormImagePicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => uri !== imageUri)
    );
  };

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onRemoveUri={handleRemove}
        onAddUri={handleAdd}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormImagePicker;
