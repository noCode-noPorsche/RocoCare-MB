import { StyleSheet } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function EmergencySettingScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Cuộc Gọi Khẩn Cấp"} />
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({});
