import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DetailCalendarScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { schedule } = route.params || {};
  const time = schedule?.time ? new Date(schedule.time) : new Date();

  const dateString = time.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hour = time.getHours();
  const minute = time.getMinutes().toString().padStart(2, "0");
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  const timeString = `${formattedHour}:${minute} ${ampm}`;

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Chi Tiết Lịch Trình"} />
      <Text style={styles.scheduleTitle}>
        {schedule?.title || "Không có tiêu đề"}
      </Text>
      <View style={[styles.horizontalLineContainer, { marginTop: 4 }]}>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.viewDate}>
        <Text style={styles.textDate}>{dateString}</Text>
      </View>
      <View style={styles.viewTime}>
        <Text style={styles.textTime}>{timeString}</Text>
        <Text style={styles.textType}>
          {schedule?.type || "Không xác định"}
        </Text>
      </View>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.viewInformation}>
        <View style={styles.viewInformationName}>
          <Text style={styles.textInformationTitle}>Họ Và Tên</Text>
          <Text style={styles.textInformationContent}>
            {schedule?.fullName || "Chưa có"}
          </Text>
        </View>
        <View style={styles.viewInformationAge}>
          <Text style={styles.textInformationTitle}>Tuổi</Text>
          <Text style={styles.textInformationContent}>
            {schedule?.age || "--"}
          </Text>
        </View>
        <View style={styles.viewInformationGender}>
          <Text style={styles.textInformationTitle}>Giới Tính</Text>
          <Text style={styles.textInformationContent}>
            {schedule?.gender || "--"}
          </Text>
        </View>
      </View>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.viewNote}>
        <Text style={styles.textNoteTitle}>Ghi Chú</Text>
        <Text style={styles.textNoteContent}>
          {schedule?.description || "Không có ghi chú."}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("SetCalendar", { scheduleToEdit: schedule })
        }
      >
        <Text style={styles.editButtonText}>Chỉnh Sửa</Text>
      </TouchableOpacity>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  horizontalLineContainer: {
    width: "100%",
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#2260FF",
  },
  viewDate: {
    borderRadius: 36,
    backgroundColor: "#2260FF",
    paddingTop: 4,
    paddingBottom: 4,
  },
  textDate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  viewTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textTime: {
    fontSize: 20,
    color: "#2260FF",
  },
  textType: {
    fontSize: 20,
    color: "#2260FF",
  },
  viewInformation: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "space-between",
  },
  viewInformationName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewInformationAge: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewInformationGender: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInformationTitle: {
    fontSize: 20,
    color: "#000",
  },
  textInformationContent: {
    fontSize: 20,
    fontWeight: "500",
  },
  viewNote: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  textNoteTitle: {
    fontSize: 20,
    color: "#000",
  },
  textNoteContent: {
    fontSize: 20,
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2260FF",
    textAlign: "center",
    // marginTop: 12,
    // marginBottom: 8,
  },
  editButton: {
    position: "absolute",
    bottom: 36,
    left: 24,
    right: 24,
    backgroundColor: "#2260FF",
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 32,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
