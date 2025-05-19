import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderShown from "../components/HeaderShown";

export default function EmergencySettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderShown HeaderName={"Cuộc Gọi Khẩn Cấp"} />
    </SafeAreaView>
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
