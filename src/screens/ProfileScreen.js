import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileIcon from "../assets/profile.svg";
import LogoutIcon from "../assets/logout.svg";
import QuestionIcon from "../assets/question.svg";
import SettingIcon from "../assets/setting.svg";
import LockIcon from "../assets/lock.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";
import UploadAvatarIcon from "../assets/upload_avatar.svg";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textProfile}>Hồ sơ</Text>
      <View style={styles.viewProfile}>
        <View style={styles.viewAvatar}>
          <Image
            source={{
              uri: "https://down-vn.img.susercontent.com/file/73d385bbc251f1b33423ef582593493b",
            }}
            alt=""
            style={{ width: 100, height: 100 }}
          />
          <UploadAvatarIcon
            width={22}
            height={22}
            style={{
              position: "absolute",
              bottom: 0,
              right: 5,
            }}
          />
        </View>
        <Text style={styles.textName}>Dustin</Text>
      </View>
      <View>
        <View style={styles.viewButtonProfile}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.buttonProfile}
          >
            <View style={styles.iconButton}>
              <ProfileIcon width={20} height={20} />
            </View>
            <Text style={styles.textFeature}>Hồ Sơ</Text>
            <ArrowRightIcon width={14} height={14} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonProfile}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <View style={styles.iconButton}>
              <LockIcon width={20} height={20} />
            </View>
            <Text style={styles.textFeature}>Chính Sách Bảo Mật</Text>
            <ArrowRightIcon width={14} height={14} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonProfile}
            onPress={() => navigation.navigate("Setting")}
          >
            <View style={styles.iconButton}>
              <SettingIcon width={20} height={20} />
            </View>
            <Text style={styles.textFeature}>Cài Đặt</Text>
            <ArrowRightIcon width={14} height={14} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonProfile}
            onPress={() => navigation.navigate("Help")}
          >
            <View style={styles.iconButton}>
              <QuestionIcon width={20} height={20} />
            </View>
            <Text style={styles.textFeature}>Trợ Giúp</Text>
            <ArrowRightIcon width={14} height={14} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonProfile}>
            <View style={styles.iconButton}>
              <LogoutIcon width={20} height={20} />
            </View>
            <Text style={styles.textFeature}>Đăng Xuất</Text>
            <ArrowRightIcon width={14} height={14} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  viewProfile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  textName: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  textProfile: {
    fontSize: 20,
    color: "#2260FF",
    textAlign: "center",
    fontWeight: "bold",
  },
  viewButtonProfile: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  viewAvatar: {
    display: "flex",
    flexDirection: "row",
    width: 100,
    height: 100,
    position: "relative",
  },
  buttonProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // elevation: 2, // Android shadow
    // shadowColor: "#000", // iOS shadow
  },
  iconButton: {
    backgroundColor: "#CAD6FF",
    borderRadius: 100,
    width: 30,
    height: 30,
    padding: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFeature: {
    fontSize: 16,
    fontWeight: "semibold",
  },
});
