import { useContext, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import {
  RegisterStoreContext,
} from "../../context/RegisterStoreContext";

export default function AddressAutocomplete({
  onSearch,
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
    if (!onSearch) return;

    try {
      setLoading(true);

      await onSearch();
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
          onChangeText={(text) =>
            updateStoreData({
              address: text,
            })
          }
        />

        <TouchableOpacity
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#8B5CF6"
            />
          ) : (
            <MaterialIcons
              name="search"
              size={24}
              color="#8B5CF6"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },

    label: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 8,
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",

      backgroundColor:
        "#1A1A1A",

      borderRadius: 14,

      borderWidth: 1,

      borderColor: "#2B2B2B",

      paddingHorizontal: 16,
    },

    input: {
      flex: 1,

      height: 54,

      color: "#FFFFFF",

      fontSize: 15,
    },
  });