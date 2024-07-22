import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  items,
  name,
  placeholder,
  width,
  PickerItemComponent,
  numberOfColumns,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectCategory={(item) => {
          setFieldValue(name, item);
        }}
        placeholder={placeholder}
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        currentCategory={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
