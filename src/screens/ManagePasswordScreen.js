import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function ManagePasswordScreen() {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Quản Lý Mật Khẩu"} />
      <View style={styles.viewMangePassword}>
        <View style={styles.viewMangeInputPassword}>
          <InputCustom
            placeholder="************"
            titleInput="Mật Khẩu Hiện Tại"
            secureTextEntry={!isVisible}
            value={password}
            onChangeText={setPassword}
            icon={
              <Ionicons
                name={isVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666"
              />
            }
            onPressIconShowPassword={() => setIsVisible(!isVisible)}
          />
          <Text style={styles.textForgotPassword}>Quên Mật Khẩu?</Text>
          <InputCustom
            placeholder="************"
            titleInput="Mật Khẩu Mới"
            secureTextEntry={!isVisible}
            value={password}
            onChangeText={setPassword}
            icon={
              <Ionicons
                name={isVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666"
              />
            }
            onPressIconShowPassword={() => setIsVisible(!isVisible)}
          />
          <InputCustom
            placeholder="************"
            titleInput="Xác Nhận Mật Khẩu Mới"
            secureTextEntry={!isVisible}
            value={password}
            onChangeText={setPassword}
            icon={
              <Ionicons
                name={isVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666"
              />
            }
            onPressIconShowPassword={() => setIsVisible(!isVisible)}
          />
        </View>
        <View style={styles.viewChangePassword}>
          <TouchableOpacity style={styles.buttonChangePassword}>
            <Text style={styles.textChangePassword}>Thay Đổi Mật Khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewMangePassword: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  viewMangeInputPassword: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  viewChangePassword: {},
  buttonChangePassword: {
    backgroundColor: "#2260FF",
    padding: 20,
    margin: 20,
    borderRadius: 36,
    marginBottom: 40,
  },
  textChangePassword: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  textForgotPassword: {
    color: "#2260FF",
    textAlign: "right",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
  },
});
