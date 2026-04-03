import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { searchStores } from "../api/api";

import StoreCard from "../components/StoreCard";

export default function StoreScreen({ route }) {
  const { city_id, locality_id, neighborhood_id, category_id } = route.params;

  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    const data = await searchStores({
      city_id,
      locality_id,
      neighborhood_id,
      category_id,
    });

    setStores(data);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0D0D0D" }}>
      
      <Text
        style={{
          fontSize: 22,
          color: "#FFFFFF",
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        Resultados
      </Text>

      {stores.length === 0 ? (
        <Text style={{ color: "#A1A1AA" }}>
          No hay resultados
        </Text>
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(item) => item.store_id.toString()}
          renderItem={({ item }) => (
            <StoreCard store={item} />
          )}
        />
      )}
    </View>
  );
}