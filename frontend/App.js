import AppNavigator from "./src/navigation/AppNavigator";

import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";
import {
  RegisterStoreProvider,
} from "./src/context/RegisterStoreContext";

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <RegisterStoreProvider>
        <AppNavigator />
        </RegisterStoreProvider>
      </LocationProvider>
    </AuthProvider>
  );
}