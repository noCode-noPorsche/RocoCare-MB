import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import CalendarStack from "./CalendarStack";
import MedicalRecordStack from "./MedicalRecordStack";
import ProfileStack from "./ProfileStack";
import { Ionicons } from "react-native-vector-icons";
import { View } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function getTabBarStyle(route, hideScreens) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";

  if (hideScreens.includes(routeName)) {
    return { display: "none" };
  }

  return {
    position: "absolute",
    bottom: 20,
    elevation: 5,
    backgroundColor: "#2260FF",
    borderRadius: 36,
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  };
}

function MyBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Medical") {
            iconName = focused ? "reader" : "reader-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={iconName} size={30} color={color} />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#cfe3ff",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: getTabBarStyle(route, [
            "Notification",
            "Setting",
            "AnotherHomeScreen",
          ]),
        })}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: getTabBarStyle(route, ["SetCalendar", "DetailCalendar"]),
        })}
      />
      <Tab.Screen
        name="Medical"
        component={MedicalRecordStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: getTabBarStyle(route, ["DetailMedical", "SetMedical"]),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: getTabBarStyle(route, [
            "EditProfile",
            "PrivacyPolicy",
            "Setting",
            "Help",
          ]),
        })}
      />
    </Tab.Navigator>
  );
}

export default MyBottomTabs;
