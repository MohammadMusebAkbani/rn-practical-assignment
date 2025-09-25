import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import ProductListScreen from "./src/screens/ProductListScreen";
import CartScreen from "./src/screens/CartScreen";
import UserListScreen from "./src/screens/UserListScreen";
import UserDetailScreen from "./src/screens/UserDetailScreen";
import SecureTokenScreen from "./src/screens/SecureTokenScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: [Linking.createURL("/"), "myapp://"],
    config: {
      screens: {
        UserDetail: "user/:id",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Users" component={UserListScreen} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        <Stack.Screen name="SecureToken" component={SecureTokenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
