import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getDeviceInfo, getDeviceOSVersion } from "../utils/DeviceInfo";

export default function DeviceInfoScreen() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDeviceInfo = async () => {
    try {
      setLoading(true);
      const result = await getDeviceOSVersion();

      if (result.success) {
        setDeviceInfo(result);
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get device information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load device info on component mount
    const basicInfo = getDeviceInfo();
    setDeviceInfo({
      success: true,
      osVersion: basicInfo.osVersion,
      platform: basicInfo.platform,
      version: basicInfo.version,
      deviceModel: basicInfo.deviceModel,
    });
  }, []);

  const renderDeviceInfo = () => {
    if (!deviceInfo) return null;

    return (
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>📱 Device Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Platform:</Text>
          <Text style={styles.value}>{deviceInfo.platform}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>OS Version:</Text>
          <Text style={styles.value}>{deviceInfo.osVersion}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Version:</Text>
          <Text style={styles.value}>{deviceInfo.version}</Text>
        </View>

        {deviceInfo.deviceModel && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Device Model:</Text>
            <Text style={styles.value}>{deviceInfo.deviceModel}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Information</Text>
      <Text style={styles.subtitle}>Native Module Concept Demo</Text>

      {renderDeviceInfo()}

      <TouchableOpacity
        style={styles.button}
        onPress={loadDeviceInfo}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "🔄 Refresh Device Info"}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>ℹ️ About Native Modules</Text>
        <Text style={styles.infoText}>
          This demonstrates the concept of accessing native device information.
          In a real implementation, this would be a native module written in
          Objective-C (iOS) or Java/Kotlin (Android) that provides access to
          device-specific APIs.
        </Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
