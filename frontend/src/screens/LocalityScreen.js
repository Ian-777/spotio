import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getLocalities } from "../api/api";

export default function LocalityScreen({ route, navigation }) {
  const { city_id } = route.params;

  const [localities, setLocalities] = useState([]);

  useEffect(() => {
    loadLocalities();
  }, []);

  const loadLocalities = async () => {
    const data = await getLocalities(city_id);
    setLocalities(data);
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
        Selecciona una localidad
      </Text>

      <FlatList
        data={localities}
        keyExtractor={(item) => item.locality_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Neighborhoods", {
                locality_id: item.locality_id,
                city_id,
              })
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