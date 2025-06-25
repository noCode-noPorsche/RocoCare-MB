import {
  Alert,
  Linking,
  View,
  Image,
  Button,
  Platform,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import InputCustom from "../components/InputCustom";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import uploadFile from "../utils/upload";
import { Picker } from "@react-native-picker/picker";
import ImageViewer from "react-native-image-zoom-viewer";
import RNModal from "react-native-modal";

export default function SetMedicalRecordScreen() {
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const recordTypes = [
    { label: "Hồ sơ bệnh án", value: "medical" },
    { label: "Hóa đơn", value: "invoice" },
    { label: "Đơn thuốc", value: "prescription" },
    { label: "Giấy tờ tùy thân", value: "identity" },
  ];

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    resourceUrl: "",
    type: "",
  });

  const [showTypePicker, setShowTypePicker] = useState(false);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUploadImage = () => {
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
          const fileName = asset.fileName || `medical_${Date.now()}.jpg`;

          if (uri) {
            try {
              setIsUploading(true); // ✅ Bắt đầu loading
              const firebaseUrl = await uploadFile(uri, fileName);
              updateFormData("resourceUrl", firebaseUrl);
            } catch (error) {
              console.error("❌ Upload lỗi: ", error);
            } finally {
              setIsUploading(false); // ✅ Kết thúc loading
            }
          }
        }
      }
    );
  };

  const handleSubmit = () => {
    console.log("first", formData);
  };

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Tạo Thông Tin Bệnh Án"} />
      <View style={styles.container}>
        <InputCustom
          titleInput={"Tiêu đề"}
          value={formData.title}
          onChangeText={(val) => updateFormData("title", val)}
        />

        {/* Chọn loại bệnh án */}
        <Text style={styles.label}>Loại bệnh án</Text>
        {Platform.OS === "android" ? (
          <Picker
            selectedValue={formData.type}
            onValueChange={(val) => updateFormData("type", val)}
            mode="dropdown"
            style={styles.androidPicker}
          >
            <Picker.Item label="Chọn loại" value="" />
            {recordTypes.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        ) : (
          <>
            <Pressable
              onPress={() => setShowTypePicker(true)}
              style={styles.iosPickerPressable}
            >
              <Text style={styles.iosPickerText}>
                {formData.type === ""
                  ? "Chọn loại"
                  : recordTypes.find((item) => item.value === formData.type)
                      ?.label}
              </Text>
            </Pressable>
            <Modal visible={showTypePicker} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <View style={styles.modalHeader}>
                    <Pressable onPress={() => setShowTypePicker(false)}>
                      <Text style={styles.modalCancel}>Hủy</Text>
                    </Pressable>
                    <Pressable onPress={() => setShowTypePicker(false)}>
                      <Text style={styles.modalDone}>Xong</Text>
                    </Pressable>
                  </View>
                  <Picker
                    selectedValue={formData.type}
                    onValueChange={(val) => updateFormData("type", val)}
                  >
                    {recordTypes.map((item) => (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </Modal>
            {/* Button chọn ảnh */}
            <Button title="Tải ảnh bệnh án" onPress={handleUploadImage} />

            {/* Hiển thị ảnh demo sau khi upload */}
            {isUploading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#2260FF" />
              </View>
            )}

            {!isUploading && formData.resourceUrl ? (
              <>
                <Pressable onPress={() => setShowImageViewer(true)}>
                  <Image
                    source={{ uri: formData.resourceUrl }}
                    style={styles.imagePreview}
                  />
                </Pressable>

                <RNModal
                  isVisible={showImageViewer}
                  onBackdropPress={() => setShowImageViewer(false)}
                  style={{
                    justifyContent: "center",
                    margin: 0,
                  }}
                >
                  <ImageViewer
                    imageUrls={[{ url: formData.resourceUrl }]}
                    enableSwipeDown
                    onSwipeDown={() => setShowImageViewer(false)}
                    backgroundColor="#000"
                  />
                </RNModal>
              </>
            ) : null}
          </>
        )}
      </View>
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.buttonEditMedical}
          onPress={handleSubmit}
        >
          <Text style={styles.textEditMedical}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  imagePreview: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    // marginTop: 12,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  androidPicker: {
    backgroundColor: "#ECF1FF",
    borderRadius: 8,
  },
  iosPickerPressable: {
    backgroundColor: "#ECF1FF",
    borderRadius: 8,
    padding: 12,
  },
  iosPickerText: {
    fontSize: 16,
    color: "#333",
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
  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  buttonEditMedical: {
    backgroundColor: "#2260FF",
    paddingVertical: 15,
    paddingHorizontal: 80,
    margin: 20,
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 36,
  },
  textEditMedical: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  loadingOverlay: {
    position: "absolute",
    top: 450,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)", // mờ nền
    zIndex: 999,
  },
});
