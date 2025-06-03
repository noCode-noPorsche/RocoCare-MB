import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarIcon from "../assets/calendar.svg";

export default function TextDate({ day, date, style }) {
  return (
    <View style={[styles.viewCalendarHealth, style]}>
      <CalendarIcon width={14} height={14} />
      <Text style={styles.textDate}>
        {day}, {date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
