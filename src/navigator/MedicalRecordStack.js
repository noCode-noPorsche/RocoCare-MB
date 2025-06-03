import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalRecordScreen from "../screens/MedicalRecordScreen";
import DetailMedicalRecordScreen from "../screens/DetailMedicalRecordScreen";

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
      <Stack.Screen
        name="MedicalDetail"
        component={DetailMedicalRecordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MedicalRecordStack;
