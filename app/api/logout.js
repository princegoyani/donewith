import auth from "./getAuthApp";
import { signOut } from "firebase/auth";

const logoutApi = async () => {
  let logoutResponse = {};
  return await signOut(auth)
    .then(() => {
      logoutResponse.ok = "Done";
      return logoutResponse;
    })
    .catch((error) => {
      logoutResponse.error = error;

      console.log("====================================");
      console.log("Server Error in logout");
      console.log("====================================");
      return logoutResponse;
    });
};

export default logoutApi;
