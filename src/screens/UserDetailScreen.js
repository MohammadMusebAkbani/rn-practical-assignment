import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: 'Loading...',
    });

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        // Set the page title to the user's name
        navigation.setOptions({
          title: data.name,
        });
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        navigation.setOptions({
          title: 'Error Loading User',
        });
      });
  }, [id, navigation]);

  if (!user) return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Website:</Text>
          <Text style={styles.value}>{user.website}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>{user.company?.name}</Text>
        </View>
        {user.address && (
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address:</Text>
            <Text style={styles.addressText}>
              {user.address.street}, {user.address.suite}
            </Text>
            <Text style={styles.addressText}>
              {user.address.city}, {user.address.zipcode}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 80,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  addressContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
});