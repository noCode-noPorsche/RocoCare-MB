import { StyleSheet } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Chính Sách Bảo Mật"} />
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({});
