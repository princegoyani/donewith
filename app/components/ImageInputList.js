import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppImageInput from "./AppImageInput";
function ImageInputList({ imageUris = [], onRemoveUri, onAddUri }) {
  const scrollView = useRef();
  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((imageUri) => (
            <View key={imageUri} style={styles.aBox}>
              <AppImageInput
                imageUri={imageUri}
                onChangeUri={() => onRemoveUri(imageUri)}
              />
            </View>
          ))}
          <AppImageInput onChangeUri={(uri) => onAddUri(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  aBox: {
    marginRight: 10,
  },
});
export default ImageInputList;
