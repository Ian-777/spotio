import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";

/* AUTH */
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

/* APP */
import CityScreen from "../screens/CityScreen";
import LocalityScreen from "../screens/LocalityScreen";
import NeighborhoodScreen from "../screens/NeighborhoodScreen";
import CategoryScreen from "../screens/CategoryScreen";
import StoreScreen from "../screens/StoreScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userToken } = useContext(AuthContext);

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
        {!userToken ? (
          <>
            {/* AUTH */}

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Iniciar sesión",
              }}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "Crear cuenta",
              }}
            />
          </>
        ) : (
          <>
            {/* APP */}

            <Stack.Screen
              name="Cities"
              component={CityScreen}
              options={{ title: "Ciudades" }}
            />

            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ title: "Mis favoritos" }}
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}