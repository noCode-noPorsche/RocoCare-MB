import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UploadAvatarIcon from "../assets/upload_avatar.svg";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function EditProfileScreen() {
  const { profile } = useContext(AppContext);

  const [fullName, setFullName] = useState(profile.fullName || "");
  const [phone, setPhone] = useState(profile.phoneNumber || "");
  const [email, setEmail] = useState(profile.email || "");
  const [dob, setDob] = useState(profile.dateOfBirth || "");
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Chỉnh Sửa Hồ Sơ"} />
      <View style={styles.viewProfile}>
        <View style={styles.viewAvatar}>
          <Image
            source={{
              uri: profile.avatarUrl,
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
      </View>
      <View style={styles.viewEditProfile}>
        <InputCustom
          placeholder="Họ Tên"
          value={fullName}
          titleInput="Họ Tên"
        />
        <InputCustom
          placeholder="0909090909"
          value={phone}
          titleInput="Số Điện Thoại"
        />
        <InputCustom
          placeholder="example@gmail.com"
          value={email}
          titleInput="Email"
        />
        <InputCustom
          placeholder="DD/MM/YYYY"
          value={dob}
          titleInput="Ngày sinh"
        />
      </View>
      <View style={styles.viewButtonEditProfile}>
        <TouchableOpacity style={styles.buttonEditProfile}>
          <Text style={styles.textEditProfile}>Cập Nhật</Text>
        </TouchableOpacity>
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
  viewAvatar: {
    display: "flex",
    flexDirection: "row",
    width: 100,
    height: 100,
    position: "relative",
  },
  viewEditProfile: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  viewButtonEditProfile: {},
  buttonEditProfile: {
    backgroundColor: "#2260FF",
    padding: 15,
    margin: 20,
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 36,
  },
  textEditProfile: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});
