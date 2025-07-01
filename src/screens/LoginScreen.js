import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import GoogleSignIn from "../components/GoogleSignIn";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { AppContext } from "../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import authApi from "../apis/AuthApi";
import { setAccessTokenToLS } from "../utils/auth";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const { setProfile, setIsAuthenticated } = useContext(AppContext);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginAccountMutation = useMutation({
    mutationFn: (body) => authApi.login(body),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setAccessTokenToLS(data.data.data.token);
      setProfile(data?.data.data.userResponse);
      // Toast.show({
      //   title: "Xong rồi!",
      //   message: "",
      //   preset: "done", // hoặc "success", "error"
      // });
    },
    onError: (error) => {
      console.log("error", error?.response?.data);
      console.log("FULL ERROR >>>", JSON.stringify(error, null, 2));
    },
  });

  const handleLogin = () => {
    console.log(formData);
    loginAccountMutation.mutate(formData);
  };

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Xin Chào"} />
      <View style={styles.viewLogin}>
        <View style={styles.viewLoginInput}>
          <InputCustom
            placeholder="example@gmail.com"
            titleInput="Email"
            value={formData.userNameOrEmail}
            onChangeText={(value) => updateFormData("userNameOrEmail", value)}
          />
          <InputCustom
            placeholder="************"
            titleInput="Mật Khẩu"
            value={formData.password}
            onChangeText={(value) => updateFormData("password", value)}
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
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
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
