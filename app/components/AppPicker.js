import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import AppButton from "./AppButton";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  currentCategory,
  onSelectCategory,
  placeholder,
  PickerItemComponent = PickerItem,
  numberOfColumns,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {currentCategory ? (
            <AppText style={styles.title}> {currentCategory.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType={"slide"}>
        <Screen>
          <AppButton
            title={"Close"}
            handlePress={() => setModalVisible(false)}
            color={"secondaryColor"}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectCategory(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    padding: 15,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  title: { flex: 1 },
  placeholder: { flex: 1, color: defaultStyles.colors.medium },
  icon: {
    marginRight: 10,
  },
});

export default AppPicker;
