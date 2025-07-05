import moment from "moment";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ArrowLeftIcon from "../assets/arrow_left.svg";
import ArrowRightIcon from "../assets/arrow_right.svg";
import ArrowDownIcon from "../assets/arrow_down.svg";
import TimeTableSchedule from "./TimeTableSchedule";

export default function CalendarStrip({
  onMonthChange,
  onDateChange,
  hideMonthPicker = false,
  hideNavigation = false,
  hideTimeTableSchedule = false,
}) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [tempDate, setTempDate] = useState(startDate.toDate());

  const dates = Array.from({ length: hideTimeTableSchedule ? 5 : 6 }, (_, i) =>
    startDate.clone().add(i, "days")
  );

  const prevDays = () => {
    const newStartDate = startDate.clone().subtract(5, "days");
    setStartDate(newStartDate);
  };

  const nextDays = () => {
    const newStartDate = startDate.clone().add(5, "days");
    setStartDate(newStartDate);
  };

  const pickMonth = () => {
    setTempDate(startDate.toDate());
    setShowMonthPicker(true);
  };

  const onChangeMonth = (event, selected) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selected) {
        setTempDate(selected);
      }
    } else {
      if (selected) setTempDate(selected);
    }
  };

  const handleConfirm = () => {
    const newDate = moment(tempDate).startOf("day");
    setStartDate(newDate);
    setSelectedDate(newDate);
    setShowMonthPicker(false);
    onMonthChange?.(newDate.format("YYYY-MM"));
  };

  const handleCancel = () => {
    setShowMonthPicker(false);
  };

  const renderItem = ({ item }) => {
    const isSelected = item.isSame(selectedDate, "day");
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected ? styles.dateItemSelected : styles.dateItemUnselected,
        ]}
        onPress={() => {
          setSelectedDate(item);
          onDateChange?.(item); // truyền Moment object ra ngoài
        }}
      >
        <Text
          style={[
            styles.dayText,
            isSelected ? styles.dayTextSelected : styles.dayTextUnselected,
          ]}
        >
          {item.format("D")}
        </Text>
        <Text
          style={[
            styles.weekText,
            isSelected ? styles.weekTextSelected : styles.weekTextUnselected,
          ]}
        >
          {item.format("dd").toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header chọn tháng */}
      {!hideMonthPicker && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.monthPicker} onPress={pickMonth}>
            <Text style={styles.monthText}>
              {startDate.format("MMMM YYYY")}
            </Text>
            <ArrowDownIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal chọn tháng */}
      {showMonthPicker && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeMonth}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.cancelText}>Huỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Dãy ngày với 2 nút hai bên */}
      <View style={styles.dateRowContainer}>
        {!hideNavigation && (
          <TouchableOpacity onPress={prevDays} style={styles.arrowButton}>
            <ArrowLeftIcon width={18} height={18} />
          </TouchableOpacity>
        )}

        <FlatList
          data={dates}
          renderItem={renderItem}
          keyExtractor={(item) => item.format("YYYY-MM-DD")}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
        />

        {!hideNavigation && (
          <TouchableOpacity onPress={nextDays} style={styles.arrowButton}>
            <ArrowRightIcon width={18} height={18} />
          </TouchableOpacity>
        )}
      </View>
      {!hideTimeTableSchedule && <TimeTableSchedule />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 8,
    color: "#2260FF",
  },
  flatListContent: {
    marginTop: 12,
    justifyContent: "space-between",
  },
  dateItem: {
    alignItems: "center",
    padding: 12,
    borderRadius: 22,
    marginHorizontal: 4,
    width: 60,
  },
  dateItemSelected: {
    backgroundColor: "#2260FF",
  },
  dateItemUnselected: {
    backgroundColor: "#ECF1FF",
  },
  dayText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  weekText: { fontSize: 12, color: "#000" },
  dayTextSelected: {
    color: "#fff",
  },
  dayTextUnselected: {
    color: "#A0A0A0",
  },
  weekTextSelected: {
    color: "#fff",
  },
  weekTextUnselected: {
    color: "#A0A0A0",
  },
  dateRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatList: {
    flexGrow: 0,
    flexShrink: 1,
  },
  arrowButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "80%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancelText: {
    color: "gray",
    fontSize: 16,
  },
  confirmText: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "600",
  },
});
