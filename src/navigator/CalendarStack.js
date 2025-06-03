import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../screens/CalendarScreen";
import DetailCalendarScreen from "../screens/DetailCalendarScreen";
import SetCalendarScreen from "../screens/SetCalendarScreen";

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
      <Stack.Screen
        name="SetCalendar"
        component={SetCalendarScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailCalendar"
        component={DetailCalendarScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default CalendarStack;
