import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import { WebView } from "react-native-webview";
import { useMutation } from "@tanstack/react-query";
import { AppContext } from "../context/AppContext";
import CallEmergencyIcon from "../assets/emergency_call.svg";
import robotApi from "../apis/RobotApi";
import Toast from "react-native-toast-message";

export default function RobotScreen() {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { profile, emergencyContacts } = useContext(AppContext);

  const callRobotMutation = useMutation({
    mutationFn: (body) => robotApi.controlRobot(body),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Lệnh đã được gửi tới robot!",
      });
    },
  });

  const handleControlRobot = (direction, isCall = false) => {
    let command = direction;

    if (isCall) {
      // Nếu là gọi khẩn cấp thì thêm CALL
      command = `CALL ${direction}`;
    }
    console.log("nice", emergencyContacts.phoneNumber1);

    console.log(`Gửi command tới robot: ${command}`);

    callRobotMutation.mutate({
      deviceSerial: profile.deviceToken,
      command: command,
    });
  };

  const showConfirmAlert = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn thực hiện hành động này?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Đã hủy"),
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            handleControlRobot(emergencyContacts.phoneNumber1, true);
          },
        },
      ],
      { cancelable: true }
    );
  };

  // const showConfirmAlertCall = () => {
  //   Alert.alert(
  //     "Xác nhận gọi khẩn cấp",
  //     "Bạn có chắc chắn muốn gọi đến số khẩn cấp?",
  //     [
  //       {
  //         text: "Hủy",
  //         onPress: () => console.log("Đã hủy cuộc gọi"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Gọi ngay",
  //         onPress: () => {
  //           callRobotMutation.mutate({
  //             deviceSerial: profile.deviceToken,
  //             command: `CALL ${emergencyContacts.phoneNumber1}`,
  //           });
  //           // const emergencyNumber = emergencyContacts.phoneNumber1; // Thay đổi theo nhu cầu
  //           // Linking.openURL(`tel:${emergencyNumber}`);
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Màn hình tương tác RoboCare"} />
      <View style={styles.container}>
        {hasError ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              Hiện không có robot nào hoạt động
            </Text>
          </View>
        ) : (
          <>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={{ position: "absolute", top: "50%", left: "50%" }}
              />
            )}
            <WebView
              source={{ uri: "http://1.54.222.139:9000/video_feed" }}
              onLoadStart={() => setLoading(true)}
              onLoad={() => setLoading(false)} // sẽ chạy ngay khi bắt đầu render frame
              onError={() => setLoading(false)} // phòng khi lỗi
            />
          </>
        )}
        {/* Nút điều khiển */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.controlButton, styles.up]}
            onPress={() => handleControlRobot("F")}
          >
            <Text style={styles.controlText}>↑</Text>
          </TouchableOpacity>

          <View style={styles.middleRow}>
            <TouchableOpacity
              style={[styles.controlButton, styles.left]}
              onPress={() => handleControlRobot("L")}
            >
              <Text style={styles.controlText}>←</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.right]}
              onPress={() => handleControlRobot("R")}
            >
              <Text style={styles.controlText}>→</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.controlButton, styles.down]}
            onPress={() => handleControlRobot("B")}
          >
            <Text style={styles.controlText}>↓</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          showConfirmAlert();
        }}
      >
        <Text style={styles.floatingButtonText}>
          <CallEmergencyIcon
            onPress={showConfirmAlert}
            width={30}
            height={30}
          />
        </Text>
      </TouchableOpacity>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "gray",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    alignItems: "center",
  },
  middleRow: {
    flexDirection: "row",
    marginVertical: 5,
    gap: 30,
  },
  controlButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    margin: 5,
    elevation: 3,
  },
  controlText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    zIndex: 999,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
});
