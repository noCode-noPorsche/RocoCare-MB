import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import RoboCareLogo from "../assets/robocare_blue.svg";
import { useNavigation } from "@react-navigation/native";
import GoogleLogo from "../assets/google.svg";
import { useAuth } from "../context/AuthContext";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
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
            onPress={() => login(true)}
          >
            <View style={styles.viewGoogleText}>
              <GoogleLogo width={20} height={20} />
              <Text style={styles.textButtonLogin}>Đăng nhập bằng Google</Text>
            </View>
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
  buttonLogin: {
    backgroundColor: "#CAD6FF",
    width: "60%",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  textButtonLogin: {
    color: "#2260FF",
    fontSize: 16,
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
  viewGoogleText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
});
