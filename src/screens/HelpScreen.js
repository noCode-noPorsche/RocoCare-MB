import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import SearchIcon from "../assets/search_icon.svg";
import FacebookIcon from "../assets/fb.svg";
import InstagramIcon from "../assets/ig.svg";
import TakeCareIcon from "../assets/take_care.svg";
import WebsiteIcon from "../assets/web.svg";
import ArrowDownIcon from "../assets/arrow_down.svg";
import ArrowUpIcon from "../assets/arrow_up.svg";
import { Linking } from "react-native";

const faqs = [
  {
    id: "1",
    question: "Làm sao để thay đổi mật khẩu?",
    answer: "Bạn có thể thay đổi mật khẩu trong mục Cài đặt > Bảo mật.",
  },
  {
    id: "2",
    question: "Làm sao để cập nhật thông tin cá nhân?",
    answer: "Vào Hồ sơ > Chỉnh sửa để cập nhật thông tin cá nhân của bạn.",
  },
  {
    id: "3",
    question: "Ứng dụng hoạt động như thế nào?",
    answer: "Ứng dụng giúp theo dõi sức khỏe và cung cấp các tính năng hỗ trợ.",
  },
];

export default function HelpScreen() {
  const [activeTab, setActiveTab] = useState("FAQs");
  const [search, setSearch] = useState("");
  const [expandedContactIndex, setExpandedContactIndex] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const buttonItemsContact = [
    {
      label: "Dịch Vụ Khách Hàng",
      icon: TakeCareIcon,
      content: "Gọi hotline 1900 1234 hoặc email support@robocare.ai.vn",
    },
    {
      label: "Website",
      icon: WebsiteIcon,
      content: "Truy cập: https://robocare.ai.vn để biết thêm chi tiết",
    },
    {
      label: "Facebook",
      icon: FacebookIcon,
      content:
        "Theo dõi fanpage: https://www.facebook.com/profile.php?id=61576592141317",
    },
    {
      label: "Instagram",
      icon: InstagramIcon,
      content: "Xem Instagram tại: https://www.instagram.com/robocare.ai/",
    },
  ];

  return (
    <SafeAreaViewCustom style={{ paddingLeft: 0, paddingRight: 0 }}>
      <View style={styles.headerBox}>
        <HeaderShown
          HeaderName="Trung Tâm Trợ Giúp"
          style={{ color: "#fff" }}
          iconType="white"
        />
        <Text style={styles.helperText}>Tôi Có Thể Giúp Gì Cho Bạn?</Text>
        <View style={styles.viewSearchBox}>
          <TouchableOpacity>
            <SearchIcon width={20} height={20} />
          </TouchableOpacity>
          <TextInput
            placeholder="Tìm kiếm..."
            placeholderTextColor="#888"
            style={styles.textInputSearch}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "FAQs" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("FAQs")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "FAQs" && styles.activeTabText,
            ]}
          >
            FAQs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Contact" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Contact")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Contact" && styles.activeTabText,
            ]}
          >
            Liên Hệ Với Chúng Tôi
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "FAQs" ? (
          <FlatList
            data={filteredFaqs}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              const isExpanded = expandedFaqIndex === index;

              return (
                <View style={styles.viewContentFaq}>
                  <TouchableOpacity
                    style={styles.faqItemWithIcon}
                    onPress={() =>
                      setExpandedFaqIndex(isExpanded ? null : index)
                    }
                  >
                    <Text style={styles.faqText}>{item.question}</Text>
                    {isExpanded ? (
                      <ArrowUpIcon width={14} height={14} />
                    ) : (
                      <ArrowDownIcon width={14} height={14} />
                    )}
                  </TouchableOpacity>
                  {isExpanded && (
                    <View style={styles.expandedContentFaq}>
                      <Text style={styles.expandedTextFaq}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
        ) : (
          <View style={styles.viewButtonContact}>
            {buttonItemsContact.map((item, index) => {
              const IconComponent = item.icon;
              const isExpanded = expandedContactIndex === index;

              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.buttonContact}
                    onPress={() =>
                      setExpandedContactIndex(isExpanded ? null : index)
                    }
                  >
                    <View style={styles.iconButtonText}>
                      <View style={styles.iconButton}>
                        <IconComponent width={24} height={24} />
                      </View>
                      <Text style={styles.textFeature}>{item.label}</Text>
                    </View>
                    {isExpanded ? (
                      <ArrowUpIcon width={14} height={14} />
                    ) : (
                      <ArrowDownIcon width={14} height={14} />
                    )}
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.expandedContent}>
                      <Text style={styles.expandedText}>
                        {item.content.split(" ").map((word, i) => {
                          const isLink = word.startsWith("http");
                          return (
                            <Text
                              key={i}
                              style={isLink ? styles.linkText : null}
                              onPress={() => {
                                if (isLink) Linking.openURL(word);
                              }}
                            >
                              {word + " "}
                            </Text>
                          );
                        })}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  headerHelper: {
    backgroundColor: "#2260FF",
    borderRadius: 16,
    padding: 16,
    // marginTop: 12,
  },

  helperText: {
    color: "#ECF1FF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 30,
    marginTop: 12,
    textAlign: "center",
  },
  viewSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 23,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  textInputSearch: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 36,
    backgroundColor: "#CAD6FF",
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#2260FF",
  },
  tabText: {
    color: "#2260FF",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  faqItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  faqText: {
    fontSize: 18,
  },
  viewButtonContact: {
    marginTop: 8,
    gap: 22,
  },
  buttonContact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconButtonText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconButton: {
    backgroundColor: "#CAD6FF",
    borderRadius: 100,
    width: 30,
    height: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textFeature: {
    fontSize: 18,
    fontWeight: "500",
  },
  expandedContent: {
    marginTop: 4,
    marginLeft: 60,
    marginRight: 20,
    backgroundColor: "#F0F4FF",
    borderRadius: 12,
    padding: 10,
  },
  expandedText: {
    fontSize: 14,
    color: "#444",
  },
  linkText: {
    color: "#2260FF",
    textDecorationLine: "underline",
  },
  faqItemWithIcon: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ECF1FF",
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  expandedContentFaq: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 12,
    padding: 10,
  },
  expandedTextFaq: {
    fontSize: 16,
    color: "#444",
  },
  viewContentFaq: {
    marginBottom: 12,
  },
  headerBox: {
    backgroundColor: "#2260FF",
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 26,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
});
