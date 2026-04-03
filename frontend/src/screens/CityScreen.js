import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getCities } from "../api/api";

export default function CityScreen({ navigation }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    const data = await getCities();
    setCities(data);
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
        Selecciona una ciudad
      </Text>

      <FlatList
        data={cities}
        keyExtractor={(item) => item.city_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Localities", { city_id: item.city_id })
            }
            style={{
              padding: 15,
              backgroundColor: "#1E1E1E",
              marginBottom: 12,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}