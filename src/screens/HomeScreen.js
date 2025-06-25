import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import BPIcon from "../assets/blood_pressure.svg";
import CameraIcon from "../assets/camera_video.svg";
import MHRIcon from "../assets/cardiology.svg";
import CallEmergencyIcon from "../assets/emergency_call.svg";
import SPo2Icon from "../assets/spo2.svg";
import CalendarStrip from "../components/CalendarStrip";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import TextDate from "../components/TextDate";
import { AppContext } from "../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import healthApi from "../apis/HealthApi";
import ImagePickerButton from "../components/ImagePickerButton";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { profile } = useContext(AppContext);

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
          onPress: () => console.log("Đã đồng ý"),
        },
      ],
      { cancelable: true }
    );
  };

  const showConfirmAlertCall = () => {
    Alert.alert(
      "Xác nhận gọi khẩn cấp",
      "Bạn có chắc chắn muốn gọi đến số khẩn cấp?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Đã hủy cuộc gọi"),
          style: "cancel",
        },
        {
          text: "Gọi ngay",
          onPress: () => {
            const emergencyNumber = "115"; // Thay đổi theo nhu cầu
            Linking.openURL(`tel:${emergencyNumber}`);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const { data: healthMetricData } = useQuery({
    queryKey: ["health"],
    queryFn: () => healthApi.getHealthInformation(),
  });

  // console.log(healthMetricData.data.data.items[0]);

  return (
    <SafeAreaViewCustom style={{ paddingLeft: 0, paddingRight: 0 }}>
      <View style={styles.viewHeader}>
        <View style={styles.viewInformation}>
          <View>
            <Image
              source={{
                uri: profile.avatarUrl
                  ? profile.avatarUrl
                  : "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
              }}
              alt=""
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          </View>
          <View style={styles.viewTextInformation}>
            <Text>Chào bạn</Text>
            <Text style={styles.textName}>{profile.fullName}</Text>
          </View>
        </View>
        <View style={styles.viewIcon}>
          <TouchableOpacity
            style={styles.buttonIcon}
            onPress={() => navigation.navigate("Notification")}
          >
            <Ionicons name="notifications-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonIcon}
            onPress={() => navigation.navigate("Setting")}
          >
            <Ionicons name="settings-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewCalendar}>
        <CalendarStrip timeTableSchedule={true} />
        {/* <TimeTableSchedule /> */}
      </View>

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.viewCalendar}
      >
        <View style={styles.viewHealthInformation}>
          <View style={styles.viewButtonHealth}>
            <TouchableOpacity style={styles.buttonHealth}>
              <Text style={styles.textNameHealth}>Chỉ số nhịp tim (MHR)</Text>
              <View style={styles.viewTextHealth}>
                <MHRIcon width={30} height={30} />
                <Text style={styles.textHealthIndex}>
                  {healthMetricData
                    ? healthMetricData.data.data.items[0].heartRate
                    : 0}{" "}
                  bpm
                </Text>
              </View>
              <TextDate day="Chủ nhật" date="18/5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHealth}>
              <Text style={styles.textNameHealth}>Chỉ số huyết áp(BP)</Text>
              <View style={styles.viewTextHealth}>
                <BPIcon width={30} height={30} />
                <Text style={styles.textHealthIndex}>120/80 mmHg</Text>
              </View>
              <TextDate day="Chủ nhật" date="18/5" />
            </TouchableOpacity>
          </View>
          <View style={styles.viewButtonHealth}>
            <TouchableOpacity style={styles.buttonHealth}>
              <Text style={styles.textNameHealth}>
                Chỉ số Oxy trong máu (SpO2)
              </Text>
              <View style={styles.viewTextHealth}>
                <SPo2Icon width={30} height={30} />
                <Text style={styles.textHealthIndex}>
                  {healthMetricData
                    ? healthMetricData.data.data.items[0].oxygenLevel
                    : 0}
                  %
                </Text>
              </View>
              <TextDate day="Chủ nhật" date="18/5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHealth}>
              <Text style={styles.textNameHealth}>Camera RoboCare</Text>
              <View style={styles.viewTextHealth}>
                <CameraIcon width={30} height={30} />
                <Text style={styles.textHealthIndex}>Live</Text>
              </View>
              <TextDate day="Chủ nhật" date="18/5" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          showConfirmAlert();
        }}
      >
        <Text style={styles.floatingButtonText}>
          <CallEmergencyIcon
            onPress={showConfirmAlertCall}
            width={30}
            height={30}
          />
        </Text>
      </TouchableOpacity>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  // viewContainer: {
  //   padding: 0,
  //   margin: 0,
  // },
  viewHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewInformation: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  textName: {
    fontSize: 16,
    fontWeight: "500",
  },
  viewTextInformation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  viewIcon: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  buttonIcon: {
    backgroundColor: "#CAD6FF",
    padding: 2,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
  },
  viewCalendar: {
    backgroundColor: "#CAD6FF",
    // borderRadius: 12,
    // height: 200,
  },
  viewHealthInformation: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewButtonHealth: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  buttonHealth: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
    gap: 8,
    backgroundColor: "#CAD6FF",
    borderRadius: 12,
    padding: 12,
    height: 150,
  },
  viewTextHealth: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  textNameHealth: {
    color: "#2260FF",
    fontSize: 18,
    textAlign: "center",
  },
  textHealthIndex: {
    fontSize: 18,
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
