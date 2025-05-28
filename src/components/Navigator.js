import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthStack from "../navigator/AuthStack";
import MyBottomTabs from "../navigator/MyBottomTabs";
import WaitingStack from "../navigator/WaitingStack";

const RootStack = createNativeStackNavigator();

// const Drawer = createDrawerNavigator();

export default function Navigator() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
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

      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <RootStack.Screen name="Waiting" component={WaitingStack} />
        ) : user ? (
          <RootStack.Screen name="Main" component={MyBottomTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
