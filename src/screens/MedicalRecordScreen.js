import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";
import { useState } from "react";
import TextDate from "../components/TextDate";

export default function MedicalRecordScreen() {
  const [selectedTab, setSelectedTab] = useState(0);

  const buttons = [
    { id: 1, label: "Hồ Sơ Bệnh án" },
    { id: 2, label: "Hóa Đơn" },
    { id: 3, label: "Đơn Thuốc" },
    { id: 4, label: "Giấy Tờ Tùy Thân" },
  ];
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Thông Tin Bệnh Án"} iconBack={false} />
      <View style={styles.viewMedicalRecord}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.viewButtonMedicalRecord}
        >
          {buttons.map((button) => {
            const isActive = button.id === selectedTab;
            return (
              <TouchableOpacity
                key={button.id}
                style={[
                  styles.buttonMedicalRecord,
                  isActive && styles.buttonActive,
                ]}
                onPress={() => setSelectedTab(button.id)}
              >
                <Text
                  style={[
                    styles.textMedicalRecord,
                    isActive && styles.textActive,
                  ]}
                >
                  {button.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.viewContentMedicalRecord}>
            <View style={styles.viewContentMedicalRecordItem}>
              <View style={styles.viewContentMedicalRecordItemImage}>
                <Image
                  source={require("../assets/discovery.jpg")}
                  style={styles.imageMedicalRecord}
                />
              </View>
              <View style={styles.viewContentMedicalRecordItemText}>
                <Text style={styles.textMedicalRecord}>Hồ Sơ Bệnh Án</Text>
                <View>
                  <TextDate day="Chủ nhật" date="18/5" />
                  <TouchableOpacity style={styles.buttonDetailMedicalRecord}>
                    <Text style={styles.textDetailMedicalRecord}>
                      Chi Tiết{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContentMedicalRecordItem}>
              <View style={styles.viewContentMedicalRecordItemImage}>
                <Image
                  source={require("../assets/discovery.jpg")}
                  style={styles.imageMedicalRecord}
                />
              </View>
              <View style={styles.viewContentMedicalRecordItemText}>
                <Text style={styles.textMedicalRecord}>Hồ Sơ Bệnh Án</Text>
                <View>
                  <TextDate day="Chủ nhật" date="18/5" />
                  <TouchableOpacity style={styles.buttonDetailMedicalRecord}>
                    <Text style={styles.textDetailMedicalRecord}>
                      Chi Tiết{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContentMedicalRecordItem}>
              <View style={styles.viewContentMedicalRecordItemImage}>
                <Image
                  source={require("../assets/discovery.jpg")}
                  style={styles.imageMedicalRecord}
                />
              </View>
              <View style={styles.viewContentMedicalRecordItemText}>
                <Text style={styles.textMedicalRecord}>Hồ Sơ Bệnh Án</Text>
                <View>
                  <TextDate day="Chủ nhật" date="18/5" />
                  <TouchableOpacity style={styles.buttonDetailMedicalRecord}>
                    <Text style={styles.textDetailMedicalRecord}>
                      Chi Tiết{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContentMedicalRecordItem}>
              <View style={styles.viewContentMedicalRecordItemImage}>
                <Image
                  source={require("../assets/discovery.jpg")}
                  style={styles.imageMedicalRecord}
                />
              </View>
              <View style={styles.viewContentMedicalRecordItemText}>
                <Text style={styles.textMedicalRecord}>Hồ Sơ Bệnh Án</Text>
                <View>
                  <TextDate day="Chủ nhật" date="18/5" />
                  <TouchableOpacity style={styles.buttonDetailMedicalRecord}>
                    <Text style={styles.textDetailMedicalRecord}>
                      Chi Tiết{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContentMedicalRecordItem}>
              <View style={styles.viewContentMedicalRecordItemImage}>
                <Image
                  source={require("../assets/discovery.jpg")}
                  style={styles.imageMedicalRecord}
                />
              </View>
              <View style={styles.viewContentMedicalRecordItemText}>
                <Text style={styles.textMedicalRecord}>Hồ Sơ Bệnh Án</Text>
                <View>
                  <TextDate day="Chủ nhật" date="18/5" />
                  <TouchableOpacity style={styles.buttonDetailMedicalRecord}>
                    <Text style={styles.textDetailMedicalRecord}>
                      Chi Tiết{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  viewMedicalRecord: {
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  viewButtonMedicalRecord: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // overflow: "scroll",
  },
  buttonMedicalRecord: {
    display: "flex",
    gap: 10,
    backgroundColor: "#CAD6FF",
    padding: 10,
    borderRadius: 36,
  },
  textMedicalRecord: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonActive: {
    backgroundColor: "#2260FF",
  },
  textActive: {
    color: "#fff",
  },
  viewContentMedicalRecord: {
    backgroundColor: "#fff",
    padding: 10,
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
  textMedicalRecord: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "600",
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
});
