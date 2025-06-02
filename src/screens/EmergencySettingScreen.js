import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function EmergencySettingScreen() {
  return (
    <SafeAreaViewCustom style={styles.container}>
      <HeaderShown HeaderName={"Cuộc Gọi Khẩn Cấp"} />
      <View style={styles.viewEmergencySetting}>
        <View style={styles.viewEmergencySettingContent}>
          <View style={styles.viewInformationEmergencySetting}>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textEmergencySetting}>
                Thông tin người thân
              </Text>
              <Text style={styles.textInputProfile}>Họ Tên</Text>
              <View style={styles.viewInputProfile}>
                <TextInput placeholder="" style={styles.inputPassword} />
              </View>
            </View>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textInputProfile}>Số Điện Thoại</Text>
              <View style={styles.viewInputProfile}>
                <TextInput placeholder="" style={styles.inputPassword} />
              </View>
            </View>
          </View>
          <View style={styles.viewInformationEmergencySetting}>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textEmergencySetting}>
                Thông tin trung tâm y tế
              </Text>
              <Text style={styles.textInputProfile}>Họ Tên</Text>
              <View style={styles.viewInputProfile}>
                <TextInput placeholder="" style={styles.inputPassword} />
              </View>
            </View>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textInputProfile}>Số Điện Thoại</Text>
              <View style={styles.viewInputProfile}>
                <TextInput placeholder="" style={styles.inputPassword} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewButtonSaveEmergencySetting}>
          <TouchableOpacity style={styles.buttonSaveEmergencySetting}>
            <Text style={styles.textSaveEmergencySetting}>Lưu Thông Tin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewEmergencySetting: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 50,
  },
  viewEmergencySettingContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 50,
  },
  viewInformationEmergencySetting: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  textEmergencySetting: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  textInputProfile: {
    fontSize: 18,
    fontWeight: "500",
  },
  viewInputProfile: {
    display: "flex",
    flexDirection: "row",
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#ECF1FF",
    padding: 12,
    borderRadius: 12,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 16,
    width: "100%",
  },
  viewInputEmergencySetting: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  viewButtonSaveEmergencySetting: {},
  buttonSaveEmergencySetting: {
    backgroundColor: "#2260FF",
    padding: 15,
    margin: 20,
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 36,
  },
  textSaveEmergencySetting: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
  },
});
