import { Platform } from "react-native";

export const getDeviceInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    isIOS: Platform.OS === "ios",
    isAndroid: Platform.OS === "Android",
    // Additional device info that would come from a native module
    deviceModel: Platform.select({
      ios: "iOS Device",
      android: "Android Device",
      default: "Unknown Device",
    }),
    osVersion: Platform.select({
      ios: `iOS ${Platform.Version}`,
      android: `Android ${Platform.Version}`,
      default: "Unknown OS",
    }),
  };
};

export const getDeviceOSVersion = async () => {
  try {
    const deviceInfo = getDeviceInfo();
    return {
      success: true,
      osVersion: deviceInfo.osVersion,
      platform: deviceInfo.platform,
      version: deviceInfo.version,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
