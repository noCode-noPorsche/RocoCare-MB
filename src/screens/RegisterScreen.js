import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import GoogleSignIn from "../components/GoogleSignIn";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Tạo Tài Khoản"} />
      <InputCustom placeholder="Họ Tên" titleInput="Họ Tên" />
      <InputCustom placeholder="example@gmail.com" titleInput="Email" />
      <InputCustom placeholder="0909090909" titleInput="Số Điện Thoại" />
      <InputCustom
        placeholder="************"
        titleInput="Mật Khẩu"
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
        titleInput="Nhập Lại Mật Khẩu"
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
      <InputCustom placeholder="DD/MM/YYYY" titleInput="Ngày sinh" />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
          color="#2260FF"
        />
        <Text style={styles.labelText}>
          Để tiếp tục, bạn cần đồng ý với{" "}
          <Text style={styles.textCheckbox}>Điều khoản sử dụng</Text> và{" "}
          <Text style={styles.textCheckbox}>Chính sách bảo mật</Text> của ứng
          dụng RoboCare.
        </Text>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.textButtonRegister}>Đăng Ký</Text>
        </TouchableOpacity>
        <Text style={styles.textOr}>hoặc đăng ký với</Text>
        <GoogleSignIn />
      </View>
      <Text style={styles.textRegister}>
        Bạn đã có tài khoản?{" "}
        <Text
          style={styles.textRegisterLink}
          onPress={() => navigation.navigate("Login")}
        >
          Đăng nhập
        </Text>
      </Text>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  labelText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  textCheckbox: {
    fontWeight: "bold",
    color: "#2260FF",
  },
  viewButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  buttonRegister: {
    backgroundColor: "#2260FF",
    padding: 16,
    borderRadius: 36,
    width: "65%",
  },
  textButtonRegister: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  textOr: {
    fontSize: 12,
    fontWeight: "semibold",
    textAlign: "center",
  },
  textRegister: {
    textAlign: "center",
  },
  textRegisterLink: {
    color: "#2260FF",
  },
});
