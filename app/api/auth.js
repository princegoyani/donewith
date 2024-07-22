import { signInWithEmailAndPassword } from "firebase/auth";

import auth from "./getAuthApp";

const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      //console.log(user.stsTokenManager.accessTOk);
      //
      // ...
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      //const errors = { ...errorMessage };
      return { error: errorCode };
    });
};

export default { login };

// import client from "./client";

// const login = (email, password) => {
//   return client.post("/auth", { email, password });
// };

// export default {
//   login,
// };
