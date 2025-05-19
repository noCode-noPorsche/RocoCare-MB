import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderShown from "../components/HeaderShown";
import { useState } from "react";

export default function SettingNotificationScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
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
