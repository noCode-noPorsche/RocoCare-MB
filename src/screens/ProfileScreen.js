import { useNavigation } from "@react-navigation/native";
import { useContext, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet from "react-native-actionsheet";
import ArrowRightIcon from "../assets/arrow_right.svg";
import LockIcon from "../assets/lock.svg";
import LogoutIcon from "../assets/logout.svg";
import ProfileIcon from "../assets/profile.svg";
import QuestionIcon from "../assets/question.svg";
import SettingIcon from "../assets/setting.svg";
import UploadAvatarIcon from "../assets/upload_avatar.svg";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { AppContext } from "../context/AppContext";
import { getAccessTokenFromLS } from "../utils/auth";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const actionSheetRef = useRef();
  const { reset, profile } = useContext(AppContext);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const handlePress = (index) => {
    if (index === 0) {
      // Xác nhận
      console.log("Confirmed");
      reset();
      const accessToken = getAccessTokenFromLS();
      console.log("logout", accessToken);
    } else if (index === 1) {
      // Huỷ
      console.log("Cancelled");
    }
  };

  const buttonItems = [
    {
      label: "Chỉnh Sửa Hồ Sơ",
      icon: ProfileIcon,
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      label: "Chính Sách Bảo Mật",
      icon: LockIcon,
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      label: "Cài Đặt",
      icon: SettingIcon,
      onPress: () => navigation.navigate("Setting"),
    },
    {
      label: "Trợ Giúp",
      icon: QuestionIcon,
      onPress: () => navigation.navigate("Help"),
    },
    {
      label: "Đăng Xuất",
      icon: LogoutIcon,
      onPress: showActionSheet,
    },
  ];

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Hồ Sơ"} iconBack={false} />
      <View style={styles.viewProfile}>
        <View style={styles.viewAvatar}>
          <Image
            source={{
              uri: profile.avatarUrl
                ? profile.avatarUrl
                : "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
            }}
            alt=""
            style={{ width: 100, height: 100, borderRadius: 50 }}
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
        <Text style={styles.textName}>{profile.fullName}</Text>
      </View>
      <View>
        <View style={styles.viewButtonProfile}>
          {buttonItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.buttonProfile}
                onPress={item.onPress}
              >
                <View style={styles.iconButtonText}>
                  <View style={styles.iconButton}>
                    <IconComponent width={24} height={24} />
                  </View>
                  <Text style={styles.textFeature}>{item.label}</Text>
                </View>

                <ArrowRightIcon width={14} height={14} />
              </TouchableOpacity>
            );
          })}
          <ActionSheet
            ref={actionSheetRef}
            title={"Bạn có chắc muốn xoá?"}
            options={["Xác nhận", "Huỷ"]}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={handlePress}
          />
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewProfile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  textName: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  viewButtonProfile: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 18,
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
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFeature: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },
  iconButtonText: {
    display: "flex",
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
