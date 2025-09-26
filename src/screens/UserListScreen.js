import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { saveData, getData } from "../utils/storage";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const fetchUsers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Check network connectivity
      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected;

      if (!isConnected) {
        // Load cached data when offline
        const cachedUsers = await getData("cached_users");
        if (cachedUsers) {
          setUsers(cachedUsers);
          setIsOffline(true);
          setIsOnline(false);
          console.log("Loaded cached users (offline mode)");
        } else {
          throw new Error(
            "No internet connection and no cached data available"
          );
        }
        return;
      }

      // Fetch from API when online
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);

      // Cache the data for offline use
      await saveData("cached_users", data);
      setIsOffline(false);
      setIsOnline(true);
      console.log("Users fetched and cached successfully");
    } catch (err) {
      console.error("Error fetching users:", err);

      // Try to load cached data as fallback
      try {
        const cachedUsers = await getData("cached_users");
        if (cachedUsers) {
          setUsers(cachedUsers);
          setIsOffline(true);
          setIsOnline(false);
          setError("Using cached data (offline mode)");
          console.log("Falling back to cached users");
          return;
        }
      } catch (cacheError) {
        console.error("Error loading cached data:", cacheError);
      }

      setError(err.message);
      Alert.alert(
        "Error",
        "Failed to load users. Please check your internet connection and try again.",
        [
          { text: "OK" },
          { text: "Retry", onPress: () => fetchUsers(isRefresh) },
        ]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserPress = (user) => {
    // Pass the entire user object to avoid API call when we already have the data
    navigation.navigate("UserDetail", {
      id: user.id,
      userName: user.name,
      userData: user, // Pass the complete user data
    });
  };

  const onRefresh = () => {
    fetchUsers(true);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleUserPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userPhone}>{item.phone}</Text>
        {item.company && (
          <Text style={styles.userCompany}>🏢 {item.company.name}</Text>
        )}
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>👥</Text>
      <Text style={styles.emptyTitle}>No Users Found</Text>
      <Text style={styles.emptySubtitle}>Pull down to refresh</Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading users...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => fetchUsers()}
        activeOpacity={0.8}
      >
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && users.length === 0) {
    return renderLoadingState();
  }

  if (error && users.length === 0) {
    return renderErrorState();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users Directory</Text>
        <Text style={styles.subtitle}>{users.length} users found</Text>
        {isOffline && (
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>
              📱 Offline Mode - Showing Cached Data
            </Text>
          </View>
        )}
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[
          styles.listContainer,
          users.length === 0 && styles.emptyListContainer,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  userCompany: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  arrow: {
    fontSize: 20,
    color: "#ccc",
    fontWeight: "bold",
  },
  separator: {
    height: 10,
  },
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  // Empty State
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#f5f5f5",
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Offline Indicator
  offlineIndicator: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  offlineText: {
    fontSize: 14,
    color: "#856404",
    fontWeight: "500",
    textAlign: "center",
  },
});
