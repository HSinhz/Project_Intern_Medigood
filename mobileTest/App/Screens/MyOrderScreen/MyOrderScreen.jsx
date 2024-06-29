import React , { useContext, useEffect, useMemo, useState}from "react";
import { 
  Text, 
  View ,
  StyleSheet, 
  TouchableOpacity , 
  ScrollView, 
  Image, 
  TextInput ,
  FlatList
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../../Utils/AuthContext";
import { LocationContext } from "../../Utils/LocationContext"
import { getSocket, sendLocationSocket } from "../../Utils/sendLocationSocket";
import { getOrderWithStatus } from "../../Services/appService";
import { getCategory, getMedicine} from "../../Services/loginService";
import Color from "../../Utils/Color";
import { ToastNotificationSuccess, ToastNotificationError } from "../../Utils/Toastnotification";
import { Icon } from 'react-native-elements'
import BottomFragment from "../../UIUX/BottomFragment ";
export default function MyOrderScreen() {      
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text>Đơn hàng của tôi</Text>
        </View>
        <BottomFragment />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
  },
  header: {
    backgroundColor: Color.GREEN_COLOR,
    width: '100%',
    height: 100,
    alignItems: 'center', // Canh giữa theo chiều ngang
    justifyContent: 'flex-start', // Canh trên
    paddingTop: 40, // Tạo khoảng cách từ trên xuống
  },
 
})