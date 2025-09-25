import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function SecureTokenScreen() {
  const [token, setToken] = useState(null);

  const saveToken = async () => {
    await SecureStore.setItemAsync("userToken", "12345-ABCDE-TOKEN");
    setToken("12345-ABCDE-TOKEN");
  };

  const loadToken = async () => {
    const stored = await SecureStore.getItemAsync("userToken");
    setToken(stored);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Token Screen</Text>
      {token ? <Text>Stored Token: {token}</Text> : <Text>No token saved</Text>}
      <Button title="Save Token" onPress={saveToken} />
      <Button title="Load Token" onPress={loadToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
