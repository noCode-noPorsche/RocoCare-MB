import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "react-native-vector-icons";
import SearchIcon from "../assets/search_icon.svg";
import MHRIcon from "../assets/cardiology.svg";
import BPIcon from "../assets/blood_pressure.svg";
import SPo2Icon from "../assets/spo2.svg";
import CameraIcon from "../assets/camera_video.svg";
import CalendarIcon from "../assets/calendar.svg";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewInformation}>
          <View>
            <Image
              source={{
                uri: "https://down-vn.img.susercontent.com/file/73d385bbc251f1b33423ef582593493b",
              }}
              alt=""
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={styles.viewTextInformation}>
            <Text>Chào bạn</Text>
            <Text style={styles.textName}>Dustin</Text>
          </View>
        </View>
        <View style={styles.viewIcon}>
          <TouchableOpacity style={styles.buttonIcon}>
            <Ionicons name="notifications-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonIcon}>
            <Ionicons name="settings-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewSearchBox}>
        <TouchableOpacity>
          <SearchIcon width={20} height={20} />
        </TouchableOpacity>
        <TextInput placeholder="" style={styles.textInputSearch} />
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={20} color="#2260FF" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewCalendar}></View>
      <View style={styles.viewHealthInformation}>
        <View style={styles.viewButtonHealth}>
          <TouchableOpacity style={styles.buttonHealth}>
            <Text style={styles.textNameHealth}>Chỉ số nhịp tim (MHR)</Text>
            <View style={styles.viewTextHealth}>
              <MHRIcon width={30} height={30} />
              <Text style={styles.textHealthIndex}>190 bpm</Text>
            </View>
            <View style={styles.viewCalendarHealth}>
              <CalendarIcon width={14} height={14} />
              <Text style={styles.textDate}>Chủ nhật, 18/5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHealth}>
            <Text style={styles.textNameHealth}>Chỉ số huyết áp(BP)</Text>
            <View style={styles.viewTextHealth}>
              <BPIcon width={30} height={30} />
              <Text style={styles.textHealthIndex}>120/80 mmHg</Text>
            </View>
            <View style={styles.viewCalendarHealth}>
              <CalendarIcon width={14} height={14} />
              <Text style={styles.textDate}>Chủ nhật, 18/5</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewButtonHealth}>
          <TouchableOpacity style={styles.buttonHealth}>
            <Text style={styles.textNameHealth}>
              Chỉ số Oxy trong máu (SpO2)
            </Text>
            <View style={styles.viewTextHealth}>
              <SPo2Icon width={30} height={30} />
              <Text style={styles.textHealthIndex}>95 - 100%</Text>
            </View>
            <View style={styles.viewCalendarHealth}>
              <CalendarIcon width={14} height={14} />
              <Text style={styles.textDate}>Chủ nhật, 18/5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHealth}>
            <Text style={styles.textNameHealth}>Camera RoboCare</Text>
            <View style={styles.viewTextHealth}>
              <CameraIcon width={30} height={30} />
              <Text style={styles.textHealthIndex}>Live</Text>
            </View>
            <View style={styles.viewCalendarHealth}>
              <CalendarIcon width={14} height={14} />
              <Text style={styles.textDate}>Chủ nhật, 18/5</Text>
            </View>
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
  viewHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewInformation: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  textName: {
    fontSize: 16,
    fontWeight: "500",
  },
  viewTextInformation: {
    display: "flex",
    alignItems: "center",
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
  viewSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CAD6FF",
    borderRadius: 23,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
  },
  textInputSearch: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 23,
    paddingVertical: 8,
    fontSize: 16,
  },
  viewCalendar: {
    backgroundColor: "#CAD6FF",
    height: 200,
  },
  viewHealthInformation: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
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
  viewCalendarHealth: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    gap: 4,
  },
  textDate: {
    color: "#2260FF",
  },
});
