import {
  useContext,
} from "react";

import {
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  RegisterStoreProvider,
  RegisterStoreContext,
} from "../context/RegisterStoreContext";

import RegisterProgress from "../components/registerStore/RegisterProgress";

import StepOneBasicInfo from "../components/registerStore/StepOneBasicInfo";

// Próximos pasos
// import StepTwoCategories from "../components/registerStore/StepTwoCategories";
// import StepThreeContact from "../components/registerStore/StepThreeContact";
// import StepFourSchedule from "../components/registerStore/StepFourSchedule";
// import StepFivePhotos from "../components/registerStore/StepFivePhotos";
// import StepSixLocation from "../components/registerStore/StepSixLocation";
// import StepSevenConfirm from "../components/registerStore/StepSevenConfirm";

function RegisterStoreContent() {

  const { step } =
    useContext(
      RegisterStoreContext
    );

  const titles = {
    1: "Información básica",
    2: "Categorías",
    3: "Contacto",
    4: "Horarios",
    5: "Fotos",
    6: "Ubicación",
    7: "Confirmar",
  };

  const renderStep = () => {

    switch (step) {

      case 1:
        return <StepOneBasicInfo />;

      // case 2:
      //   return <StepTwoCategories />;

      // case 3:
      //   return <StepThreeContact />;

      // case 4:
      //   return <StepFourSchedule />;

      // case 5:
      //   return <StepFivePhotos />;

      // case 6:
      //   return <StepSixLocation />;

      // case 7:
      //   return <StepSevenConfirm />;

      default:
        return <StepOneBasicInfo />;

    }

  };

  return (

    <SafeAreaView
      style={styles.container}
    >

      <RegisterProgress
        step={step}
        totalSteps={7}
        title={titles[step]}
      />

      {renderStep()}

    </SafeAreaView>

  );

}

export default function RegisterStoreScreen() {

  return (

    <RegisterStoreProvider>

      <RegisterStoreContent />

    </RegisterStoreProvider>

  );

}

const styles =
StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

});