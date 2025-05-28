import { StyleSheet, Text, TextInput, View } from "react-native";
import SafeAreaViewCustom from "../components/SafeAreaViewCustom";
import HeaderShown from "../components/HeaderShown";

export default function LoginScreen() {
  return (
    <SafeAreaViewCustom>
      <HeaderShown HeaderName={"Xin Chào"} />
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <Text>Email</Text>
          <TextInput />
        </View>
      </View>
    </SafeAreaViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
