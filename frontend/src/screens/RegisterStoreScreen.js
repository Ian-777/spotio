import {
  SafeAreaView,
  StyleSheet,
} from "react-native-safe-area-context";

import {
  RegisterStoreProvider,
} from "../context/RegisterStoreContext";

import RegisterProgress from "../components/registerStore/RegisterProgress";

import StepOneBasicInfo from "../components/registerStore/StepOneBasicInfo";

export default function RegisterStoreScreen() {
  return (
    <RegisterStoreProvider>
      <SafeAreaView
        style={styles.container}
      >
        <RegisterProgress
          step={1}
          totalSteps={7}
          title="Información básica"
        />

        <StepOneBasicInfo />
      </SafeAreaView>
    </RegisterStoreProvider>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#0D0D0D",
    },
  });