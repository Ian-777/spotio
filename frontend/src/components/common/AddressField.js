import {
  useContext,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  MaterialIcons,
} from "@expo/vector-icons";

import {
  RegisterStoreContext,
} from "../../context/RegisterStoreContext";

import {
  searchAddress,
} from "../../services/locationService";

export default function AddressField({
  city,
  locality,
  disabled = false,
}) {

  const {

    storeData,

    updateStoreData,

  } = useContext(
    RegisterStoreContext
  );

  const [loading, setLoading] =
    useState(false);

  async function handleSearch() {

    if (!storeData.address.trim()) {

      Alert.alert(
        "Dirección",
        "Escribe una dirección."
      );

      return;

    }

    try {

      setLoading(true);

      const result =
        await searchAddress({

          address:
            storeData.address,

          city,

          locality,

        });

      if (!result) {

        Alert.alert(
          "No encontrada",
          "No encontramos esa dirección."
        );

        return;

      }

      updateStoreData({

        latitude:
          result.latitude,

        longitude:
          result.longitude,

      });

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No fue posible buscar la dirección."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <View style={styles.container}>

      <Text style={styles.label}>
        Dirección
      </Text>

      <View style={styles.inputContainer}>

        <TextInput

          style={styles.input}

          value={storeData.address}

          placeholder="Ej: Calle 123 #45-67"

          placeholderTextColor="#7C7C7C"

          onChangeText={(text)=>

            updateStoreData({
              address:text,
            })

          }

        />

        <TouchableOpacity

          onPress={handleSearch}

          disabled={loading}

        >

          {

            loading ?

            <ActivityIndicator
              color="#8B5CF6"
            />

            :

            <MaterialIcons
              name="search"
              size={24}
              color="#8B5CF6"
            />

          }

        </TouchableOpacity>

      </View>

    </View>

  );

}

const styles=StyleSheet.create({

container:{
marginBottom:20,
},

label:{
color:"#FFF",
fontSize:15,
fontWeight:"600",
marginBottom:8,
},

inputContainer:{

flexDirection:"row",

alignItems:"center",

backgroundColor:"#1A1A1A",

borderRadius:14,

borderWidth:1,

borderColor:"#2B2B2B",

paddingHorizontal:16,

},

input:{

flex:1,

height:54,

color:"#FFF",

fontSize:15,

},

});