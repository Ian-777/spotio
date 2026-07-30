import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  RegisterStoreContext,
} from "../../context/RegisterStoreContext";

import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import PrimaryButton from "../common/PrimaryButton";
import LocationPicker from "./LocationPicker";
import AddressField from "../common/AddressField";

import {
  getCities,
  getLocalities,
  getNeighborhoods,
} from "../../services/storesService";

export default function StepOneBasicInfo() {

  const {
    storeData,
    updateStoreData,
  } = useContext(
    RegisterStoreContext
  );

  const [cities, setCities] =
    useState([]);

  const [
    localities,
    setLocalities,
  ] = useState([]);

  const [
    neighborhoods,
    setNeighborhoods,
  ] = useState([]);

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

  async function loadLocalities(
    city_id
  ) {

    try {

      const data =
        await getLocalities(
          city_id
        );

      setLocalities(data);

    } catch (error) {

      console.log(error);

    }

  }

  async function loadNeighborhoods(
    locality_id
  ) {

    try {

      const data =
        await getNeighborhoods(
          locality_id
        );

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

      <AddressField
        city={selectedCity?.name}
        locality={selectedLocality?.name}
        disabled={!storeData.city_id}
      />

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

  });