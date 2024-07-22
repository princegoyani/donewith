import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListItem({
  image,
  title,
  subTitle,
  onPress,
  IconComponent,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={onPress}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.listItem}>
          {IconComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.listingDetail}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  listingDetail: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.medium,
  },
});

export default ListItem;
