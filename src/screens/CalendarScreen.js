import { StyleSheet, Text } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";

export default function CalendarScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Lịch Trình"} iconBack={false} />
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({});
