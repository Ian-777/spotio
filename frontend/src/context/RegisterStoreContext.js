import {
  createContext,
  useState,
} from "react";

export const RegisterStoreContext =
  createContext();

export function RegisterStoreProvider({
  children,
}) {
  const [storeData, setStoreData] =
    useState({
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
    });

  const updateStoreData = (
    values
  ) => {
    setStoreData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const resetStoreData = () => {
    setStoreData({
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
    });
  };

  return (
    <RegisterStoreContext.Provider
      value={{
        storeData,
        updateStoreData,
        resetStoreData,
      }}
    >
      {children}
    </RegisterStoreContext.Provider>
  );
}