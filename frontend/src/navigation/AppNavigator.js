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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0D0D0D",
          },

          headerTintColor: "#FFFFFF",

          headerTitleStyle: {
            fontWeight: "bold",
          },

          contentStyle: {
            backgroundColor: "#0D0D0D",
          },
        }}
      >
        <Stack.Screen
          name="Cities"
          component={CityScreen}
          options={{ title: "Ciudades" }}
        />

        <Stack.Screen
          name="Localities"
          component={LocalityScreen}
          options={{ title: "Localidades" }}
        />

        <Stack.Screen
          name="Neighborhoods"
          component={NeighborhoodScreen}
          options={{ title: "Barrios" }}
        />

        <Stack.Screen
          name="Categories"
          component={CategoryScreen}
          options={{ title: "Categorías" }}
        />

        <Stack.Screen
          name="Stores"
          component={StoreScreen}
          options={{ title: "Establecimientos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}