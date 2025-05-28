import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowRightIcon from "../assets/arrow_right";
import CallIcon from "../assets/call.svg";
import KeyIcon from "../assets/key.svg";
import LightIcon from "../assets/light.svg";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function SettingScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Cài Đặt"} />
      <View style={styles.viewButtonProfile}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingNotification")}
          style={styles.buttonSetting}
        >
          <View style={styles.iconButton}>
            <LightIcon width={20} height={20} />
          </View>
          <Text style={styles.textFeature}>Cài Đặt Thông Báo</Text>
          <ArrowRightIcon width={14} height={14} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ManagePassword")}
          style={styles.buttonSetting}
        >
          <View style={styles.iconButton}>
            <KeyIcon width={20} height={20} />
          </View>
          <Text style={styles.textFeature}>Quản Lý Mật Khẩu</Text>
          <ArrowRightIcon width={14} height={14} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EmergencySetting")}
          style={styles.buttonSetting}
        >
          <View style={styles.iconButton}>
            <CallIcon width={20} height={20} />
          </View>
          <Text style={styles.textFeature}>Thiết Lập Khẩn Cấp</Text>
          <ArrowRightIcon width={14} height={14} />
        </TouchableOpacity>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewButtonProfile: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "#CAD6FF",
    borderRadius: 100,
    width: 30,
    height: 30,
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSetting: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // elevation: 2, // Android shadow
    // shadowColor: "#000", // iOS shadow
  },
  textFeature: {
    fontSize: 16,
    fontWeight: "semibold",
  },
});
