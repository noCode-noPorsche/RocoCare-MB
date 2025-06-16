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

  const buttonItems = [
    {
      label: "Cài Đặt Thông Báo",
      icon: LightIcon,
      onPress: () => navigation.navigate("SettingNotification"),
    },
    {
      label: "Quản Lý Mật Khẩu",
      icon: KeyIcon,
      onPress: () => navigation.navigate("ManagePassword"),
    },
    {
      label: "Thiết Lập Khẩn Cấp",
      icon: LightIcon,
      onPress: () => navigation.navigate("EmergencySetting"),
    },
  ];
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Cài Đặt"} />
      <View style={styles.viewButtonProfile}>
        {buttonItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={index}
              style={styles.buttonProfile}
              onPress={item.onPress}
            >
              <View style={styles.iconButtonText}>
                <View style={styles.iconButton}>
                  <IconComponent width={24} height={24} />
                </View>
                <Text style={styles.textFeature}>{item.label}</Text>
              </View>

              <ArrowRightIcon width={14} height={14} />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewButtonProfile: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  iconButton: {
    backgroundColor: "#CAD6FF",
    borderRadius: 100,
    width: 30,
    height: 30,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFeature: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },
  buttonProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // elevation: 2, // Android shadow
    // shadowColor: "#000", // iOS shadow
  },
  iconButtonText: {
    display: "flex",
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
