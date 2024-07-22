import * as firebase from "firebase/storage";
//const listingImagesRef = ref(storageRef, "listingsImages");

const uploadImages = (file, imageId, uploadProgress) => {
  const ref = firebase.ref(firebase.getStorage(), `listingsImages/${imageId}`);

  firebase.uploadBytesResumable(ref, file).on(
    "state_changed",
    (snapshot) => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      console.log("Upload is " + progress * 100 + "% done");
      uploadProgress(progress);
    },
    (error) => {
      console.log(error);
      return { error };
    },
    () => {
      return { ok: "uploaded" };
    }
  );
  // .then((photo) => {
  //   //console.log("upload", photo);
  //   console.log("uploaded");
  //   return photo;
  // })
  // .catch((error) => {
  //   console.log(error);
  //   return { error: error };
  // });
};

const getImage = async (imageId) => {
  const response = await firebase.getDownloadURL(
    firebase.ref(firebase.getStorage(), `listingsImages/${imageId}`)
  );
  console.log(response);
  return response;

  // console.log("got image", response);

  // return response;
  // `url` is the download URL for 'images/stars.jpg'
  //
  // This can be downloaded directly:
  // const xhr = new XMLHttpRequest();
  // xhr.responseType = "blob";
  // xhr.onload = (event) => {
  //   const blob = xhr.response;
  // };
  // xhr.open("GET", url);
  // xhr.send();
  // })
  // .catch((error) => {
  //   // Handle any errors
  //   console.log(error);
  //   return error;
  // });
};

const deleteImage = async (imageId) => {
  // Create a reference to the file to delete
  const desertRef = firebase.ref(
    firebase.getStorage(),
    `listingsImages/${imageId}`
  );

  return await firebase
    .deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("deleted");
      return { ok: "deleted" };
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      return { error };
    });
};

export default { uploadImages, getImage, deleteImage };
