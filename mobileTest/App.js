import React, { useEffect, useMemo}from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, AppRegistry , Alert  } from 'react-native';
import { ClerkProvider } from "@clerk/clerk-expo";
import Toast from 'react-native-toast-message';
import Login from './App/Screens/LoginScreen/Login';
import MainScreen from './App/Screens/MainScreen/MainScreen';
import { AuthProvider, useAuth } from './App/Utils/AuthContext'; // Import useAuth from AuthContext
import AppStateHandler from './App/Utils/AppStateHandler ';
import { LocationProvider } from './App/Utils/LocationContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailMedicine from './App/Screens/OrderDetailScreen/OrderDetail';
import BuyNowScreen from './App/Screens/BuyScreen/BuyNowScreen';
import MyOrderScreen from './App/Screens/MyOrderScreen/MyOrderScreen';
import CartScreen from './App/Screens/CartScreen/CartScreen';
import { getSocket } from './App/Utils/sendLocationSocket';
export default function App( props) {
  const socket = useMemo(getSocket, []);
  const Stack = createStackNavigator();

  return (
    <ClerkProvider publishableKey='pk_test_ZW5hYmxlZC1tYWNhcXVlLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <AuthProvider>
        <View style={styles.container}>
          <LocationProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
                <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DetailMedicine" component={DetailMedicine} options={{ headerShown: false }} />
                <Stack.Screen name="BuyNowScreen" component={BuyNowScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MyOrder" component={MyOrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
              <AppStateHandler />
            </NavigationContainer>
          </LocationProvider>
          <Toast />
          <StatusBar style="auto" />
        </View>
      </AuthProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
