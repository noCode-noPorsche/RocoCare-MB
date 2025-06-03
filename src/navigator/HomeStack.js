import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SettingScreen from "../screens/SettingScreen";
import SettingStack from "./SettingStack";

const Stack = createNativeStackNavigator();

function HomeStack() {
  //   const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
        // options={{
        //   headerLeft: () => (
        //     <Ionicons
        //       name="menu"
        //       size={30}
        //       style={{ marginLeft: 10 }}
        //       onPress={() => navigation.openDrawer()}
        //     />
        //   ),
        // }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
