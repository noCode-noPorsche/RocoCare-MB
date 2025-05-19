import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "react-native-vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MedicalRecordScreen from "../screens/MedicalRecordScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SettingScreen from "../screens/SettingScreen";
import HelpScreen from "../screens/HelpScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Filter"
          component={FilterScreen}
          options={({ navigation }) => ({
            title: "Filter",
            // headerRight: () => (
            //   <Ionicons
            //     name="save"
            //     size={30}
            //     style={{ marginRight: 10 }}
            //     onPress={() => {
            //       alert("Filters saved!");
            //     }}
            //   />
            // ),
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={30}
                style={{ marginLeft: 10 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
          })}
        />
      </Drawer.Navigator> */}
      <MyBottomTabs />
    </NavigationContainer>
  );
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
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

function MedicalRecordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Medical" component={MedicalRecordScreen} />
    </Stack.Navigator>
  );
}

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
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Stack.Navigator>
  );
}

// function HomeStack() {
//   const navigation = useNavigation();

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerLeft: () => (
//             <Ionicons
//               name="menu"
//               size={30}
//               style={{ marginLeft: 10 }}
//               onPress={() => navigation.openDrawer()}
//             />
//           ),
//         }}
//       />
//       <Stack.Screen name="Products" component={ProductScreen} />
//       <Stack.Screen name="Details" component={DetailScreen} />
//     </Stack.Navigator>
//   );
// }
