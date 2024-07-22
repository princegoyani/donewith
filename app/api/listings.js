import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { isObject } from "formik";

import db from "./firestoneDatabase";
import storedImage from "./storeImage";

const getListings = async () => {
  const result = await getDocs(collection(db, "listings"));

  if (isObject(result)) {
    const listingsList = [];
    result.forEach(async (object) => {
      const listingObject = {};
      const listing = object.data();

      //console.log(listing);
      // await listing.images.forEach(async (imageId) => {
      //   await storedImage.getImage(imageId).then((url) => {
      //     //console.log("url", url);
      //     currentImageListingsUrls.push(url);
      //   });
      // .then(console.log(currentImageListingsUrls, "list"));
      //});
      // console.log(currentImageListingsUrls);

      //[{}]
      listingObject[object.id] = {
        ...listing,
      };
      listingsList.push(listingObject);
    });
    console.log(listingsList);
    return listingsList;
  }
  console.log(result);
  return result;
};

const addListings = async (listings, uploadProgress) => {
  const imageIdsList = [];

  try {
    await listings.images.forEach(async (image, index) => {
      const imageId = `${listings.user.email}${Date.now()}${index}`;
      imageIdsList.push(imageId);
      const imageFile = await fetch(image);
      const blob = await imageFile.blob();

      const imageResponse = storedImage.uploadImages(
        blob,
        imageId,
        uploadProgress,
        index,
        listings.images.length
      );

      if (imageResponse.error) return Error("image uploading error");

      //imageIdsList.push(imageId);
    });

    const result = await addDoc(collection(db, "listings"), {
      categoryId: listings.category.value,
      description: listings.description,
      price: listings.price,
      title: listings.title,
      images: imageIdsList,
      userby: listings.user,
    });
    return { ok: result };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const deleteListings = async (listingId, imageId) => {
  console.log(listingId);
  await storedImage.deleteImage(imageId);
  return await deleteDoc(doc(db, "listings", listingId));
};

export default { getListings, addListings, deleteListings };

// import client from "./client";

// const endPoint = "/listings";

// const getListings = (...args) => client.get(endPoint);

// const addListings = (listings, onUploadProgress) => {
//   const data = new FormData();
//   data.append("title", listings.title);
//   data.append("price", listings.price);
//   data.append("categoryId", listings.category.value);
//   data.append("description", listings.description);

//   listings.images.forEach((image, index) => {
//     data.append("images", {
//       name: "image" + index,
//       type: "image/jpeg",
//       uri: image,
//     });
//   });

//   // if (listings.location)
//   //   data.append("location", JSON.stringify(listings.location));

//   return client.post(endPoint, data, {
//     onUploadProgress: (progress) => {
//       onUploadProgress(progress.loaded / progress.total);
//     },
//   });
// };

// export default {
//   addListings,
//   getListings,
// };
