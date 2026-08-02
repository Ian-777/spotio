import { useContext } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import {
  RegisterStoreContext,
} from "../../context/RegisterStoreContext";

export default function AddressAutocomplete() {

  const {
    storeData,
    updateStoreData,
  } = useContext(
    RegisterStoreContext
  );

  return (

    <View style={styles.container}>

      <Text style={styles.label}>
        Dirección
      </Text>

      <TextInput
        value={storeData.address}
        onChangeText={(text) =>
          updateStoreData({
            address: text,
          })
        }
        placeholder="Ej: Calle 123 #45-67"
        placeholderTextColor="#7C7C7C"
        style={styles.input}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginBottom: 20,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1A1A1A",
    color: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#2B2B2B",
  },

});