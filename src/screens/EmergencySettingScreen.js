import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import emergencyCallApi from "../apis/EmergencyCallApi";
import Toast from "react-native-toast-message";
import { AppContext } from "../context/AppContext";

export default function EmergencySettingScreen() {
  const { setEmergencyContacts } = useContext(AppContext);

  const { data: emergencyCallData } = useQuery({
    queryKey: ["emergency-call"],
    queryFn: () => emergencyCallApi.getEmergencyCall(),
  });

  console.log(emergencyCallData?.data.data, "ne");
  const [formData, setFormData] = useState({
    phoneNumber1: "",
    fullName1: "",
    phoneNumber2: "",
    fullName2: "",
  });

  useEffect(() => {
    if (emergencyCallData?.data?.data) {
      const data = emergencyCallData.data.data;
      setFormData({
        fullName1: data.fullName1 || "",
        phoneNumber1: data.phoneNumber1 || "",
        fullName2: data.fullName2 || "",
        phoneNumber2: data.phoneNumber2 || "",
      });
    }
  }, [emergencyCallData]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateEmergencyCall = useMutation({
    mutationFn: (body) => emergencyCallApi.updateEmergencyCall(body),
  });

  const handleSubmit = () => {
    updateEmergencyCall.mutate(formData, {
      onSuccess: () => {
        setEmergencyContacts({
          phoneNumber1: formData.phoneNumber1,
          phoneNumber2: formData.phoneNumber2,
        });
        Toast.show({
          type: "success",
          text1: "Thành công!",
          text2: "Thiết lập thông tin thành công!",
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Thất bại!",
          text2: "Thiết lập thông tin thất bại!",
        });
      },
    });
  };

  return (
    <SafeAreaViewCustom style={styles.container}>
      <HeaderShown HeaderName={"Cuộc Gọi Khẩn Cấp"} />
      <View style={styles.viewEmergencySetting}>
        <View style={styles.viewEmergencySettingContent}>
          <View style={styles.viewInformationEmergencySetting}>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textEmergencySetting}>
                Thông tin người thân 1
              </Text>
              <Text style={styles.textInputProfile}>Họ Tên</Text>
              <View style={styles.viewInputProfile}>
                <TextInput
                  value={formData.fullName1}
                  onChangeText={(text) => updateFormData("fullName1", text)}
                  placeholder=""
                  style={styles.inputPassword}
                />
              </View>
            </View>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textInputProfile}>Số Điện Thoại</Text>
              <View style={styles.viewInputProfile}>
                <TextInput
                  value={formData.phoneNumber1}
                  onChangeText={(text) => updateFormData("phoneNumber1", text)}
                  placeholder=""
                  style={styles.inputPassword}
                />
              </View>
            </View>
          </View>
          <View style={styles.viewInformationEmergencySetting}>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textEmergencySetting}>
                Thông tin người thân 2
              </Text>
              <Text style={styles.textInputProfile}>Họ Tên</Text>
              <View style={styles.viewInputProfile}>
                <TextInput
                  value={formData.fullName2}
                  onChangeText={(text) => updateFormData("fullName2", text)}
                  placeholder=""
                  style={styles.inputPassword}
                />
              </View>
            </View>
            <View style={styles.viewInputEmergencySetting}>
              <Text style={styles.textInputProfile}>Số Điện Thoại</Text>
              <View style={styles.viewInputProfile}>
                <TextInput
                  value={formData.phoneNumber2}
                  onChangeText={(text) => updateFormData("phoneNumber2", text)}
                  placeholder=""
                  style={styles.inputPassword}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewButtonSaveEmergencySetting}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.buttonSaveEmergencySetting}
          >
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
