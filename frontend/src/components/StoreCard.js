import { View, Text, StyleSheet } from "react-native";

export default function StoreCard({ store }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{store.name}</Text>

      <Text style={styles.address}>{store.address}</Text>

      <View style={styles.row}>
        <Text
  style={[
    styles.badge,
    {
      backgroundColor:
        store.category_name === "Comer"
          ? "#3B82F6"
          : "#7C3AED",
    },
  ]}
>
  {store.category_name}
</Text>
      </View>

      <Text style={styles.meta}>
        {store.locality_name}
        {store.neighborhood_name
          ? ` • ${store.neighborhood_name}`
          : " • Sin barrio"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  address: {
    color: "#A1A1AA",
    fontSize: 13,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
  },

  badge: {
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
  },

  meta: {
    color: "#A1A1AA",
    fontSize: 12,
  },
});