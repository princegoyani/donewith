import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";

import listingApis from "../api/listings";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

import routes from "../navigation/routes";
import { object } from "yup";

function MyListings({ navigation }) {
  const [userListings, setUserListings] = useState([]);
  const { user } = useAuth();
  const [markLoading, setMarkLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const setListings = async () => {
    setMarkLoading(true);
    const listings = await listingApis.getListings();

    const userListing = {};
    listings.forEach((listing) => {
      const listingId = Object.keys(listing)[0];
      const listingData = listing[listingId];
      console.log(listingData.userby, "user");
      if (listingData.userby.email === user.email) {
        console.log("true");
        userListing[listingId] = listingData;
      }
    });
    console.log(Object.keys(userListing));
    setUserListings(userListing);

    setMarkLoading(false);
  };

  const onRefresh = () => {
    setListings();
  };

  useEffect(() => {
    setListings();
    // setUserListings(listings);
  }, []);
  return (
    <>
      <ActivityIndicator visible={markLoading} />
      {userListings && (
        <Screen>
          <FlatList
            data={Object.keys(userListings)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <ListItem
                title={userListings[item].title}
                subTitle={"$ " + userListings[item].price}
                onPress={() => {
                  const object = { item: userListings[item] };
                  navigation.navigate(routes.LISTING_DETAILS, object);
                }}
              />
            )}
            ItemSeparatorComponent={ListItemSeperator}
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});

export default MyListings;
