import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import CityScreen from "../screens/CityScreen";
import LocalityScreen from "../screens/LocalityScreen";
import NeighborhoodScreen from "../screens/NeighborhoodScreen";
import CategoryScreen from "../screens/CategoryScreen";
import StoreScreen from "../screens/StoreScreen";




const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cities" component={CityScreen} />
        <Stack.Screen name="Localities" component={LocalityScreen} />
        <Stack.Screen name="Neighborhoods" component={NeighborhoodScreen} />
        <Stack.Screen name="Categories" component={CategoryScreen} />
        <Stack.Screen name="Stores" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}