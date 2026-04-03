import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getNeighborhoods } from "../api/api";

export default function NeighborhoodScreen({ route, navigation }) {
  const { locality_id, city_id } = route.params;

  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    loadNeighborhoods();
  }, []);

  const loadNeighborhoods = async () => {
    const data = await getNeighborhoods(locality_id);
    setNeighborhoods(data);
  };

  const goNext = (neighborhood_id = null) => {
    navigation.navigate("Categories", {
      city_id,
      locality_id,
      neighborhood_id,
    });
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
        Selecciona un barrio
      </Text>

      {/* 🔥 Opción sin barrio (destacada) */}
      <TouchableOpacity
        onPress={() => goNext(null)}
        style={{
          padding: 15,
          backgroundColor: "#3B82F6", // azul (acción especial)
          marginBottom: 15,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>
          Sin barrio / No sé
        </Text>
      </TouchableOpacity>

      <FlatList
        data={neighborhoods}
        keyExtractor={(item) => item.neighborhood_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => goNext(item.neighborhood_id)}
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