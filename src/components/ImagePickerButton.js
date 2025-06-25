import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import uploadFile from "../utils/upload";

const ImagePickerButton = () => {
  const [imageUri, setImageUri] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  const handleSelectImage = () => {
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
          const fileName = asset.fileName || `image_${Date.now()}.jpg`;

          if (uri) {
            setImageUri(uri);
            try {
              const url = await uploadFile(uri, fileName);
              setDownloadURL(url);
              console.log("✅ Link Firebase:", url);
            } catch (error) {
              console.error("❌ Upload lỗi: ", error);
            }
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn ảnh từ thư viện" onPress={handleSelectImage} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : null}
      {downloadURL ? (
        <Text selectable style={styles.linkText}>
          Link Firebase: {downloadURL}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    resizeMode: "cover",
  },
  linkText: {
    marginTop: 16,
    color: "#2260FF",
    textAlign: "center",
  },
});

export default ImagePickerButton;
