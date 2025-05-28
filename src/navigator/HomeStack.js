import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

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
    </Stack.Navigator>
  );
}

export default HomeStack;
