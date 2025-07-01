import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  Pressable,
} from "react-native";
import UploadAvatarIcon from "../assets/upload_avatar.svg";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Gender } from "../constants/enum";
import { formatDate } from "../utils/utils";
import { useMutation } from "@tanstack/react-query";
import authApi from "../apis/AuthApi";
import { useNavigation } from "expo-router";
import uploadFile from "../utils/upload";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";

export default function EditProfileScreen() {
  const { profile, setProfile } = useContext(AppContext);
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    phoneNumber: profile.phoneNumber,
    email: profile.email,
    dateOfBirth: profile.dateOfBirth
      ? new Date(profile.dateOfBirth)
      : new Date(),
    gender: profile.gender,
    avatarUrl: profile.avatarUrl || "",
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeAvatar = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      async (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode === "permission") {
          Alert.alert(
            "Quyền bị từ chối",
            "Vui lòng cấp quyền truy cập thư viện ảnh trong Cài đặt.",
            [
              { text: "Hủy", style: "cancel" },
              { text: "Mở Cài đặt", onPress: () => Linking.openSettings() },
            ]
          );
        } else if (response.errorCode) {
          console.error("Lỗi: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const uri = asset.uri;
          const fileName = asset.fileName || `avatar_${Date.now()}.jpg`;

          if (uri) {
            try {
              const firebaseUrl = await uploadFile(uri, fileName);
              updateFormData("avatarUrl", firebaseUrl); // Cập nhật vào form
            } catch (error) {
              console.error("❌ Upload lỗi: ", error);
            }
          }
        }
      }
    );
  };

  const handleDateChange = (_event, selectedDate) => {
    console.log(selectedDate);
    if (selectedDate) {
      updateFormData("dateOfBirth", selectedDate);
    } else {
      setShowDatePicker(false);
    }
  };

  const updateAccountMutation = useMutation({
    mutationFn: (body) => authApi.update(body),
    onSuccess: (data) => {
      setProfile(data.data.data);
      navigation.goBack();
      Toast.show({
        type: "success",
        text1: "Thành công!",
        text2: "Cập nhật hồ sơ thành công!",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Thất bại!",
        text2: "Cập nhật hồ sơ thất bại!",
      });
      console.log("error", error?.response?.data);
      console.log("FULL ERROR >>>", JSON.stringify(error, null, 2));
    },
  });

  const handleUpdate = () => {
    const updateFormData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      avatarUrl: formData.avatarUrl,
    };
    updateAccountMutation.mutate(updateFormData);
  };

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Chỉnh Sửa Hồ Sơ"} />
      <View style={styles.viewProfile}>
        <View style={styles.viewAvatar}>
          <TouchableOpacity
            style={styles.viewAvatar}
            onPress={handleChangeAvatar}
          >
            <Image
              source={{
                uri: formData.avatarUrl
                  ? formData.avatarUrl
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
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewEditProfile}>
        <InputCustom
          placeholder="Họ Tên"
          titleInput="Họ Tên"
          value={formData.fullName}
          onChangeText={(value) => updateFormData("fullName", value)}
        />
        <InputCustom
          placeholder="0909090909"
          titleInput="Số Điện Thoại"
          value={formData.phoneNumber}
          onChangeText={(value) => updateFormData("phoneNumber", value)}
        />
        <InputCustom
          placeholder="example@gmail.com"
          value={formData.email}
          editable={false}
          titleInput="Email"
        />
        <View style={styles.rowContainer}>
          <View style={styles.datePickerContainer}>
            <InputCustom
              placeholder="DD/MM/YYYY"
              titleInput="Ngày sinh"
              value={formatDate(formData.dateOfBirth)}
              editable={false}
              onPressInput={() => setShowDatePicker(true)}
            />
          </View>
          <View style={styles.genderPickerContainer}>
            <Text style={styles.genderLabel}>Giới tính</Text>
            {Platform.OS === "android" ? (
              <Picker
                selectedValue={formData.gender}
                onValueChange={(itemValue) =>
                  updateFormData("gender", itemValue)
                }
                style={styles.picker}
                mode="dropdown"
                dropdownIconColor="#333"
              >
                <Picker.Item label="Nam" value={Gender.Male} />
                <Picker.Item label="Nữ" value={Gender.Female} />
              </Picker>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.pickerWrapper}
                  onPress={() => setShowGenderPicker(true)}
                >
                  <Text style={styles.pickerText}>
                    {formData.gender === Gender.Male ? "Nam" : "Nữ"}
                  </Text>
                </TouchableOpacity>

                <Modal
                  visible={showGenderPicker}
                  transparent
                  animationType="slide"
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                      <View style={styles.modalHeader}>
                        <Pressable onPress={() => setShowGenderPicker(false)}>
                          <Text style={styles.modalCancel}>Hủy</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowGenderPicker(false)}>
                          <Text style={styles.modalDone}>Xong</Text>
                        </Pressable>
                      </View>
                      <Picker
                        selectedValue={formData.gender}
                        onValueChange={(itemValue) =>
                          updateFormData("gender", itemValue)
                        }
                      >
                        <Picker.Item label="Nam" value={Gender.Male} />
                        <Picker.Item label="Nữ" value={Gender.Female} />
                      </Picker>
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </View>
        </View>
        {showDatePicker && Platform.OS === "android" && (
          <DateTimePicker
            value={formData.dateOfBirth || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        {/* Modal iOS */}
        <Modal
          visible={showDatePicker && Platform.OS === "ios"}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.modalCancel}>Hủy</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.modalDone}>Xong</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={formData.dateOfBirth || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                style={{ backgroundColor: "white" }}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.viewButtonEditProfile}>
        <TouchableOpacity
          style={styles.buttonEditProfile}
          onPress={handleUpdate}
        >
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  modalCancel: {
    color: "#FF3B30",
    fontSize: 16,
  },
  modalDone: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  datePickerContainer: {
    flex: 1.2,
  },
  genderPickerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  genderLabel: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "500",
  },
  pickerWrapper: {
    backgroundColor: "#ECF1FF",
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 10,
  },
  picker: {
    height: 44,
    width: "100%",
  },
  pickerText: {
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
});
