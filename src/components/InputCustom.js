import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InputCustom({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
  onPressIconShowPassword,
  titleInput,
  editable = true,
  onPressInput,
  multiline = false,
  numberOfLines = 1,
}) {
  return (
    <View style={styles.viewInputContainer}>
      <View style={styles.viewInputCustom}>
        <Text style={styles.textInputCustom}>{titleInput}</Text>
        <TouchableOpacity
          onPress={onPressInput}
          activeOpacity={editable ? 1 : 0.7}
        >
          <View style={styles.viewInputTextCustom}>
            <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              style={[
                styles.inputTextCustom,
                multiline && { minHeight: 100 }, // bạn có thể tách ra thành styles.inputTextArea nếu muốn
              ]}
              editable={editable}
              pointerEvents={editable ? "auto" : "none"}
              numberOfLines={numberOfLines}
              multiline={multiline} //  Bắt buộc phải có dòng này
            />
            {icon && (
              <TouchableOpacity
                style={styles.iconShowPassword}
                onPress={onPressIconShowPassword}
              >
                {icon}
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 6,
  },
  viewInputCustom: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  textInputCustom: {
    fontSize: 18,
    fontWeight: "500",
  },
  viewInputTextCustom: {
    display: "flex",
    flexDirection: "row",
  },
  //   inputTextCustom: {
  //     borderWidth: 1,
  //     borderColor: "#fff",
  //     backgroundColor: "#ECF1FF",
  //     padding: 12,
  //     borderRadius: 12,
  //   },
  inputTextCustom: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#ECF1FF",
    padding: 12,
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 40,
    fontSize: 16,
    width: "100%",
    textAlignVertical: "top", // ✅ fix placeholder + nội dung bắt đầu từ top
  },
  iconShowPassword: {
    position: "absolute",
    right: 12,
    top: "40%",
    transform: [{ translateY: -10 }],
    padding: 4,
  },
  inputTextArea: {
    minHeight: 100, // hoặc bạn có thể dùng height: 100
    textAlignVertical: "top", // để nội dung bắt đầu từ phía trên
  },
});
