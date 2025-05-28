import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import RoboCareLogo from "../assets/robocare_white.svg";

export default function WaitingScreen() {
  return (
    <SafeAreaViewCustom style={styles.container}>
      <View style={styles.viewLogo}>
        <RoboCareLogo width={500} height={500} />
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2260FF",
  },
  viewLogo: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
});
