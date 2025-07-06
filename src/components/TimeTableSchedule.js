import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
moment.locale("en");

// export default function TimeTableSchedule({ selectedDate }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.selectedDateLabel}>
//         Hôm Nay, {moment(selectedDate).format("DD.MM.YYYY")}
//       </Text>
//       {/* Header */}
//       <View style={styles.headerLine}>
//         <Text style={styles.timeText}>9 AM</Text>
//         <View style={styles.dottedLine} />
//       </View>

//       {/* Appointment at 10 AM */}
//       <View style={styles.appointmentContainer}>
//         <Text style={styles.timeText}>10 AM</Text>
//         <View style={styles.appointmentBox}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
//             <Text style={styles.description}>
//               Phát hiện bất thường ở người dùng
//             </Text>
//           </View>
//           <View style={styles.iconContainer}>
//             <TouchableOpacity style={styles.circleButton}>
//               <Ionicons name="checkmark" size={14} color="#2260FF" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.circleButton}>
//               <Ionicons name="close" size={14} color="#2260FF" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Other times */}
//       <View style={styles.headerLine}>
//         <Text style={styles.timeText}>11 AM</Text>
//         <View style={styles.dottedLine} />
//       </View>
//       <View style={styles.headerLine}>
//         <Text style={styles.timeText}>12 AM</Text>
//         <View style={styles.dottedLine} />
//       </View>
//     </View>
//   );
// }

export default function TimeTableSchedule({
  selectedDate = moment(),
  scheduleList = [],
}) {
  // console.log(scheduleList, "timetable");
  const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8 AM -> 19 PM
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.selectedDateLabel}>
        {moment(selectedDate).isSame(moment(), "day")
          ? `Hôm nay, ${moment(selectedDate).format("DD.MM.YYYY")}`
          : moment(selectedDate).format("DD.MM.YYYY")}
      </Text>
      <View style={styles.underline} />
      {scheduleList.length === 0 ? (
        <Text style={{ marginTop: 10, color: "gray" }}>
          Không có lịch trình
        </Text>
      ) : (
        <View style={styles.scrollWrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {scheduleList.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("DetailCalendar", { schedule: item })
                  }
                  activeOpacity={0.8}
                >
                  <View style={styles.appointmentContainer}>
                    <Text style={styles.timeText}>
                      {moment(item.time).format("hh:mm A")}
                    </Text>

                    <View style={styles.appointmentBox}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.doctorName}>{item.title}</Text>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.description}
                        >
                          {item.description}
                        </Text>
                      </View>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.circleButton}>
                          <Ionicons
                            name="checkmark"
                            size={14}
                            color="#2260FF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleButton}>
                          <Ionicons name="close" size={14} color="#2260FF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {index < scheduleList.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </TouchableOpacity>

                {/* {index < scheduleList.length - 1 && (
                  <View style={styles.divider} />
                )} */}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    // marginTop: 16,
    marginLeft: 2,
    marginRight: 2,
    paddingHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerLine: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 6,
  },
  timeText: {
    width: 70,
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "500",
  },
  scrollWrapper: {
    maxHeight: 140, // đủ để hiển thị 2 lịch
  },
  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    // borderStyle: "dotted",
    borderStyle: "solid",
    borderColor: "#2260FF",
  },
  appointmentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  appointmentBox: {
    backgroundColor: "#FFD7D7",
    borderRadius: 16,
    padding: 12,
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  doctorName: {
    color: "#2260FF",
    fontWeight: "bold",
    fontSize: 14,
    // marginBottom: 4,
  },
  description: {
    color: "#000",
    fontSize: 13,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 6,
    alignSelf: "flex-start",
  },
  circleButton: {
    backgroundColor: "#fff",
    borderRadius: 999,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDateLabel: {
    textAlign: "right",
    fontSize: 16,
    color: "#2260FF",
  },
  description: {
    color: "#000",
    fontSize: 13,
    lineHeight: 18,
    height: 36, // 2 lines x 18 lineHeight
    overflow: "hidden",
    textOverflow: "ellipsis",
    numberOfLines: 2,
  },
  underline: {
    borderBottomColor: "#2260FF",
    borderBottomWidth: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 4,
  },
});
