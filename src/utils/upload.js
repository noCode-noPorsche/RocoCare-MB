import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFile = async (uri, fileName) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, fileName);
  const snapshot = await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export default uploadFile;
