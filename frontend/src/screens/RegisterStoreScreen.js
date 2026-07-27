import {
  SafeAreaView,
  StyleSheet,
} from "react-native";

import RegisterProgress from "../components/registerStore/RegisterProgress";

export default function RegisterStoreScreen(){

    return(

        <SafeAreaView
            style={styles.container}
        >

            <RegisterProgress
                step={1}
                totalSteps={7}
                title="Información básica"
            />

        </SafeAreaView>

    );

}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#0D0D0D",
    },

});