import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import Card from "../components/Card";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";

import colors from "../config/colors";

import routes from "../navigation/routes";

import listingApis from "../api/listings";
import useApi from "../hooks/useApi";
import { object } from "yup";

function ListingScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: listings,
    setData: setListings,
    error,
    loading,
    setLoading,
    request: loadListings,
  } = useApi(listingApis.getListings);

  const refresh = async () => {
    setRefreshing(true);
    console.log("referhing");
    await loadListings();
    setRefreshing(false);
  };

  const handleDelete = async (id, item) => {
    const result = await listingApis.deleteListings(id, item.images[0]);
    const newLisings = listings.filter(
      (object) => Object.keys(object)[0] !== id
    );
    setListings(newLisings);
    navigation.navigate(routes.LISTING);
    // navigation.goBack();
  };

  useEffect(() => {
    loadListings();
  }, []);

  useEffect(() => {
    if (route.params) {
      if (route.params.handleDelete) {
        console.log("deleting");
        handleDelete(
          route.params.handleDelete.itemId,
          route.params.handleDelete.item
        );
      }
    }
  }, [route]);

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Cannot Retrive data from server!</AppText>
            <AppButton title="Retry" handlePress={loadListings} />
          </>
        )}

        {listings && (
          <FlatList
            data={listings}
            keyExtractor={(item) => Object.keys(item).toString()}
            renderItem={({ item, index }) => {
              const id = Object.keys(item)[0];
              const product = item[id];
              return (
                <Card
                  title={product.title}
                  subTitle={"$ " + product.price}
                  imageUrl={product.images[0]}
                  thumbnailUrl={product.images[0]}
                  onPress={() => {
                    const object = {};
                    product.index = index;
                    object[id] = product;
                    navigation.navigate(routes.LISTING_DETAILS, object);
                  }}
                />
              );
            }}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default ListingScreen;
