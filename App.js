import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "./src/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { NotificatedProvider } from "react-native-notificated";
import Navigator from "./src/components/Navigator";
import Toast from "react-native-toast-message";
import registerNNPushToken from "native-notify";

const queryClient = new QueryClient();

export default function App() {
  // registerNNPushToken(31457, "IGJSCdSZ6uMNkwadALZ08f");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <NotificatedProvider> */}
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <View style={styles.container}>
            <Navigator />
            <Toast />
          </View>
        </AppProvider>
      </QueryClientProvider>
      {/* </NotificatedProvider> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
