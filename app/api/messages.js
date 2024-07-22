import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { isObject } from "formik";

import db from "./firestoneDatabase";

const getMessages = async (user) => {
  const result = await getDocs(collection(db, "messages"));

  if (isObject(result)) {
    const messagesList = [];
    result.forEach((object) => {
      const messageObject = {};
      const message = object.data();

      if (message.to.email === user.email) {
        messageObject[object.id] = message;
        messagesList.push(messageObject);
      }
    });

    return messagesList;
  }

  return result;
};

const sendMessage = async (user, to, message, reply = null) => {
  console.log(user, to, message);

  const fromObject = { email: user.email, name: user.name };
  const toObject = { email: to.email, name: to.name };

  const object = {
    from: fromObject,
    message: message,
    to: toObject,
  };
  if (reply != null) {
    object["reply"] = reply;
  }

  return await addDoc(collection(db, "messages"), object)
    .then((id) => {
      return { ok: id };
    })
    .catch((error) => {
      return error;
    });
};

const deleteMesseage = async (messageId) => {
  return await deleteDoc(doc(db, "messages", messageId));
};

export default { getMessages, sendMessage, deleteMesseage };

// import client from "./client";

// const send = (message, listingId) => {
//   return client.post("/messages", {
//     message,
//     listingId,
//   });
// };

// export default {
//   send,
// };
