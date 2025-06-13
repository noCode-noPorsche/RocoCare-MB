import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import InputCustom from "../components/InputCustom";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import GoogleSignIn from "../components/GoogleSignIn";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, Modal, Pressable } from "react-native";
import { formatDate } from "../utils/utils";
import { Picker } from "@react-native-picker/picker";
import { Gender } from "../constants/enum";
import { useMutation } from "@tanstack/react-query";
import authApi from "../apis/AuthApi";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: null,
    gender: Gender.Male,
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateChange = (_event, selectedDate) => {
    console.log(selectedDate);
    if (selectedDate) {
      updateFormData("dateOfBirth", selectedDate);
    } else {
      setShowDatePicker(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const registerAccountMutation = useMutation({
    mutationFn: (body) => authApi.register(body),
    onSuccess: () => {
      navigation.navigate("Login");
      console.log("success");
    },
    onError: (error) => {
      console.log("error", error?.response?.data);
      console.log("FULL ERROR >>>", JSON.stringify(error, null, 2));
    },
  });

  const handleRegister = () => {
    const registerData = {
      userName: formData.email.trim(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
    };
    console.log(registerData);
    registerAccountMutation.mutate(registerData);
  };

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Tạo Tài Khoản"} />
      <InputCustom
        placeholder="Họ Tên"
        titleInput="Họ Tên"
        value={formData.fullName}
        onChangeText={(value) => updateFormData("fullName", value)}
      />
      <InputCustom
        placeholder="example@gmail.com"
        titleInput="Email"
        value={formData.email}
        onChangeText={(value) => updateFormData("email", value)}
      />
      <InputCustom
        placeholder="0909090909"
        titleInput="Số Điện Thoại"
        value={formData.phoneNumber}
        onChangeText={(value) => updateFormData("phoneNumber", value)}
      />
      <InputCustom
        placeholder="************"
        titleInput="Mật Khẩu"
        value={formData.password}
        onChangeText={(value) => updateFormData("password", value)}
        secureTextEntry={!showPassword}
        icon={
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#666"
          />
        }
        onPressIconShowPassword={toggleShowPassword}
      />
      <InputCustom
        placeholder="************"
        titleInput="Nhập Lại Mật Khẩu"
        value={formData.confirmPassword}
        onChangeText={(value) => updateFormData("confirmPassword", value)}
        secureTextEntry={!showConfirmPassword}
        icon={
          <Ionicons
            name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#666"
          />
        }
        onPressIconShowPassword={toggleShowConfirmPassword}
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
          {/* <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={formData.gender}
              onValueChange={(itemValue) => updateFormData("gender", itemValue)}
              style={styles.picker}
              dropdownIconColor="#333"
            >
              <Picker.Item label="Nam" value={Gender.Male} />
              <Picker.Item label="Nữ" value={Gender.Female} />
            </Picker>
          </View> */}
          {Platform.OS === "android" ? (
            <Picker
              selectedValue={formData.gender}
              onValueChange={(itemValue) => updateFormData("gender", itemValue)}
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
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
          color="#2260FF"
        />
        <Text style={styles.labelText}>
          Để tiếp tục, bạn cần đồng ý với{" "}
          <Text style={styles.textCheckbox}>Điều khoản sử dụng</Text> và{" "}
          <Text style={styles.textCheckbox}>Chính sách bảo mật</Text> của ứng
          dụng RoboCare.
        </Text>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={handleRegister}
        >
          <Text style={styles.textButtonRegister}>Đăng Ký</Text>
        </TouchableOpacity>
        <Text style={styles.textOr}>hoặc đăng ký với</Text>
        <GoogleSignIn />
      </View>
      <Text style={styles.textRegister}>
        Bạn đã có tài khoản?{" "}
        <Text
          style={styles.textRegisterLink}
          onPress={() => navigation.navigate("Login")}
        >
          Đăng nhập
        </Text>
      </Text>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  labelText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  textCheckbox: {
    fontWeight: "bold",
    color: "#2260FF",
  },
  viewButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  buttonRegister: {
    backgroundColor: "#2260FF",
    padding: 16,
    borderRadius: 36,
    width: "65%",
  },
  textButtonRegister: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  textOr: {
    fontSize: 12,
    fontWeight: "semibold",
    textAlign: "center",
  },
  textRegister: {
    textAlign: "center",
  },
  textRegisterLink: {
    color: "#2260FF",
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
