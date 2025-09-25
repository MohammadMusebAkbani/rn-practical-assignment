import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get('window');

export default function SecureTokenScreen() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveToken = async () => {
    try {
      setLoading(true);
      await SecureStore.setItemAsync("userToken", "12345-ABCDE-TOKEN");
      setToken("12345-Museb-Akbani");
      Alert.alert("Success", "Token saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save token");
    } finally {
      setLoading(false);
    }
  };

  const loadToken = async () => {
    try {
      setLoading(true);
      const stored = await SecureStore.getItemAsync("userToken");
      setToken(stored);
    } catch (error) {
      Alert.alert("Error", "Failed to load token");
    } finally {
      setLoading(false);
    }
  };

  const deleteToken = async () => {
    try {
      setLoading(true);
      await SecureStore.deleteItemAsync("userToken");
      setToken(null);
      Alert.alert("Success", "Token deleted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to delete token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Token Storage</Text>
      
      {/* Token Status Card */}
      <View style={styles.tokenCard}>
        <View style={styles.tokenHeader}>
          <Text style={styles.tokenLabel}>Token Status</Text>
          <View style={[styles.statusBadge, token ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={styles.statusText}>{token ? "Active" : "Inactive"}</Text>
          </View>
        </View>
        
        <View style={styles.tokenContent}>
          {token ? (
            <View>
              <Text style={styles.tokenTitle}>Stored Token:</Text>
              <View style={styles.tokenValueContainer}>
                <Text style={styles.tokenValue} numberOfLines={2} ellipsizeMode="middle">
                  {token}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.noTokenContainer}>
              <Text style={styles.noTokenIcon}>🔒</Text>
              <Text style={styles.noTokenText}>No token saved</Text>
              <Text style={styles.noTokenSubtext}>Save a token to secure storage</Text>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={saveToken}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "💾 Save Token"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={loadToken}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            {loading ? "Loading..." : "🔄 Reload Token"}
          </Text>
        </TouchableOpacity>

        {token && (
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]} 
            onPress={deleteToken}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Deleting..." : "🗑️ Delete Token"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ℹ️ About Secure Storage</Text>
        <Text style={styles.infoText}>
          Tokens are encrypted and stored securely on your device using Expo SecureStore. 
          This ensures sensitive data remains protected even if the device is compromised.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
    letterSpacing: 0.5,
  },
  
  // Token Card Styles
  tokenCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tokenLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#E8F5E8',
  },
  inactiveBadge: {
    backgroundColor: '#FFF3E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  tokenContent: {
    minHeight: 80,
    justifyContent: 'center',
  },
  tokenTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  tokenValueContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tokenValue: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#007AFF',
    fontWeight: '500',
  },
  noTokenContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  noTokenIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  noTokenText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  noTokenSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  // Button Styles
  buttonContainer: {
    gap: 12,
    marginBottom: 25,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 52,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    marginTop: 'auto',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});