import { StyleSheet, Text, View, ScrollView } from "react-native";
import HeaderShown from "../components/HeaderShown";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName="Chính Sách Bảo Mật" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.lastUpdated}>Cập nhật lần cuối: 01/07/2025</Text>

        <Text style={styles.paragraph}>
          Chúng tôi cam kết bảo vệ sự riêng tư và thông tin cá nhân của bạn.
          Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và
          bảo vệ dữ liệu của người dùng trong quá trình sử dụng ứng dụng.
        </Text>

        <Text style={styles.subHeading}>Điều Khoản & Điều Kiện</Text>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Chúng tôi chỉ thu thập những thông tin cần thiết nhằm phục vụ quá
            trình chăm sóc sức khỏe và lưu trữ hồ sơ y tế cho người dùng.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Mọi thông tin cá nhân, bao gồm dữ liệu sức khỏe, được mã hoá và lưu
            trữ an toàn trên hệ thống máy chủ được bảo mật.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Chúng tôi cam kết không chia sẻ, bán hoặc chuyển giao dữ liệu người
            dùng cho bên thứ ba, trừ khi có sự đồng ý rõ ràng từ người dùng hoặc
            theo yêu cầu của pháp luật.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Người dùng có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa dữ liệu cá
            nhân bất kỳ lúc nào thông qua phần Cài Đặt hoặc liên hệ hỗ trợ.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Việc sử dụng ứng dụng đồng nghĩa với việc người dùng đồng ý với các
            điều khoản và chính sách bảo mật được nêu tại đây.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Chúng tôi có quyền thay đổi hoặc cập nhật các điều khoản bảo mật bất
            kỳ lúc nào. Thông báo sẽ được gửi qua ứng dụng nếu có thay đổi quan
            trọng.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Người dùng cần đảm bảo thông tin cung cấp là chính xác và chịu trách
            nhiệm với dữ liệu mình đăng tải.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            Trong trường hợp phát hiện hành vi vi phạm hoặc sử dụng sai mục
            đích, chúng tôi có quyền tạm ngưng hoặc xóa tài khoản người dùng để
            đảm bảo an toàn hệ thống.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  lastUpdated: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 16,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 24,
    lineHeight: 24,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2260FF",
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    lineHeight: 24,
    marginRight: 8,
    color: "#2260FF",
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
