import AsyncStorage from "@react-native-async-storage/async-storage";
import mitt from "mitt";

export const localStorageEventEmitter = mitt();

export const setAccessTokenToLS = async (access_token) => {
  try {
    await AsyncStorage.setItem("access_token", access_token);
  } catch (error) {
    console.error("Error setting access token:", error);
  }
};

export const clearLS = async () => {
  try {
    await AsyncStorage.multiRemove(["access_token", "profile"]);
    localStorageEventEmitter.emit("clearLS");
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
};

export const getAccessTokenFromLS = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    return token || "";
  } catch (error) {
    console.error("Error getting access token:", error);
    return "";
  }
};

export const getProfileFromLS = async () => {
  try {
    const result = await AsyncStorage.getItem("profile");
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
};

export const setProfileToLS = async (profile) => {
  try {
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
  } catch (error) {
    console.error("Error setting profile:", error);
  }
};
