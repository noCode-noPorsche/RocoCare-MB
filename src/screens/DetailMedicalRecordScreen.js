import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import medicalRecordApi from "../apis/MedicalRecordApi";
import { getTypeLabel } from "../utils/utils";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import { useState } from "react";
import RNModal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";

export default function DetailMedicalRecordScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  console.log(id, "Ne");
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["medical-record", id],
    queryFn: () => medicalRecordApi.getMedicalRecord({ searchById: id }),
  });

  // console.log(data.data.data.items);

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color="#2260FF" />
  //     </View>
  //   );
  // }

  // if (isError || !data?.data?.data) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.textCentered}>Không thể tải dữ liệu!</Text>
  //     </View>
  //   );
  // }

  const record = data?.data.data.items[0];

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Thông Tin Bệnh Án"} />
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2260FF" />
        </View>
      ) : isError || !data?.data?.data ? (
        <View style={styles.centered}>
          <Text style={styles.textCentered}>Không thể tải dữ liệu!</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <RNModal
            isVisible={showImageViewer}
            onBackdropPress={() => setShowImageViewer(false)}
            style={{ justifyContent: "center", margin: 0 }}
          >
            <ImageViewer
              imageUrls={[{ url: record.resourceUrl }]}
              enableSwipeDown
              onSwipeDown={() => setShowImageViewer(false)}
              backgroundColor="#ECF1FF"
              loadingRender={() => (
                <View style={styles.modalImageLoading}>
                  <ActivityIndicator size="large" color="#2260FF" />
                </View>
              )}
            />
          </RNModal>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Pressable onPress={() => setShowImageViewer(true)}>
              <View style={styles.imageContainer}>
                {isImageLoading && (
                  <ActivityIndicator
                    size="large"
                    color="#2260FF"
                    style={styles.imageLoadingIndicator}
                  />
                )}
                <Image
                  source={{ uri: record.resourceUrl }}
                  style={styles.image}
                  resizeMode="contain"
                  onLoadStart={() => setIsImageLoading(true)}
                  onLoadEnd={() => setIsImageLoading(false)}
                />
              </View>
            </Pressable>
            <Text style={styles.title}>{record.title}</Text>
            <Text style={styles.label}>
              Loại: {getTypeLabel(record.type) || "Không rõ"}
            </Text>
            <Text style={styles.label}>
              Ngày tạo:{" "}
              {new Date(record.createdTime).toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={styles.buttonEditMedical}
            onPress={() => {
              navigation.navigate("SetMedical", {
                recordToEdit: record,
              });
            }}
          >
            <Text style={styles.textEditMedical}>Chỉnh Sửa</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textCentered: {
    fontSize: 20,
    color: "#666",
    fontStyle: "italic",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  image: {
    width: 500,
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#ECF1FF",
  },
  imageLoadingIndicator: {
    position: "absolute",
    zIndex: 10,
  },
  modalImageLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonEditMedical: {
    backgroundColor: "#2260FF",
    paddingVertical: 20,
    marginHorizontal: 40,
    // marginTop: 100,
    // marginBottom: 20,
    borderRadius: 36,
    alignSelf: "center",
    width: "60%",
  },
  textEditMedical: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});
