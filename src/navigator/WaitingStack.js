import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaitingScreen from "../screens/WaitingScreen";

const Stack = createNativeStackNavigator();

function WaitingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Waiting"
        component={WaitingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default WaitingStack;
