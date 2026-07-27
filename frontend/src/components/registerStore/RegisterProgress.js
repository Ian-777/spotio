import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function RegisterProgress({
  step,
  totalSteps,
  title,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.stepText}>
        Paso {step} de {totalSteps}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.barBackground}>

        <View
          style={[
            styles.bar,
            {
              width: `${
                (step / totalSteps) *
                100
              }%`,
            },
          ]}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    paddingHorizontal:20,
    paddingTop:20,
    paddingBottom:10,
    backgroundColor:"#0D0D0D",
  },

  stepText:{
    color:"#8B5CF6",
    fontSize:14,
    fontWeight:"700",
  },

  title:{
    color:"#FFF",
    fontSize:28,
    fontWeight:"bold",
    marginTop:6,
    marginBottom:18,
  },

  barBackground:{
    height:8,
    backgroundColor:"#2A2A2A",
    borderRadius:20,
    overflow:"hidden",
  },

  bar:{
    height:"100%",
    backgroundColor:"#8B5CF6",
    borderRadius:20,
  },

});