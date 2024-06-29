import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../Utils/Color';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomFragment = () => {
  const [isFragmentHome, setisFragmentHome] = useState(false);
  const [isFragmentCart, setisFragmentCart] = useState(false);
  const [isFragmentMyOrder, setisFragmentMyOrder] = useState(false);
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleFragmentHome = () => {
    setisFragmentHome(true);
    setisFragmentCart(false);
    setisFragmentMyOrder(false);
  };

  const handleFragmentCart = () => {
    setisFragmentHome(false);
    setisFragmentCart(true);
    setisFragmentMyOrder(false);
  };

  const handleFragmentMyOrder = () => {
    setisFragmentHome(false);
    setisFragmentCart(false);
    setisFragmentMyOrder(true)
  };
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={[styles.button, isFragmentHome ? styles.activeButton : null]}
            onPress={() => [handleFragmentHome, navigateToScreen('Home')]}
        >
            <Ionicons
            name="home"
            size={20}
            color={isFragmentHome ? '#fff' : Color.GREEN_COLOR}
            />
            <Text style={[styles.buttonText, isFragmentHome ? { color: '#fff' } : null]}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, isFragmentCart ? styles.activeButton : null]}
            onPress={() => [handleFragmentCart, navigateToScreen("Cart")]}
        >
            <AntDesign name="shoppingcart" size={24} color={isFragmentCart ? '#fff' : Color.GREEN_COLOR} />
            <Text style={[styles.buttonText, isFragmentCart ? { color: '#fff' } : null]}>Giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, isFragmentMyOrder ? styles.activeButton : null]}
            onPress={() => [handleFragmentMyOrder, navigateToScreen('MyOrder')]}
        >
            <Fontisto name="prescription" size={24} color={isFragmentMyOrder ? '#fff' : Color.GREEN_COLOR} />
            <Text style={[styles.buttonText, isFragmentMyOrder ? { color: '#fff' } : null]}>Đơn hàng</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Default background color
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: Color.GREEN_COLOR, // Default text color
    fontSize: 16,
  },
  activeButton: {
    color: Color.GREEN_COLOR, // Active background color
  },
});

export default BottomFragment;
