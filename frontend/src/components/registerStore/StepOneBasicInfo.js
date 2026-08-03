import { useContext, useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  Alert,
} from "react-native";

import { RegisterStoreContext } from "../../context/RegisterStoreContext";

import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import PrimaryButton from "../common/PrimaryButton";
import AddressAutocomplete from "../common/AddressAutocomplete";
import LocationPicker from "./LocationPicker";

import {
  getCities,
  getLocalities,
  getNeighborhoods,
} from "../../services/storesService";

import {
  searchAddress,
} from "../../services/locationService";

export default function StepOneBasicInfo() {
  const {
    storeData,
    updateStoreData,
  } = useContext(RegisterStoreContext);

  const [cities, setCities] =
    useState([]);

  const [localities, setLocalities] =
    useState([]);

  const [neighborhoods, setNeighborhoods] =
    useState([]);

  useEffect(() => {
    loadCities();
  }, []);

  async function loadCities() {
    try {
      const data =
        await getCities();

      setCities(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadLocalities(city_id) {
    try {
      const data =
        await getLocalities(city_id);

      setLocalities(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadNeighborhoods(locality_id) {
    try {
      const data =
        await getNeighborhoods(locality_id);

      setNeighborhoods(data);
    } catch (error) {
      console.log(error);
    }
  }

  const selectedCity =
    cities.find(
      (city) =>
        city.city_id ===
        storeData.city_id
    );

  const selectedLocality =
    localities.find(
      (locality) =>
        locality.locality_id ===
        storeData.locality_id
    );

  async function handleSearchAddress() {

    if (!storeData.city_id) {
      Alert.alert(
        "Ciudad",
        "Selecciona primero una ciudad."
      );
      return;
    }

    if (!storeData.address.trim()) {
      Alert.alert(
        "Dirección",
        "Escribe una dirección."
      );
      return;
    }

    try {

      const result =
        await searchAddress({
          address:
            storeData.address,
          city:
            selectedCity?.name,
          locality:
            selectedLocality?.name,
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
    }

  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <InputField
        label="Nombre"
        placeholder="Nombre del establecimiento"
        value={storeData.name}
        onChangeText={(text) =>
          updateStoreData({
            name: text,
          })
        }
      />

      <InputField
        label="Descripción"
        placeholder="Describe tu establecimiento"
        multiline
        value={
          storeData.description
        }
        onChangeText={(text) =>
          updateStoreData({
            description: text,
          })
        }
      />

      <SelectField
        label="Ciudad"
        data={cities}
        labelField="name"
        valueField="city_id"
        value={storeData.city_id}
        placeholder="Selecciona una ciudad"
        onChange={(item) => {

          updateStoreData({
            city_id:
              item.city_id,
            locality_id:
              null,
            neighborhood_id:
              null,
          });

          setLocalities([]);
          setNeighborhoods([]);

          loadLocalities(
            item.city_id
          );

        }}
      />

      <SelectField
        label="Localidad"
        data={localities}
        labelField="name"
        valueField="locality_id"
        value={
          storeData.locality_id
        }
        placeholder="Selecciona una localidad"
        onChange={(item) => {

          updateStoreData({
            locality_id:
              item.locality_id,
            neighborhood_id:
              null,
          });

          setNeighborhoods([]);

          loadNeighborhoods(
            item.locality_id
          );

        }}
      />

      <SelectField
        label="Barrio"
        data={neighborhoods}
        labelField="name"
        valueField="neighborhood_id"
        value={
          storeData.neighborhood_id
        }
        placeholder="Selecciona un barrio"
        onChange={(item) =>
          updateStoreData({
            neighborhood_id:
              item.neighborhood_id,
          })
        }
      />

      <AddressAutocomplete
        onSearch={
          handleSearchAddress
        }
      />

      <Text style={styles.helperText}>
        {!storeData.city_id
          ? "🔘 Selecciona una ciudad antes de buscar la dirección."
          : "🟡 Escribe la dirección y pulsa la lupa."}
      </Text>

      <LocationPicker />

      <PrimaryButton
        title="Continuar"
        onPress={() => {
          console.log(
            storeData
          );
        }}
      />
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 50,
    },

    helperText: {
      color: "#8A8A8A",
      fontSize: 13,
      marginTop: -12,
      marginBottom: 18,
      paddingHorizontal: 2,
    },
  });