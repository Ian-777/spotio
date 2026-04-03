import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getCategories } from "../api/api";

export default function CategoryScreen({ route, navigation }) {
  const { city_id, locality_id, neighborhood_id } = route.params;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleSelect = (category_id) => {
    navigation.navigate("Stores", {
      city_id,
      locality_id,
      neighborhood_id,
      category_id,
    });
  };

  const getColor = (name) => {
    if (name === "Comer") return "#3B82F6"; // azul
    if (name === "Beber") return "#7C3AED"; // morado
    return "#1E1E1E";
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0D0D0D" }}>
      
      <Text
        style={{
          fontSize: 22,
          color: "#FFFFFF",
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        ¿Qué quieres hacer?
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.category_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item.category_id)}
            style={{
              padding: 25,
              backgroundColor: getColor(item.name),
              marginBottom: 15,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}