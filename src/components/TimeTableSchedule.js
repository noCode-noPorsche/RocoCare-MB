import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function TimeTableSchedule({ selectedDate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.selectedDateLabel}>
        Hôm Nay, {moment(selectedDate).format("DD.MM.YYYY")}
      </Text>
      {/* Header */}
      <View style={styles.headerLine}>
        <Text style={styles.timeText}>9 AM</Text>
        <View style={styles.dottedLine} />
      </View>

      {/* Appointment at 10 AM */}
      <View style={styles.appointmentContainer}>
        <Text style={styles.timeText}>10 AM</Text>
        <View style={styles.appointmentBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
            <Text style={styles.description}>
              Phát hiện bất thường ở người dùng
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.circleButton}>
              <Ionicons name="checkmark" size={14} color="#2260FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton}>
              <Ionicons name="close" size={14} color="#2260FF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Other times */}
      <View style={styles.headerLine}>
        <Text style={styles.timeText}>11 AM</Text>
        <View style={styles.dottedLine} />
      </View>
      <View style={styles.headerLine}>
        <Text style={styles.timeText}>12 AM</Text>
        <View style={styles.dottedLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    marginTop: 16,
    marginLeft: 2,
    marginRight: 2,
  },
  headerLine: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 6,
  },
  timeText: {
    width: 50,
    fontSize: 14,
    color: "#2260FF",
    fontWeight: "500",
  },
  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: "dotted",
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
});
