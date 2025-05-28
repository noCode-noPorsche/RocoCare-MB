import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalRecordScreen from "../screens/MedicalRecordScreen";

const Stack = createNativeStackNavigator();

function MedicalRecordStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Medical"
        component={MedicalRecordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MedicalRecordStack;
