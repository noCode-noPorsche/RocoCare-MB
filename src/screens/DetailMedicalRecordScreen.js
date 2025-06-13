import { Text, View } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function DetailMedicalRecordScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Thông Tin Chi Tiết"} />
      <View>
        <Text>Thông Tin Chi Tiết</Text>
      </View>
    </SafeAreaViewCustom>
  );
}
