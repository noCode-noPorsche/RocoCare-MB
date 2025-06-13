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

export default function SetCalendarScreen() {
  return (
    <SafeAreaViewCustom style={{ paddingLeft: 0, paddingRight: 0 }}>
      <HeaderShown
        HeaderName={"Đặt Lịch Trình"}
        style={{ marginLeft: 16, marginRight: 16 }}
      />
      <View style={styles.viewCalendarStrip}>
        <CalendarStrip />
      </View>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ gap: 16 }}
      >
        <View style={{ gap: 16 }}>
          {/* <Text style={styles.textCalendarTime}>Thời Gian</Text> */}
          <View style={styles.viewCalendarTime}></View>
          <View style={styles.viewButtonType}>
            <TouchableOpacity style={styles.buttonType}>
              <Text style={styles.textButtonType}>Mỗi Ngày</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonType}>
              <Text style={styles.textButtonType}>Mỗi Tuần</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonType}>
              <Text style={styles.textButtonType}>Mỗi Tháng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.viewInformation}>
            <InputCustom placeholder="Họ và Tên" titleInput={"Họ và Tên"} />
            <InputCustom placeholder="Tuổi" titleInput={"Tuổi"} />
            <Text style={styles.textGender}>Giới Tính</Text>
            <View style={styles.viewGender}>
              <TouchableOpacity style={styles.buttonGender}>
                <Text style={styles.textButtonGender}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGender}>
                <Text style={styles.textButtonGender}>Nữ</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.viewNote}>
            <InputCustom placeholder="Ghi Chú" titleInput={"Ghi Chú"} />
          </View>
        </View>
      </ScrollView>
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
    marginTop: 16,
    backgroundColor: "#CAD6FF",
  },
  viewCalendarTime: {
    height: 200,
    backgroundColor: "#CAD6FF",
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 36,
  },
  textCalendarTime: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
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
    backgroundColor: "#2260FF",
    padding: 16,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 36,
  },
  textButtonGender: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewNote: {
    marginLeft: 16,
    marginRight: 16,
  },
  textNote: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
