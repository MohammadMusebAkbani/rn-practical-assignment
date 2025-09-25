import React, { useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import useCartStore from "../store/cartStore";
import { saveData, getData } from "../utils/storage";

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  useEffect(() => {
    saveData("cart", cart);
  }, [cart]);

  useEffect(() => {
    (async () => {
      const savedCart = await getData("cart");
      console.log("Loaded cart:", savedCart);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.name}</Text>
              <Button
                title="Remove"
                onPress={() => removeFromCart(item.id)}
              />
            </View>
          )}
        />
      )}
      <Button title="Clear Cart" onPress={clearCart} />
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
