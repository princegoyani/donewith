import * as SecureStorage from "expo-secure-store";
import jwtDecode from "jwt-decode";
//import logger from "../utility/logger";
const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStorage.setItemAsync(key, authToken);
  } catch (error) {
    //logger.log("Error in storing user in securestore", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStorage.getItemAsync(key);
  } catch (error) {
    //logger.log("Error in getting user from securestore", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removetoken = async () => {
  try {
    await SecureStorage.deleteItemAsync(key);
  } catch (error) {
    //logger.log("Error in deleting user from securestore", error);
  }
};

export default {
  storeToken,
  getUser,
  removetoken,
  getToken,
};
