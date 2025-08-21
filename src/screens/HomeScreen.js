import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "react-native-vector-icons";
import healthApi from "../apis/HealthApi";
import robotApi from "../apis/RobotApi";
import scheduleApi from "../apis/ScheduleApi";
// import BPIcon from "../assets/blood_pressure.svg";
import CameraIcon from "../assets/camera_video.svg";
// import MHRIcon from "../assets/cardiology.svg";
import CallEmergencyIcon from "../assets/emergency_call.svg";
// import SPo2Icon from "../assets/spo2.svg";
import CalendarStrip from "../components/CalendarStrip";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
// import TextDate from "../components/TextDate";
import TimeTableSchedule from "../components/TimeTableSchedule";
import VitalsHeartRateChart from "../components/VitalsHeartRateChart";
import VitalsOxygenChart from "../components/VitalsOxygenChart";
import { AppContext } from "../context/AppContext";
import emergencyCallApi from "../apis/EmergencyCallApi";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(moment());
  const { profile, emergencyContacts, setEmergencyContacts } =
    useContext(AppContext);

  const { data: emergencyCallData, refetch: refetchPhone } = useQuery({
    queryKey: ["emergency-call"],
    queryFn: () => emergencyCallApi.getEmergencyCall(),
  });

  const { data: userScheduleResult, refetch: refetchSchedule } = useQuery({
    queryKey: ["user-schedule"],
    queryFn: () => scheduleApi.getSchedule({ pageSize: 100 }),
  });

  const filteredSchedule =
    userScheduleResult?.data?.data?.items?.filter((item) => {
      const scheduleDate = moment(item.time);
      return scheduleDate.isSame(selectedDate, "day");
    }) || [];

  const callRobotMutation = useMutation({
    mutationFn: (body) => robotApi.controlRobot(body),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Đang thực hiện cuộc gọi!",
      });
    },
  });
  // const showConfirmAlert = () => {
  //   Alert.alert(
  //     "Xác nhận",
  //     "Bạn có chắc chắn muốn thực hiện hành động này?",
  //     [
  //       {
  //         text: "Hủy",
  //         onPress: () => console.log("Đã hủy"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Đồng ý",
  //         onPress: () => {
  //           // console.log(emergencyContacts.phoneNumber1, phone);
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

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
            callRobotMutation.mutate({
              deviceSerial: profile.deviceToken,
              command: `CALL ${emergencyContacts.phoneNumber1}`,
            });
            console.log(emergencyContacts.phoneNumber1);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const { data: healthMetricData, refetch: refetchHealth } = useQuery({
    queryKey: ["health"],
    queryFn: () => healthApi.getHealthInformation(),
  });
  // console.log("healthMetricData", healthMetricData);
  const resultHealthMetricData = healthMetricData?.data?.data.items;
  // console.log(resultHealthMetricData, "ne ha");

  // console.log(healthMetricData.data.data.items[0]);

  useFocusEffect(
    useCallback(() => {
      refetchSchedule();
      refetchHealth();
      refetchPhone();
      setEmergencyContacts({
        phoneNumber1: emergencyCallData?.data?.data?.phoneNumber1,
        phoneNumber2: emergencyCallData?.data?.data?.phoneNumber2,
      });
    }, [refetchHealth, refetchSchedule])
  );

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
        <CalendarStrip
          onDateChange={(date) => setSelectedDate(date)} // nhận ngày chọn
          timeTableSchedule={true}
          hideMonthPicker={true}
          hideNavigation={true}
        />
        {/* <TimeTableSchedule /> */}
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <TimeTableSchedule
            selectedDate={selectedDate}
            scheduleList={filteredSchedule}
          />
        </View>
      </View>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.viewCalendar}
      >
        {/* <VitalsChartCard data={healthMetricData.data.data.items} /> */}

        {Array.isArray(resultHealthMetricData) &&
          resultHealthMetricData.length > 0 && (
            <VitalsHeartRateChart
              data={resultHealthMetricData}
              latestTime={resultHealthMetricData[0].recordedTime}
              latestValue={resultHealthMetricData[0].heartRate}
            />
          )}
        {Array.isArray(resultHealthMetricData) &&
          resultHealthMetricData.length > 0 && (
            <VitalsOxygenChart
              data={resultHealthMetricData}
              latestTime={resultHealthMetricData[0].recordedTime}
              latestValue={resultHealthMetricData[0].oxygenLevel}
            />
          )}
        <View style={styles.viewHealthInformation}>
          {/* <View style={styles.viewButtonHealth}>
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
          </View> */}
          <View style={styles.viewButtonHealth}>
            {/* <TouchableOpacity style={styles.buttonHealth}>
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
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Robot")}
              style={styles.buttonHealth}
            >
              <Text style={styles.textNameHealth}>Camera RoboCare</Text>
              <View style={styles.viewTextHealth}>
                <CameraIcon width={30} height={30} />
                <Text style={styles.textHealthIndex}>Live</Text>
              </View>
              {/* <TextDate day="Chủ nhật" date="18/5" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          showConfirmAlertCall();
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
