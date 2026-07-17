import AppNavigator from "./src/navigation/AppNavigator";

import { AuthProvider } from "./src/context/AuthContext";
import { LocationProvider } from "./src/context/LocationContext";

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <AppNavigator />
      </LocationProvider>
    </AuthProvider>
  );
}