import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import { useState } from "react";
import TextDate from "../components/TextDate";
import { useNavigation } from "@react-navigation/native";
import SearchIcon from "../assets/search_icon.svg";
import { Ionicons } from "react-native-vector-icons";
import { useQuery } from "@tanstack/react-query";
import medicalRecordApi from "../apis/MedicalRecordApi";
import { MedicalRecordType } from "../constants/enum";
import { getTypeLabel } from "../utils/utils";

export default function MedicalRecordScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("");

  const { data: medicalRecordData } = useQuery({
    queryKey: ["medical-record"],
    queryFn: () => medicalRecordApi.getMedicalRecord(),
    refetchOnMount: true,
  });

  const buttons = [
    { label: "Tất cả", value: "" },
    { label: "Hồ Sơ Bệnh Án", value: MedicalRecordType.MedicalRecords },
    { label: "Hóa Đơn", value: MedicalRecordType.Invoice },
    { label: "Đơn Thuốc", value: MedicalRecordType.Prescription },
    { label: "Giấy Tờ Tùy Thân", value: MedicalRecordType.ID },
  ];

  const filteredRecords = (
    medicalRecordData?.data?.data?.items &&
    Array.isArray(medicalRecordData.data.data.items)
      ? medicalRecordData.data.data.items
      : []
  ).filter((record) => (selectedTab ? record.type === selectedTab : true));

  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Thông Tin Bệnh Án"} iconBack={false} />
      <View style={styles.viewSearchBox}>
        <TouchableOpacity>
          <SearchIcon width={20} height={20} />
        </TouchableOpacity>
        <TextInput placeholder="" style={styles.textInputSearch} />
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={20} color="#2260FF" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewMedicalRecord}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.viewButtonMedicalRecord}
        >
          {buttons.map((type) => {
            const isActive = selectedTab === type.value;
            return (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.buttonMedicalRecord,
                  isActive && styles.buttonActive,
                ]}
                onPress={() => setSelectedTab(type.value)}
              >
                <Text
                  style={[
                    styles.textMedicalRecord,
                    isActive && styles.textActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 170 }}
        >
          <View style={styles.viewContentMedicalRecord}>
            {filteredRecords?.map((record) => {
              const createdDate = new Date(record.createdTime);
              const day = createdDate.toLocaleDateString("vi-VN", {
                weekday: "long",
              });
              const date = createdDate.toLocaleDateString("vi-VN");

              return (
                <View
                  key={record.id}
                  style={styles.viewContentMedicalRecordItem}
                >
                  <View style={styles.viewContentMedicalRecordItemImage}>
                    <Image
                      source={{ uri: record.resourceUrl }}
                      style={styles.imageMedicalRecord}
                    />
                  </View>
                  <View style={styles.viewContentMedicalRecordItemText}>
                    <Text style={styles.textMedicalRecord}>{record.title}</Text>
                    <Text>{getTypeLabel(record.type)}</Text>
                    <View style={styles.viewContentMedicalRecordItemTextDate}>
                      <TextDate style={{ padding: 4 }} day={day} date={date} />
                      <TouchableOpacity
                        style={styles.buttonDetailMedicalRecord}
                        onPress={() =>
                          navigation.navigate("DetailMedical", {
                            id: record.id,
                          })
                        }
                      >
                        <Text style={styles.textDetailMedicalRecord}>
                          Chi Tiết
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate("SetMedical");
        }}
      >
        <Text style={styles.floatingButtonText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewMedicalRecord: {
    display: "flex",
    // flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  viewButtonMedicalRecord: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    overflow: "scroll",
  },
  buttonMedicalRecord: {
    display: "flex",
    gap: 10,
    backgroundColor: "#CAD6FF",
    padding: 12,
    borderRadius: 36,
  },
  textMedicalRecord: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonActive: {
    backgroundColor: "#2260FF",
    display: "flex",
  },
  textActive: {
    color: "#fff",
  },
  viewContentMedicalRecord: {
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  viewContentMedicalRecordItem: {
    backgroundColor: "#CAD6FF",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  viewContentMedicalRecordItemImage: {
    width: 150,
    height: 150,
  },
  imageMedicalRecord: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  viewContentMedicalRecordItemText: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  buttonDetailMedicalRecord: {
    backgroundColor: "#2260FF",
    paddingVertical: 6,
    borderRadius: 36,
  },
  textDetailMedicalRecord: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 100,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    zIndex: 999,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
  },
  viewContentMedicalRecordItemTextDate: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  viewSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CAD6FF",
    borderRadius: 23,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInputSearch: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 23,
    paddingVertical: 8,
    fontSize: 16,
  },
});
