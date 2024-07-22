import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import auth from "./getAuthApp";

const addName = async (user, name) => {
  return await updateProfile(user, {
    displayName: name,
  })
    .then((user) => console.log("Success name added", name))
    .catch((error) => {
      console.log(error, "in adding name");
    });
};

const register = async ({ name, email, password }) => {
  console.log(name, email, password);
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      await addName(user, name);
      console.log(user);
      return user;
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      return { error: { errorMessage, errorCode } };
    });
};

export default { register };
// const imageRef = await firebase.ref(await firebase.getStorage(app), "image1");
// console.log(imageRef, 2);
// return await firebase.uploadBytes(imageRef, file);

// import client from "./client";

// const register = (userInfo) => {
//   return client.post("/users", userInfo);
// };

// export default {
//   register,
// };
