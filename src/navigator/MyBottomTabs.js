import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import CalendarStack from "./CalendarStack";
import MedicalRecordStack from "./MedicalRecordStack";
import ProfileStack from "./ProfileStack";
import { Ionicons } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

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
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="home-outline" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="home-outline" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen
        name="Medical"
        component={MedicalRecordStack}
        options={{
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="home-outline" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="heart-outline" size={size} color={color} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyBottomTabs;
