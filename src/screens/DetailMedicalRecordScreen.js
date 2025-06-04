import React from "react";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import { Text, View } from "react-native";

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
