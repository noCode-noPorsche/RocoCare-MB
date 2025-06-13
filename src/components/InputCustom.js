import React from "react";
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
              style={styles.inputTextCustom}
              editable={editable}
              pointerEvents={editable ? "auto" : "none"}
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
    paddingRight: 40, // chừa chỗ cho icon
    fontSize: 16,
    width: "100%",
  },
  iconShowPassword: {
    position: "absolute",
    right: 12,
    top: "40%",
    transform: [{ translateY: -10 }],
    padding: 4,
  },
});
