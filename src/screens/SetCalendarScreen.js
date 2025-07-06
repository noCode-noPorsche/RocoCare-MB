import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarStrip from "../components/CalendarStrip";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { useMutation } from "@tanstack/react-query";
import scheduleApi from "../apis/ScheduleApi";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import { Alert } from "react-native";

export default function SetCalendarScreen() {
  const now = new Date();
  const navigation = useNavigation();
  const defaultHour = (now.getHours() % 12 || 12).toString().padStart(2, "0");
  const defaultMinute = now.getMinutes().toString().padStart(2, "0");
  const defaultAMPM = now.getHours() >= 12 ? "PM" : "AM";
  const [visiblePicker, setVisiblePicker] = useState(null);
  const [selectedDateFromStrip, setSelectedDateFromStrip] = useState(
    new Date()
  );
  const [repeatType, setRepeatType] = useState("none"); //"none" | "daily" | "weekly" | "monthly"

  const route = useRoute();
  const { scheduleToEdit } = route.params || {};
  const openInlinePicker = (mode) => {
    setVisiblePicker(mode);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullName: "",
    age: "",
    gender: "Nam",
    type: 0,
    hour: defaultHour,
    minute: defaultMinute,
    ampm: defaultAMPM,
  });
  const [selectedTime, setSelectedTime] = useState(new Date());
  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleAMPM = (ampm) => {
    let hour = selectedTime.getHours();

    if (ampm === "AM" && hour >= 12) {
      hour -= 12;
    } else if (ampm === "PM" && hour < 12) {
      hour += 12;
    }

    const updatedDate = new Date(selectedTime);
    updatedDate.setHours(hour);

    setSelectedTime(updatedDate);
    updateFormData("ampm", ampm);
  };

  const buildPayload = () => {
    // Giả sử bạn có ngày đang chọn từ CalendarStrip, tạm dùng ngày hôm nay
    const selectedDate = new Date(selectedDateFromStrip);
    // Lấy giờ & phút từ formData
    let hour = parseInt(formData.hour, 10);
    const minute = parseInt(formData.minute, 10);
    const isPM = formData.ampm === "PM";

    if (isPM && hour < 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    const repeatTypeMap = {
      none: 0,
      daily: 1,
      weekly: 2,
      monthly: 3,
    };

    // Gán giờ phút vào ngày đã chọn
    selectedDate.setHours(hour);
    selectedDate.setMinutes(minute);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);

    const payload = {
      title: formData.title,
      description: formData.description,
      fullName: formData.fullName,
      age: formData.age,
      gender: formData.gender,
      time: selectedDate.toISOString(),
    };

    if (!scheduleToEdit) {
      const repeatTypeMap = {
        none: 0,
        daily: 1,
        weekly: 2,
        monthly: 3,
      };
      payload.type = repeatTypeMap[repeatType] ?? 0;
    }
    return payload;
    // return {
    //   title: formData.title,
    //   description: formData.description,
    //   fullName: formData.fullName,
    //   age: formData.age,
    //   gender: formData.gender,
    //   time: selectedDate.toISOString(),
    //   type: repeatTypeMap[repeatType] ?? 0,
    // };
  };

  const createUserScheduleMutation = useMutation({
    mutationFn: (body) => scheduleApi.createSchedule(body),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Tạo lịch thành công!",
      });
      navigation.navigate("Calendar");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Tạo lịch thất bại",
      });
      console.log("error schedule", error);
      console.log("❌ Response Status:", error.response.status);
      console.log("❌ Response Data:", error.response.data);
      console.log("❌ Response Headers:", error.response.headers);
    },
  });

  const updateUserScheduleMutation = useMutation({
    mutationFn: ({ id, body }) => scheduleApi.updateSchedule(id, body),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Cập nhật lịch thành công!",
      });
      navigation.navigate("Calendar");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Cập nhật lịch thất bại",
      });
      console.log("error schedule", error);
      console.log("❌ Response Status:", error.response.status);
      console.log("❌ Response Data:", error.response.data);
      console.log("❌ Response Headers:", error.response.headers);
    },
  });

  const handleSubmit = () => {
    const payload = buildPayload();
    console.log("🚀 Payload gửi về:", payload);
    // Kiểm tra các trường bắt buộc
    if (
      !formData.title ||
      !formData.fullName ||
      !formData.age ||
      !formData.gender ||
      typeof formData.type !== "number"
    ) {
      Toast.show({
        type: "info",
        text1: "Vui lòng nhập đầy đủ thông tin bắt buộc!",
      });
      return;
    }

    if (scheduleToEdit) {
      // Nếu đang sửa -> hỏi người dùng
      Alert.alert(
        "Cập nhật lịch trình",
        "Bạn muốn cập nhật chỉ lịch này hay tất cả các lịch cùng nhóm?",
        [
          {
            text: "Chỉ lịch này",
            onPress: () => {
              const updatePayload = {
                ...payload,
                isBatchUpdate: false,
                // id: scheduleToEdit.id,
              };
              // console.log(updatePayload, " here");
              // console.log(scheduleToEdit.id, "id");
              updateUserScheduleMutation.mutate({
                id: scheduleToEdit.id,
                body: updatePayload,
              });
            },
          },
          {
            text: "Tất cả lịch cùng nhóm",
            onPress: () => {
              const updatePayload = {
                ...payload,
                isBatchUpdate: true,
                // groupId: scheduleToEdit.groupId,
              };
              updateUserScheduleMutation.mutate({
                id: scheduleToEdit.groupId,
                body: updatePayload,
              });
            },
          },
          { text: "Huỷ", style: "cancel" },
        ]
      );
    } else {
      // Tạo mới
      createUserScheduleMutation.mutate(payload);
    }
  };

  useEffect(() => {
    if (scheduleToEdit) {
      const scheduleTime = moment(scheduleToEdit.time);
      const hour = scheduleTime.hour();
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = (hour % 12 || 12).toString().padStart(2, "0");
      const minute = scheduleTime.minute().toString().padStart(2, "0");

      setFormData({
        title: scheduleToEdit.title || "",
        description: scheduleToEdit.description || "",
        fullName: scheduleToEdit.fullName || "",
        age: scheduleToEdit.age?.toString() || "",
        gender: scheduleToEdit.gender || "Nam",
        type: scheduleToEdit.type ?? 0,
        hour: displayHour,
        minute: minute,
        ampm: ampm,
      });

      setRepeatType(
        ["none", "daily", "weekly", "monthly"][scheduleToEdit.type ?? 0] ||
          "none"
      );

      setSelectedDateFromStrip(scheduleTime.toDate());
      setSelectedTime(scheduleTime.toDate());
    }
  }, [scheduleToEdit]);

  return (
    <SafeAreaViewCustom
      style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
    >
      <HeaderShown
        HeaderName={"Đặt Lịch Trình"}
        style={{ marginLeft: 16, marginRight: 16 }}
      />
      <View style={styles.viewCalendarStrip}>
        <CalendarStrip
          hideTimeTableSchedule={true}
          onDateChange={(momentDate) => {
            setSelectedDateFromStrip(momentDate.toDate());
          }}
        />
      </View>

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ gap: 16 }}
      >
        <View style={{ gap: 16 }}>
          {/* <Text style={styles.textCalendarTime}>Thời Gian</Text> */}
          <Text style={styles.textCalendarTime}>Thời gian</Text>
          <View style={styles.viewCalendarTime}>
            <View style={styles.viewClock}>
              {/* Spinner giờ */}
              <View
                style={{
                  width: 100,
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {visiblePicker === "hour" ? (
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={formData.hour}
                      onValueChange={(value) => {
                        updateFormData("hour", value);
                        setVisiblePicker(null);
                      }}
                      style={styles.inlinePicker}
                      itemStyle={styles.itemStyle}
                    >
                      {[...Array(12).keys()].map((i) => {
                        const val = (i + 1).toString().padStart(2, "0");
                        return (
                          <Picker.Item key={val} label={val} value={val} />
                        );
                      })}
                    </Picker>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => openInlinePicker("hour")}
                    style={styles.timeBoxHighlight}
                  >
                    <Text style={styles.timeText}>{formData.hour}</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.colon}>:</Text>
              <View
                style={{
                  width: 100,
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {visiblePicker === "minute" ? (
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={formData.minute}
                      onValueChange={(value) => {
                        updateFormData("minute", value);
                        setVisiblePicker(null);
                      }}
                      style={styles.inlinePicker}
                      itemStyle={styles.itemStyle}
                    >
                      {[...Array(60).keys()].map((i) => {
                        const val = i.toString().padStart(2, "0");
                        return (
                          <Picker.Item key={val} label={val} value={val} />
                        );
                      })}
                    </Picker>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => openInlinePicker("minute")}
                    style={styles.timeBoxHighlight}
                  >
                    <Text style={styles.timeText}>{formData.minute}</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* AM/PM */}
              <View style={styles.ampmContainer}>
                <TouchableOpacity
                  style={[
                    styles.ampmBoxVertical,
                    formData.ampm === "AM" && styles.selectedAmpm,
                  ]}
                  onPress={() => toggleAMPM("AM")}
                >
                  <Text
                    style={[
                      styles.ampmText,
                      formData.ampm === "AM" && styles.selectedAmpmText,
                    ]}
                  >
                    AM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.ampmBoxVertical,
                    formData.ampm === "PM" && styles.selectedAmpm,
                  ]}
                  onPress={() => toggleAMPM("PM")}
                >
                  <Text
                    style={[
                      styles.ampmText,
                      formData.ampm === "PM" && styles.selectedAmpmText,
                    ]}
                  >
                    PM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {!scheduleToEdit && (
            <View style={styles.viewButtonType}>
              <TouchableOpacity
                style={[
                  styles.buttonType,
                  repeatType === "none"
                    ? styles.selectedButtonType
                    : styles.unselectedButtonType,
                ]}
                onPress={() => setRepeatType("none")}
              >
                <Text
                  style={[
                    styles.textButtonType,
                    repeatType === "none"
                      ? styles.selectedTextButtonType
                      : styles.unselectedTextButtonType,
                  ]}
                >
                  Không Lặp
                </Text>
              </TouchableOpacity>

              {/* Daily */}
              <TouchableOpacity
                style={[
                  styles.buttonType,
                  repeatType === "daily"
                    ? styles.selectedButtonType
                    : styles.unselectedButtonType,
                ]}
                onPress={() => setRepeatType("daily")}
              >
                <Text
                  style={[
                    styles.textButtonType,
                    repeatType === "daily"
                      ? styles.selectedTextButtonType
                      : styles.unselectedTextButtonType,
                  ]}
                >
                  Mỗi Ngày
                </Text>
              </TouchableOpacity>

              {/* Weekly */}
              <TouchableOpacity
                style={[
                  styles.buttonType,
                  repeatType === "weekly"
                    ? styles.selectedButtonType
                    : styles.unselectedButtonType,
                ]}
                onPress={() => setRepeatType("weekly")}
              >
                <Text
                  style={[
                    styles.textButtonType,
                    repeatType === "weekly"
                      ? styles.selectedTextButtonType
                      : styles.unselectedTextButtonType,
                  ]}
                >
                  Mỗi Tuần
                </Text>
              </TouchableOpacity>

              {/* Monthly */}
              <TouchableOpacity
                style={[
                  styles.buttonType,
                  repeatType === "monthly"
                    ? styles.selectedButtonType
                    : styles.unselectedButtonType,
                ]}
                onPress={() => setRepeatType("monthly")}
              >
                <Text
                  style={[
                    styles.textButtonType,
                    repeatType === "monthly"
                      ? styles.selectedTextButtonType
                      : styles.unselectedTextButtonType,
                  ]}
                >
                  Mỗi Tháng
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.viewInformation}>
            <Text style={styles.textDetail}>Chi tiết bệnh nhân</Text>
            <InputCustom
              onChangeText={(value) => updateFormData("title", value)}
              placeholder="Tiêu Đề"
              titleInput={"Tiêu Đề"}
              value={formData.title}
            />
            <InputCustom
              onChangeText={(value) => updateFormData("fullName", value)}
              placeholder="Họ và Tên"
              titleInput={"Họ và Tên"}
              value={formData.fullName}
            />
            <InputCustom
              onChangeText={(value) => updateFormData("age", value)}
              placeholder="Tuổi"
              titleInput={"Tuổi"}
              value={formData.age}
            />
            <Text style={styles.textGender}>Giới Tính</Text>
            <View style={styles.viewGender}>
              <TouchableOpacity
                style={[
                  styles.buttonGender,
                  formData.gender === "Nam" && styles.selectedGenderButton,
                ]}
                onPress={() => updateFormData("gender", "Nam")}
              >
                <Text
                  style={[
                    styles.textButtonGender,
                    formData.gender === "Nam" && styles.selectedGenderText,
                  ]}
                >
                  Nam
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonGender,
                  formData.gender === "Nữ" && styles.selectedGenderButton,
                ]}
                onPress={() => updateFormData("gender", "Nữ")}
              >
                <Text
                  style={[
                    styles.textButtonGender,
                    formData.gender === "Nữ" && styles.selectedGenderText,
                  ]}
                >
                  Nữ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.viewNote}>
            <InputCustom
              onChangeText={(value) => updateFormData("description", value)}
              placeholder="Ghi Chú"
              titleInput={"Ghi Chú"}
              value={formData.description}
              multiline={true}
              numberOfLines={10}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewSaveButton}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonSave}>
          <Text style={styles.textButtonSave}>Lưu</Text>
        </TouchableOpacity>
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
    marginLeft: 16,
    marginRight: 20,
  },
  viewCalendarStrip: {
    // marginTop: 16,
    backgroundColor: "#CAD6FF",
  },
  viewCalendarTime: {
    height: 150,
    backgroundColor: "#CAD6FF",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 36,
  },
  textCalendarTime: {
    fontSize: 20,
    color: "#2260FF",
    textAlign: "left",
    marginLeft: 16,
    fontWeight: "500",
  },
  viewButtonType: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
  },
  buttonType: {
    backgroundColor: "#2260FF",
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 36,
  },
  textButtonType: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  textDetail: {
    fontSize: 20,
    fontWeight: 500,
    color: "#2260FF",
  },
  viewInformation: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  viewGender: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  textGender: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGender: {
    padding: 16,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#2260FF",
    backgroundColor: "#fff", // nền trắng khi chưa chọn
  },
  selectedGenderButton: {
    backgroundColor: "#2260FF",
  },
  textButtonGender: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2260FF", // màu chữ mặc định
  },
  selectedGenderText: {
    color: "#fff", // khi chọn thì chữ trắng
  },
  viewNote: {
    marginLeft: 16,
    marginRight: 16,
  },
  timeBox: {
    width: "40%",
  },
  viewClock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1, // hoặc height: '100%' để chiếm toàn bộ khung 200
    gap: 16,
  },
  colon: {
    fontSize: 30,
    fontWeight: "bold",
  },
  timeBoxHighlight: {
    backgroundColor: "#fff", // nổi bật trên nền xanh nhạt
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2260FF", // phù hợp với hệ màu chính
  },
  ampmBox: {
    backgroundColor: "#EAEAF5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  ampmText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  selectedAmpm: {
    backgroundColor: "#2260FF",
  },
  selectedAmpmText: {
    color: "#fff",
  },
  ampmContainer: {
    flexDirection: "column",
    marginLeft: 12,
    borderRadius: 12,
    overflow: "hidden", // Để hai nút liền nhau
  },
  ampmBoxVertical: {
    backgroundColor: "#EAEAF5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  picker: {
    height: 50,
    width: 80,
    color: "#000",
  },
  inlinePicker: {
    width: 100,
    alignSelf: "center",
    // marginTop: 8,
    backgroundColor: "transparent", // đảm bảo không chồng nền
    color: "#fff", // tex
  },
  itemStyle: {
    fontSize: 24,
    height: 150,
  },
  pickerWrapper: {
    width: 100,
    height: 110,
    backgroundColor: "#ECF1FF", // giống timeBoxHighlight
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 2, // Android shadow
    // shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  // selectedButtonType: {
  //   backgroundColor: "#fff", // nền trắng
  //   borderWidth: 2,
  //   borderColor: "#2260FF",
  // },

  // selectedTextButtonType: {
  //   color: "#2260FF",
  // },
  selectedButtonType: {
    backgroundColor: "#2260FF",
    borderColor: "#2260FF",
    borderWidth: 2,
  },
  unselectedButtonType: {
    backgroundColor: "#fff",
    borderColor: "#2260FF",
    borderWidth: 2,
  },

  selectedTextButtonType: {
    color: "#fff",
  },
  unselectedTextButtonType: {
    color: "#2260FF",
  },
  viewSaveButton: {
    paddingLeft: 100,
    paddingRight: 100,
  },
  buttonSave: {
    backgroundColor: "#2260FF",
    paddingVertical: 16,
    borderRadius: 36,
    alignItems: "center",
  },
  textButtonSave: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
