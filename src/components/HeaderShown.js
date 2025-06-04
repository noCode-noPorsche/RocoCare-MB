import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../assets/arrow_left";
import { useNavigation } from "@react-navigation/native";

export default function HeaderShown({ HeaderName, iconBack = true, style }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.viewHeader, style]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconHeaderBack}
      >
        {iconBack && <ArrowLeftIcon width={20} heigh={20} />}
      </TouchableOpacity>
      <Text style={styles.textHeader}>{HeaderName}</Text>
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
