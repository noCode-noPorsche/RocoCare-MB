import moment from "moment";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TimeTableSchedule from "./TimeTableSchedule";

export default function CalendarStrip({ timeTableSchedule = false }) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // Tạo 7 ngày liên tiếp bắt đầu từ hôm nay
  const dates = Array.from({ length: 7 }, (_, index) =>
    moment().add(index, "days")
  );

  const renderItem = ({ item }) => {
    const isSelected = item.format("YYYY-MM-DD") === selectedDate;

    return (
      <TouchableOpacity
        style={[styles.dateItem, isSelected && styles.dateItemSelected]}
        onPress={() => setSelectedDate(item.format("YYYY-MM-DD"))}
      >
        <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
          {item.format("D")}
        </Text>
        <Text style={[styles.weekText, isSelected && styles.weekTextSelected]}>
          {item.format("dd").toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.format("YYYY-MM-DD")}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      {/* <Text style={styles.selectedDateLabel}>
        Hôm Nay, {moment(selectedDate).format("DD.MM.YYYY")}
      </Text> */}
      {timeTableSchedule && <TimeTableSchedule selectedDate={selectedDate} />}
    </View>
  );
}

// export default CalendarStrip;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#",
    padding: 10,
    // borderRadius: 36,
    margin: 16,
  },
  flatListContent: {
    justifyContent: "space-between",
  },
  dateItem: {
    // textAlign: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    borderRadius: 22,
    width: 60,
    marginHorizontal: 4,
  },
  dateItemSelected: {
    backgroundColor: "#2260FF",
  },
  dayText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  dayTextSelected: {
    color: "#fff",
  },
  weekText: {
    fontSize: 12,
    color: "#000",
  },
  weekTextSelected: {
    color: "#fff",
  },
  selectedDateLabel: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
    fontSize: 14,
    color: "#2260FF",
  },
});
