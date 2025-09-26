import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { getData } from "../utils/storage";
import NetInfo from "@react-native-community/netinfo";

export default function UserDetailScreen({ route, navigation }) {
  const { id, userData } = route.params;
  const [user, setUser] = useState(userData || null);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(!userData);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      navigation.setOptions({
        title: "Loading...",
      });

      // Check network connectivity
      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected;

      if (!isConnected) {
        // Try to get user from cached data
        const cachedUsers = await getData("cached_users");
        if (cachedUsers) {
          const cachedUser = cachedUsers.find(
            (u) => u.id.toString() === id.toString()
          );
          if (cachedUser) {
            setUser(cachedUser);
            setIsOffline(true);
            navigation.setOptions({
              title: cachedUser.name,
            });
            console.log("Loaded user from cache (offline mode)");
            return;
          }
        }
        throw new Error("No internet connection and user not found in cache");
      }

      // Fetch from API when online
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      setIsOffline(false);
      navigation.setOptions({
        title: data.name,
      });
      console.log("User details fetched successfully");
    } catch (error) {
      console.error("Error fetching user:", error);

      // Try to get user from cached data as fallback
      try {
        const cachedUsers = await getData("cached_users");
        if (cachedUsers) {
          const cachedUser = cachedUsers.find(
            (u) => u.id.toString() === id.toString()
          );
          if (cachedUser) {
            setUser(cachedUser);
            setIsOffline(true);
            navigation.setOptions({
              title: cachedUser.name,
            });
            console.log("Falling back to cached user data");
            return;
          }
        }
      } catch (cacheError) {
        console.error("Error loading cached user data:", cacheError);
      }

      navigation.setOptions({
        title: "Error Loading User",
      });
      Alert.alert(
        "Error",
        "Failed to load user details. Please check your internet connection and try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If we already have user data, check if we're offline
    if (userData) {
      navigation.setOptions({
        title: userData.name,
      });
      setLoading(false);

      // Check if we're offline to show the offline indicator
      checkOfflineStatus();
      return;
    }

    // Otherwise, fetch user details
    fetchUserDetails();
  }, [id, navigation, userData]);

  const checkOfflineStatus = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected;
      setIsOffline(!isConnected);
    } catch (error) {
      console.error("Error checking network status:", error);
      setIsOffline(true); // Assume offline if we can't check
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserDetails();
    setRefreshing(false);
  };

  if (loading || !user)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineIndicator}>
          <Text style={styles.offlineText}>
            📱 Offline Mode - Showing Cached Data
          </Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
            disabled={refreshing}
          >
            <Text style={styles.refreshButtonText}>
              {refreshing ? "Refreshing..." : "🔄 Try Refresh"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    width: 80,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: "#666",
    flex: 1,
  },
  addressContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  // Offline Indicator
  offlineIndicator: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  offlineText: {
    fontSize: 14,
    color: "#856404",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  refreshButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "center",
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
