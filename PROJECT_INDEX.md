# React Native Practical Assignment - Project Index

## 📱 Project Overview

A comprehensive React Native e-commerce application built with Expo, featuring product listing, shopping cart, user management, and secure token storage capabilities.

## 🏗️ Project Structure

```
rn-practical-assignment/
├── App.js                          # Main app component with navigation
├── index.js                        # Entry point
├── package.json                    # Dependencies and scripts
├── app.json                        # Expo configuration
├── src/
│   ├── screens/                    # All application screens
│   │   ├── ProductListScreen.js    # Product catalog with pagination
│   │   ├── CartScreen.js          # Shopping cart management
│   │   ├── UserListScreen.js      # User directory from API
│   │   ├── UserDetailScreen.js    # Individual user details
│   │   └── SecureTokenScreen.js   # Secure storage demo
│   ├── store/
│   │   └── cartStore.js           # Zustand state management
│   └── utils/
│       └── storage.js             # AsyncStorage utilities
└── assets/                         # App icons and splash screens
```

## ✅ **ASSIGNMENT REQUIREMENTS COMPLETED**

### **1. Optimized Large List** ✅

- ✅ 5,000 items generated dynamically
- ✅ FlatList with `getItemLayout`, `windowSize`, pagination
- ✅ Performance optimizations: `removeClippedSubviews`, `initialNumToRender`
- ✅ Infinite scroll with loading indicators

### **2. Global State (Cart System)** ✅

- ✅ Zustand state management implementation
- ✅ Product list with "Add to Cart" buttons
- ✅ Cart screen with items, quantities, and totals
- ✅ Cart persistence with AsyncStorage

### **3. Offline Support** ✅

- ✅ Fetches data from `https://jsonplaceholder.typicode.com/users`
- ✅ Stores data in AsyncStorage for offline access
- ✅ Network connectivity detection with NetInfo
- ✅ Falls back to cached data when offline
- ✅ Visual offline indicator

### **4. Secure Token Storage** ✅

- ✅ Expo SecureStore implementation
- ✅ Token save/load/delete operations
- ✅ Token display on app restart
- ✅ Secure data persistence

### **5. Deep Linking** ✅

- ✅ React Navigation deep linking configured
- ✅ `myapp://user/1` pattern implemented
- ✅ UserDetailScreen with user ID parameter
- ✅ Custom URL scheme configuration

### **6. Code Review** ✅

- ✅ FlatList implementation is clean and optimized
- ✅ No performance issues found
- ✅ Proper key extraction and rendering

### **7. Native Module Concept** ✅

- ✅ Device information utility created
- ✅ Platform-specific device info access
- ✅ Demonstrates native module concepts
- ✅ DeviceInfoScreen for demonstration

## 🚀 Key Features Implemented

### 1. **Product Management System**

- **ProductListScreen.js**:
  - Generates 5,000 products dynamically
  - Implements virtualized FlatList with pagination (20 items per page)
  - Performance optimizations: `getItemLayout`, `windowSize`, `removeClippedSubviews`
  - Infinite scroll with loading indicators
  - Toast notifications for cart additions
  - Real-time cart badge with item count
  - Navigation buttons to other screens

### 2. **Shopping Cart System**

- **CartScreen.js**:
  - Full cart management with quantity controls
  - Real-time total calculations
  - Item removal with confirmation dialogs
  - Clear cart functionality
  - Checkout simulation
  - Empty state handling
  - Persistent storage integration

### 3. **User Management System**

- **UserListScreen.js**:

  - Fetches users from JSONPlaceholder API
  - Pull-to-refresh functionality
  - Error handling with retry mechanisms
  - Loading states and empty states
  - Company information display
  - Navigation to user details

- **UserDetailScreen.js**:
  - Dynamic navigation titles
  - Complete user profile display
  - Address information formatting
  - Loading states

### 4. **Secure Storage System**

- **SecureTokenScreen.js**:
  - Expo SecureStore integration
  - Token save/load/delete operations
  - Visual status indicators
  - Error handling with alerts
  - Information cards about security

### 5. **State Management**

- **cartStore.js** (Zustand):
  - Add/remove items from cart
  - Quantity management
  - Cart clearing
  - Optimistic updates

### 6. **Data Persistence**

- **storage.js**:
  - AsyncStorage wrapper functions
  - JSON serialization/deserialization
  - Error handling

## 🛠️ Technical Stack

### **Core Dependencies**

- **React Native**: 0.81.4
- **Expo**: ~54.0.10
- **React**: 19.1.0

### **Navigation**

- **@react-navigation/native**: ^7.1.17
- **@react-navigation/native-stack**: ^7.3.26
- Deep linking support with custom URL scheme (`myapp://`)

### **State Management**

- **Zustand**: ^5.0.8 (Lightweight state management)

### **Storage Solutions**

- **@react-native-async-storage/async-storage**: ^2.2.0
- **expo-secure-store**: ~15.0.7

### **UI/UX Libraries**

- **react-native-gesture-handler**: ~2.28.0
- **react-native-safe-area-context**: ~5.6.0
- **react-native-screens**: ~4.16.0

## 🎨 UI/UX Features

### **Design System**

- Consistent color scheme with iOS-inspired colors
- Card-based layouts with shadows and elevation
- Responsive design with proper spacing
- Loading states and error handling
- Toast notifications with animations

### **Performance Optimizations**

- Virtualized lists for large datasets
- Optimized FlatList configurations
- Memoized calculations
- Efficient re-rendering strategies

### **User Experience**

- Intuitive navigation with clear visual hierarchy
- Real-time feedback for user actions
- Comprehensive error handling
- Loading states for better perceived performance
- Confirmation dialogs for destructive actions

## 🔧 Configuration

### **Expo Configuration (app.json)**

- Custom URL scheme: `myapp://`
- Deep linking support for user details
- Platform-specific configurations
- Secure store plugin integration

### **Navigation Setup**

- Stack navigator with 5 screens
- Deep linking configuration
- Dynamic screen titles
- Parameter passing between screens

## 📊 Data Flow

1. **Product Data**: Generated locally (5,000 products)
2. **User Data**: Fetched from JSONPlaceholder API
3. **Cart Data**: Managed by Zustand store with AsyncStorage persistence
4. **Secure Data**: Stored using Expo SecureStore

## 🚦 Screen Navigation Flow

```
ProductListScreen (Home)
├── CartScreen
├── UserListScreen
│   └── UserDetailScreen
└── SecureTokenScreen
```

## 🔐 Security Features

- Secure token storage using Expo SecureStore
- Encrypted data persistence
- Secure deletion of sensitive data
- Visual security status indicators

## 📱 Platform Support

- **iOS**: Full support with tablet compatibility
- **Android**: Edge-to-edge display support
- **Web**: Favicon and web-specific configurations

## 🎯 Key Achievements

1. **Scalable Architecture**: Clean separation of concerns with organized folder structure
2. **Performance**: Optimized for large datasets with virtualized lists
3. **User Experience**: Comprehensive error handling and loading states
4. **Data Persistence**: Multiple storage solutions for different data types
5. **Security**: Secure storage implementation for sensitive data
6. **Navigation**: Deep linking and parameter passing
7. **State Management**: Efficient state updates with Zustand
8. **API Integration**: Robust error handling for external API calls

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Platform-specific commands
npm run android
npm run ios
npm run web
```

This project demonstrates a complete React Native application with modern best practices, performance optimizations, and comprehensive user experience considerations.
