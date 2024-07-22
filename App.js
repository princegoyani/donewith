import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./app/auth/context";
import AppLoading from "expo-app-loading";

import OfflineNotice from "./app/components/OfflineNotice";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigation from "./app/navigation/AuthNavigation";
import navigationTheme from "./app/navigation/navigationTheme";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigator";

//import logger from "./app/utility/logger";
//
//logger.start();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const retoreUser = async () => {
    const user = await authStorage.getUser();
    setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={retoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigation />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
