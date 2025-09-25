import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import useCartStore from "../store/cartStore";

const products = [
  { id: "1", name: "Product A", price: 100 },
  { id: "2", name: "Product B", price: 150 },
  { id: "3", name: "Product C", price: 200 },
];

export default function ProductListScreen({ navigation }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} - ₹{item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate("Cart")} />
      <Button title="Users" onPress={() => navigation.navigate("Users")} />
      <Button
        title="Secure Token"
        onPress={() => navigation.navigate("SecureToken")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
});
