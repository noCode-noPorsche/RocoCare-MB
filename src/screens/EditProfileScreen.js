import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderShown from "../components/HeaderShown";
import UploadAvatarIcon from "../assets/upload_avatar.svg";

export default function EditProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderShown HeaderName={"Chỉnh Sửa Hồ Sơ"} />
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
      </View>
      <View style={styles.viewEditProfile}>
        <View style={styles.viewPassword}>
          <Text style={styles.textInputProfile}>Họ Tên</Text>
          <View style={styles.viewInputProfile}>
            <TextInput
              placeholder=""
              // value={password}
              // onChangeText={setPassword}
              style={styles.inputPassword}
            />
          </View>
        </View>
        <View style={styles.viewPassword}>
          <Text style={styles.textInputProfile}>Số Điện Thoại</Text>
          <View style={styles.viewInputProfile}>
            <TextInput
              placeholder=""
              // value={password}
              // onChangeText={setPassword}
              style={styles.inputPassword}
            />
          </View>
        </View>
        <View style={styles.viewPassword}>
          <Text style={styles.textInputProfile}>Email</Text>
          <View style={styles.viewInputProfile}>
            <TextInput
              placeholder=""
              // value={password}
              // onChangeText={setPassword}
              style={styles.inputPassword}
            />
          </View>
        </View>
        <View style={styles.viewPassword}>
          <Text style={styles.textInputProfile}>Ngày sinh</Text>
          <View style={styles.viewInputProfile}>
            <TextInput
              placeholder=""
              // value={password}
              // onChangeText={setPassword}
              style={styles.inputPassword}
            />
          </View>
        </View>
      </View>
      <View style={styles.viewButtonEditProfile}>
        <TouchableOpacity style={styles.buttonEditProfile}>
          <Text style={styles.textEditProfile}>Cập Nhật</Text>
        </TouchableOpacity>
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
  viewAvatar: {
    display: "flex",
    flexDirection: "row",
    width: 100,
    height: 100,
    position: "relative",
  },
  viewPassword: {
    display: "flex",
    gap: 6,
  },
  textInputProfile: {
    fontSize: 18,
    fontWeight: "500",
  },
  viewInputProfile: {
    display: "flex",
    flexDirection: "row",
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#ECF1FF",
    padding: 12,
    borderRadius: 12,

    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 16,
    width: "100%",
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
    textAlign: "center",
    color: "#fff",
  },
});
