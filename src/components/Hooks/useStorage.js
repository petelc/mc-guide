import { useState, useEffect } from "react";

// ? Attempting to get the storage reference from firebase
import { storage } from "../../firebase/firebase";

export const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const fileType = file.type;
      console.log(storage);
      let storageRef = storage.ref(file.name);
      if (
        fileType === "image/png" ||
        fileType === "image/jpeg" ||
        fileType === "image/jpg"
      ) {
        storageRef = storage.ref("images/" + file.name);
      }

      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          //   track upload progress
          let percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          //   get the public download url
          const downloadURL = await storageRef.getDownloadURL();
          setUrl(downloadURL);
        }
      );
    }
  }, [file]);

  return { progress, url, error };
};
