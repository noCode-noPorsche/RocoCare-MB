import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderShown from "../components/HeaderShown";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ManagePasswordScreen() {
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderShown HeaderName={"Quản Lý Mật Khẩu"} />
      <View style={styles.viewMangePassword}>
        <View style={styles.viewMangeInputPassword}>
          <View style={styles.viewPassword}>
            <Text style={styles.textInputPassword}>Mật Khẩu Hiện Tại</Text>
            <View style={styles.viewInputPassword}>
              <TextInput
                placeholder="************"
                secureTextEntry={!isVisible}
                value={password}
                onChangeText={setPassword}
                style={styles.inputPassword}
              />
              <TouchableOpacity
                style={styles.iconShowPassword}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Ionicons
                  name={isVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.textForgotPassword}>Quên Mật Khẩu?</Text>
          </View>
          <View style={styles.viewPassword}>
            <Text style={styles.textInputPassword}>Mật Khẩu Mới</Text>
            <View style={styles.viewInputPassword}>
              <TextInput
                placeholder="************"
                secureTextEntry={!isVisible}
                value={password}
                onChangeText={setPassword}
                style={styles.inputPassword}
              />
              <TouchableOpacity
                style={styles.iconShowPassword}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Ionicons
                  name={isVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewPassword}>
            <Text style={styles.textInputPassword}>
              Xác Nhận Lại Mật Khẩu Mới
            </Text>
            <View style={styles.viewInputPassword}>
              <TextInput
                placeholder="************"
                secureTextEntry={!isVisible}
                value={password}
                onChangeText={setPassword}
                style={styles.inputPassword}
              />
              <TouchableOpacity
                style={styles.iconShowPassword}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Ionicons
                  name={isVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewChangePassword}>
          <TouchableOpacity style={styles.buttonChangePassword}>
            <Text style={styles.textChangePassword}>Thay Đổi Mật Khẩu</Text>
          </TouchableOpacity>
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
  viewPassword: {
    display: "flex",
    gap: 6,
  },
  viewInputPassword: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  textInputPassword: {
    fontSize: 18,
    fontWeight: "500",
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#ECF1FF",
    padding: 12,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 40, // chừa chỗ cho icon
    fontSize: 16,
    width: "100%",
  },
  iconShowPassword: {
    position: "absolute",
    right: 12,
    top: "40%",
    transform: [{ translateY: -10 }],
    padding: 4,
  },
  viewChangePassword: {},
  buttonChangePassword: {
    backgroundColor: "#2260FF",
    padding: 20,
    margin: 20,
    borderRadius: 36,
  },
  textChangePassword: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  textForgotPassword: {
    color: "#2260FF",
    textAlign: "right",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
  },
});
