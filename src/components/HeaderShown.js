import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../assets/arrow_left";
import { useNavigation } from "@react-navigation/native";
import ArrowLeftWhiteIcon from "../assets/arrow_left_white.svg";

export default function HeaderShown({
  HeaderName,
  iconBack = true,
  style,
  iconType = "blue",
}) {
  const navigation = useNavigation();
  const ArrowIcon = iconType === "white" ? ArrowLeftWhiteIcon : ArrowLeftIcon;
  return (
    <View style={[styles.viewHeader, style]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconHeaderBack}
      >
        {iconBack && <ArrowIcon width={20} height={20} />}
      </TouchableOpacity>
      <Text style={[styles.textHeader, style]}>{HeaderName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconHeaderBack: {
    position: "absolute",
    left: 0,
  },
  textHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#2260FF",
  },
});
