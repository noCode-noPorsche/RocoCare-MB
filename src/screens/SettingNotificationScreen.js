import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function SettingNotificationScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Cài Đặt Thông Báo"} />
      <View>
        <View style={styles.viewSwitch}>
          <Text style={styles.textSwitch}>Thông Báo Chung</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#2260FF" }}
            thumbColor={isEnabled ? "#fff" : "#2260FF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.viewSwitch}>
          <Text style={styles.textSwitch}>Âm Thanh</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#2260FF" }}
            thumbColor={isEnabled ? "#fff" : "#2260FF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.viewSwitch}>
          <Text style={styles.textSwitch}>Âm Thanh Cuộc Gọi</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#2260FF" }}
            thumbColor={isEnabled ? "#fff" : "#2260FF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewSwitch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSwitch: {
    fontSize: 16,
    fontWeight: "500",
  },
});
