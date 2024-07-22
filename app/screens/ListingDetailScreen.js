import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import ContactSellerForm from "../components/ContactSellerForm";
import colors from "../config/colors";

import imageStore from "../api/storeImage";
import useAuth from "../auth/useAuth";
import DeleteListing from "../components/DeleteListing";

import ActivityIndicator from "../components/ActivityIndicator";
import { async } from "@firebase/util";
import routes from "../navigation/routes";

function ListingDetailScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const itemObject = route.params;
  const itemId = Object.keys(itemObject)[0];
  const item = itemObject[itemId];

  const width = Dimensions.get("window").width;
  const height = (width * 100) / 80;

  const [imageUrl, setImageUrl] = useState();
  const [arrayImageUrl, setArrayImageUrl] = useState([]);

  const getUrls = async (items) => {
    const arrayImageUrl = [];
    items.images.forEach(async (image, index) => {
      console.log(index);
      arrayImageUrl.push(await imageStore.getImage(image));

      console.log(arrayImageUrl, " array");
    });

    return arrayImageUrl;
  };

  const getImageUrl = async () => {
    const response = await imageStore.getImage(item.images[0]);
    setImageUrl([response]);
  };

  useEffect(() => getImageUrl(), []);

  return (
    <>
      <ScrollView
        pagingEnabled
        horizontal
        style={{
          width,
          height,
        }}
        bounces={false}
      >
        {/* {loading && <ActivityIndicator visible={loading} />} */}

        {imageUrl && (
          <Image
            uri={imageUrl}
            // preview={{ uri: url }}
            //tint="light"
            style={{
              width,
              height,
              resizeMode: "center",
            }}
          />
        )}
      </ScrollView>
      {/* <FlatList
          horizontal={false}
          data={imageUrl}
          keyExtractor={(image) => image.url.toString()}
          renderItem={({ item }) => {
            const url = item.url;
            console.log(url, " flat");
            return (
              <Image
                uri={{ url }}
                preview={{ uri: url }}
                //tint="light"
                style={{
                  width,
                  height,
                  resizeMode: "cover",
                  backgroundColor: "yellow",
                }}
              />
            );
          }}
        /> */}

      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
          <View style={styles.detailText}>
            <AppText style={styles.title}>{item.title}</AppText>
            <AppText style={styles.price}>${item.price}</AppText>
            <View style={styles.userContainer}>
              <ListItem
                //image={require("../assets/mosh.jpg")}
                title={item.userby.name}
                subTitle={item.userby.email}
              />
            </View>
            {user.email === item.userby.email ? (
              <>
                <DeleteListing
                  handleDelete={() => {
                    navigation.navigate(routes.LISTING, {
                      handleDelete: { itemId, item },
                    });
                  }}
                />
              </>
            ) : (
              <ContactSellerForm listing={item} user={user} />
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailText: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondaryColor,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailScreen;
