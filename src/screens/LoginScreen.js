import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import GoogleSignIn from "../components/GoogleSignIn";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { AppContext } from "../context/AppContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  // const { isAuthenticated } = useContext(AppContext);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Xin Chào"} />
      <View style={styles.viewLogin}>
        <View style={styles.viewLoginInput}>
          <InputCustom placeholder="example@gmail.com" titleInput="Email" />
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
          <Text
            onPress={() => navigation.navigate("ChangePassword")}
            style={styles.textForgotPassword}
          >
            Quên Mật Khẩu?
          </Text>
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.buttonLogin}
            // onPress={() => login(true)}
          >
            <Text style={styles.textButtonLogin}>Đăng Nhập</Text>
          </TouchableOpacity>
          <Text style={styles.textOr}>hoặc</Text>
          <GoogleSignIn />
          <Text style={styles.textRegister}>
            Bạn chưa có tài khoản?{" "}
            <Text
              style={styles.textRegisterLink}
              onPress={() => navigation.navigate("Register")}
            >
              Đăng ký
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewLogin: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    paddingTop: 100,
    height: "100%",
    gap: 30,
  },
  viewLoginInput: {
    display: "flex",
    flexDirection: "column",
    // flex: 1,
    width: "100%",
    gap: 12,
  },
  textForgotPassword: {
    color: "#2260FF",
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // flex: 1,
    width: "100%",
    gap: 12,
  },
  textOr: {
    fontSize: 12,
    fontWeight: "semibold",
    textAlign: "center",
  },
  buttonLogin: {
    backgroundColor: "#2260FF",
    padding: 16,
    borderRadius: 36,
    width: "65%",
  },
  textButtonLogin: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textRegister: {
    fontSize: 12,
    fontWeight: "semibold",
    textAlign: "center",
  },
  textRegisterLink: {
    color: "#2260FF",
    textAlign: "center",
    fontSize: 12,
    // textDecorationLine: "underline",
  },
});
