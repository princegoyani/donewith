import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";
import MyListings from "../screens/MyListings";
import ReplyScreen from "../screens/ReplyScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Messages" component={MessageScreen} />
      <Stack.Screen
        name="Reply"
        component={ReplyScreen}
        options={{
          presentation: "modal",
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
            borderRadius: 10,
          },
          borderBottomWidth: 0,
          headerShown: false,
        }}
      />
      <Stack.Screen name="MyListings" component={MyListings} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
