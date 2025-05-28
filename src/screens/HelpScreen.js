import { StyleSheet } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function HelpScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Trung Tâm Trợ Giúp"} />
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({});
