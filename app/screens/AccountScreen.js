import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";
import Screen from "../components/Screen";

import colors from "../config/colors";
import routes from "../navigation/routes";

import logoutApi from "../api/logout";

const listingItem = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primaryColor,
    },
    targetScreen: routes.MYLISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondaryColor,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/prince.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={listingItem}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={() => <ListItemSeperator />}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              renderRightActions={false}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title={"LogOut"}
          IconComponent={<Icon name={"logout"} backgroundColor={"#ffe66d"} />}
          onPress={async () => {
            const result = await logoutApi();
            console.log("====================================");
            console.log(result);
            console.log("====================================");
            if (!result.ok) return result;
            logOut();
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
