import React from "react";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import { StyleSheet, Text, View } from "react-native";

export default function DetailCalendarScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Chi Tiết Lịch Trình"} />
      <View style={[styles.horizontalLineContainer, { marginTop: 16 }]}>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.viewDate}>
        <Text style={styles.textDate}>18 Tháng 5, 2025</Text>
      </View>
      <View style={styles.viewTime}>
        <Text style={styles.textTime}>10: 00 AM</Text>
        <Text style={styles.textType}>Mỗi Tuần</Text>
      </View>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.viewInformation}>
        <View style={styles.viewInformationName}>
          <Text style={styles.textInformationTitle}>Họ Và Tên</Text>
          <Text style={styles.textInformationContent}>Dustin</Text>
        </View>
        <View style={styles.viewInformationAge}>
          <Text style={styles.textInformationTitle}>Tuổi</Text>
          <Text style={styles.textInformationContent}>22</Text>
        </View>
        <View style={styles.viewInformationGender}>
          <Text style={styles.textInformationTitle}>Giới Tính</Text>
          <Text style={styles.textInformationContent}>Nam</Text>
        </View>
      </View>
      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.viewNote}>
        <Text style={styles.textNoteTitle}>Ghi Chú</Text>
        <Text style={styles.textNoteContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </Text>
      </View>
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
});
