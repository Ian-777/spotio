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
import StoreDetailsScreen from "../screens/StoreDetailsScreen";
import RegisterStoreScreen from "../screens/RegisterStoreScreen";

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
            {/* ===========================
                AUTH
            =========================== */}

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

            {/*
              ============================================
              TEMPORAL
              --------------------------------------------
              Esta pantalla sólo existe mientras construimos
              el asistente de registro de establecimientos.

              Cuando exista el Perfil del usuario,
              este acceso debe ELIMINARSE de aquí y
              abrirse únicamente desde:

                  Perfil
                    ↓
              Registrar establecimiento

              NO borrar hasta terminar el flujo completo
              de registro de tiendas.
              ============================================
            */}

            <Stack.Screen
              name="RegisterStore"
              component={RegisterStoreScreen}
              options={{
                title: "Registrar establecimiento",
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            {/* ===========================
                APP
            =========================== */}

            <Stack.Screen
              name="Cities"
              component={CityScreen}
              options={{
                title: "Ciudades",
              }}
            />

            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{
                title: "Mis favoritos",
              }}
            />

            <Stack.Screen
              name="Localities"
              component={LocalityScreen}
              options={{
                title: "Localidades",
              }}
            />

            <Stack.Screen
              name="Neighborhoods"
              component={NeighborhoodScreen}
              options={{
                title: "Barrios",
              }}
            />

            <Stack.Screen
              name="Categories"
              component={CategoryScreen}
              options={{
                title: "Categorías",
              }}
            />

            <Stack.Screen
              name="Stores"
              component={StoreScreen}
              options={{
                title: "Establecimientos",
              }}
            />

            <Stack.Screen
              name="StoreDetails"
              component={StoreDetailsScreen}
              options={{
                title: "Detalles",
              }}
            />

            <Stack.Screen
              name="RegisterStore"
              component={RegisterStoreScreen}
              options={{
                title: "Registrar establecimiento",
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}