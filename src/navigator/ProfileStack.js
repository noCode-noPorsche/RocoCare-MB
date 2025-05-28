import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import SettingStack from "./SettingStack";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HelpScreen from "../screens/HelpScreen";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
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
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
