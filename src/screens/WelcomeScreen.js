import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RoboCareLogo from "../assets/robocare_blue.svg";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaViewCustom>
      <View style={styles.viewWelcome}>
        <View style={styles.viewLogo}>
          <RoboCareLogo width={500} height={500} />
        </View>
        <View style={styles.viewButton}>
          <Text style={styles.textSlogan}>
            "Ở bên bạn, hơn cả một người bạn"
          </Text>
          <Text style={styles.textSlogan}>RoboCare</Text>

          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textButtonLogin}>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.textButtonRegister}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewWelcome: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  viewLogo: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 180,
  },
  viewButton: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  // buttonLogin: {
  //   backgroundColor: "#CAD6FF",
  //   width: "60%",
  //   height: 50,
  //   paddingHorizontal: 20,
  //   borderRadius: 30,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 10,
  // },
  buttonLogin: {
    backgroundColor: "#2260FF",
    padding: 10,
    borderRadius: 30,
    width: "50%",
  },
  buttonRegister: {
    backgroundColor: "#CAD6FF",
    padding: 10,
    borderRadius: 30,
    width: "50%",
  },
  textButtonLogin: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textButtonRegister: {
    color: "#2260FF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSlogan: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
    color: "#1C253D",
    fontStyle: "italic",
  },
});
