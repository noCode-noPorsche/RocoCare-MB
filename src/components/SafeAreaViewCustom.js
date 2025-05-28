import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaViewCustom({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
});
