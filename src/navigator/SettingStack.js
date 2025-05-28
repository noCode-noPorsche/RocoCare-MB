import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../screens/SettingScreen";
import SettingNotificationScreen from "../screens/SettingNotificationScreen";
import ManagePasswordScreen from "../screens/ManagePasswordScreen";
import EmergencySettingScreen from "../screens/EmergencySettingScreen";

const Stack = createNativeStackNavigator();

function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingNotification"
        component={SettingNotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManagePassword"
        component={ManagePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmergencySetting"
        component={EmergencySettingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStack;
