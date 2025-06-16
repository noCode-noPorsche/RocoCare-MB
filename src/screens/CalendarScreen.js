import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import CalendarStrip from "../components/CalendarStrip";
import { useNavigation } from "@react-navigation/native";

export default function CalendarScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaViewCustom style={{ paddingLeft: 0, paddingRight: 0 }}>
      <HeaderShown HeaderName={"Lịch Trình"} iconBack={false} />
      <View style={styles.viewCalendarStrip}>
        <CalendarStrip />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        <View style={styles.viewCalendar}>
          <View style={styles.viewCalendarTime}>
            <Text style={styles.textTime}>10 AM</Text>
          </View>
          <View style={styles.viewCalendarItem}>
            <Text style={styles.textCalendarTitle}>Lịch trình</Text>
            <Text style={styles.textCalendarDescription}>18/05/2025</Text>
            <View style={styles.viewCalendarItemButton}>
              <TouchableOpacity
                style={styles.buttonDetailCalendar}
                onPress={() => navigation.navigate("DetailCalendar")}
              >
                <Text style={styles.textButtonDetailCalendar}>Chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonEditCalendar}
                onPress={() => navigation.navigate("SetCalendar")}
              >
                <Text style={styles.textButtonEditCalendar}>Chỉnh Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewCalendar}>
          <View style={styles.viewCalendarTime}>
            <Text style={styles.textTime}>10 AM</Text>
          </View>
          <View style={styles.viewCalendarItem}>
            <Text style={styles.textCalendarTitle}>Lịch trình</Text>
            <Text style={styles.textCalendarDescription}>18/05/2025</Text>
            <View style={styles.viewCalendarItemButton}>
              <TouchableOpacity style={styles.buttonDetailCalendar}>
                <Text style={styles.textButtonDetailCalendar}>Chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonEditCalendar}>
                <Text style={styles.textButtonEditCalendar}>Chỉnh Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewCalendar}>
          <View style={styles.viewCalendarTime}>
            <Text style={styles.textTime}>10 AM</Text>
          </View>
          <View style={styles.viewCalendarItem}>
            <Text style={styles.textCalendarTitle}>Lịch trình</Text>
            <Text style={styles.textCalendarDescription}>18/05/2025</Text>
            <View style={styles.viewCalendarItemButton}>
              <TouchableOpacity style={styles.buttonDetailCalendar}>
                <Text style={styles.textButtonDetailCalendar}>Chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonEditCalendar}>
                <Text style={styles.textButtonEditCalendar}>Chỉnh Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.viewCalendar}>
          <View style={styles.viewCalendarTime}>
            <Text style={styles.textTime}>10 AM</Text>
          </View>
          <View style={styles.viewCalendarItem}>
            <Text style={styles.textCalendarTitle}>Lịch trình</Text>
            <Text style={styles.textCalendarDescription}>18/05/2025</Text>
            <View style={styles.viewCalendarItemButton}>
              <TouchableOpacity style={styles.buttonDetailCalendar}>
                <Text style={styles.textButtonDetailCalendar}>Chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonEditCalendar}>
                <Text style={styles.textButtonEditCalendar}>Chỉnh Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate("SetMedical");
        }}
      >
        <Text style={styles.floatingButtonText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewCalendarStrip: {
    backgroundColor: "#CAD6FF",
  },
  viewCalendar: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
  viewCalendarTime: {
    width: 50,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#2260FF",
  },

  textTime: {
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "600",
  },
  viewCalendarItem: {
    display: "flex",
    flex: 9,
    flexDirection: "column",

    backgroundColor: "#CAD6FF",
    padding: 16,
    borderRadius: 16,
  },
  textCalendarDescription: {
    fontSize: 16,
    height: 80,
    // fontWeight: "bold",
  },
  textCalendarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2260FF",
  },
  viewCalendarItemButton: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    // marginTop: 16,
  },
  buttonDetailCalendar: {
    backgroundColor: "#2260FF",
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 20,
  },
  buttonEditCalendar: {
    backgroundColor: "#ECF1FF",
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 20,
  },
  textButtonDetailCalendar: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textButtonEditCalendar: {
    color: "#2260FF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 100,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2260FF",
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
