import { Text, TouchableOpacity, View } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { StyleSheet } from "react-native";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChangePasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Đổi Mật Khẩu"} />
      <View style={styles.viewChangePassword}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <InputCustom
          placeholder="************"
          titleInput="Mật Khẩu Mới"
          secureTextEntry={!showPassword}
          icon={
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#666"
            />
          }
          onPressIconShowPassword={toggleShowPassword}
        />
        <InputCustom
          placeholder="************"
          titleInput="Nhập Lại Mật Khẩu Mới"
          secureTextEntry={!showPassword}
          icon={
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#666"
            />
          }
          onPressIconShowPassword={toggleShowPassword}
        />
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.buttonChangePassword}>
            <Text style={styles.textButtonChangePassword}>Lưu Thay Đổi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewChangePassword: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    paddingVertical: 16,
  },
  viewButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  buttonChangePassword: {
    backgroundColor: "#2260FF",
    padding: 16,
    borderRadius: 36,
    width: "60%",
  },
  textButtonChangePassword: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
