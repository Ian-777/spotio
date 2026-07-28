import {
  createContext,
  useState,
} from "react";

export const RegisterStoreContext =
  createContext();

const initialStoreData = {
  name: "",
  address: "",

  city_id: null,
  locality_id: null,
  neighborhood_id: null,

  latitude: null,
  longitude: null,

  description: "",

  phone: "",
  whatsapp: "",
  email: "",
  website: "",

  categories: [],
  subcategories: [],
  tags: [],

  hours: [],

  coverImage: null,
  gallery: [],
};

export function RegisterStoreProvider({
  children,
}) {

  const [step, setStep] =
    useState(1);

  const [storeData, setStoreData] =
    useState(initialStoreData);

  const updateStoreData = (
    values
  ) => {

    setStoreData((prev) => ({
      ...prev,
      ...values,
    }));

  };

  const resetStoreData = () => {

    setStep(1);

    setStoreData(
      initialStoreData
    );

  };

  return (

    <RegisterStoreContext.Provider
      value={{

        step,
        setStep,

        storeData,
        updateStoreData,
        resetStoreData,

      }}
    >

      {children}

    </RegisterStoreContext.Provider>

  );

}