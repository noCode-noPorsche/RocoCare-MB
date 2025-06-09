import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from "@react-native-firebase/auth";
import GoogleLogo from "../assets/google.svg";
import authApi from "../apis/AuthApi";
import { AppContext } from "../context/AppContext";
import { useMutation } from "@tanstack/react-query";

export default function GoogleSignIn() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  GoogleSignin.configure({
    webClientId:
      "541732867997-0eaai7ke94ii8kiplgmlvna1qpkgm2f6.apps.googleusercontent.com",
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: (idToken) => authApi.loginWithGoogle(idToken),
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();

      idToken = signInResult.data?.idToken;
      if (!idToken) {
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error("No ID token found");
      }

      const googleCredential = GoogleAuthProvider.credential(
        signInResult.data.idToken
      );
      const userCredential = await signInWithCredential(
        getAuth(),
        googleCredential
      );
      const firebaseIdToken = await userCredential.user.getIdToken();
      console.log(firebaseIdToken);
      loginWithGoogleMutation.mutate(firebaseIdToken, {
        onSuccess: (data) => {
          setIsAuthenticated(true);
          setProfile(data.data.data.userResponse);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      // return signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <TouchableOpacity style={styles.buttonLoginGoogle} onPress={signIn}>
      <View style={styles.viewGoogleText}>
        <GoogleLogo width={20} height={20} />
        <Text style={styles.textButtonLoginGoogle}>Đăng nhập bằng Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonLoginGoogle: {
    backgroundColor: "#CAD6FF",
    padding: 14,
    borderRadius: 30,
    // width: "100%",
  },
  viewGoogleText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  textButtonLoginGoogle: {
    color: "#2260FF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
