import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../screens/CalendarScreen";

const Stack = createNativeStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default CalendarStack;
