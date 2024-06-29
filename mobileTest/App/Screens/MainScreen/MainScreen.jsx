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
export default function MainScreen() {      
  const navigation = useNavigation();
    const [listCategory, setListCategory] = useState([]);
    const [listMedicine, setListMedicine] = useState([]);
    useEffect(() => {
      fetchDataCategory();
      fetchDataMedicine();

      const initCart = async () => {
        let dataOrder = [];
        await AsyncStorage.setItem('dataOrder', JSON.stringify(dataOrder));
      }

      initCart();
    }, []);
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // Call your function to refresh data here
      });
  
      return unsubscribe;
    }, [navigation]);

    const fetchDataCategory = async () => {
      try {
        let respone = await getCategory();
        if( respone.data.Success === true) {
          console.log("respone.data.Data: ", respone.data.Data);
          setListCategory(respone.data.Data)
        } else {
          ToastNotificationError(respone.data.Mess);
        }
      } catch (error){
        ToastNotificationError('Vui lòng thử lại');
      }
    }

    const fetchDataMedicine = async () => {
      try {
        let respone = await getMedicine();
        if( respone.data.Success === true) {
          console.log("respone.data.Data: ", respone.data.Data);
          setListMedicine(respone.data.Data)
        } else {
          ToastNotificationError(respone.data.Mess);
        }
      } catch (error){
        ToastNotificationError('Vui lòng thử lại');
      }
    }

    const showDetailMedic = (medic) => {
      navigation.navigate('DetailMedicine', { medic });
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Image
          style={styles.imgHeader}
          source={require('../../../assets/images/logo-nav.png')}
          resizeMode="contain"
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Tìm kiếm..."
          />
        </View>
        </View>
       
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        
          <Text style={styles.textHeader}>
            Danh sách sản phẩm
          </Text>
          <FlatList
            style={styles.flatList}
            data={listMedicine}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={styles.orderItem}
                onPress={() => showDetailMedic(item)}
              >
                <View style={styles.orderDetailsContainer}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.orderItemImage}
                      source={{ uri: item.ImgUrl }}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.medicText}>
                    <Text style={styles.ft_16}>{item.MedicineId}</Text>
                  </View>
                  <View style={[styles.medicText, ]}>
                    <Text style={[styles.ft_16, styles.textColor]}>{item.Price}/ Hộp</Text>
                  </View>
                  <View style={styles.medicText}>
                    <Text style={[styles.ft_16, styles.backSpecti ]}>{item.Specification}</Text>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
                    <Text style={styles.buttonText}>Thêm vào giỏ</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.textHeader}>
            Danh mục sản phẩm
        </Text>
          <FlatList
            style={styles.flatList}
            data={listCategory}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={styles.orderItem}
                // onPress={() => showDetailMedic(item)}
              >
                <View style={styles.orderDetailsContainer}>
                  <View style={styles.orderDetails}>
                    <Text style={styles.ft_16}>{item.CategoryName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
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
    height: 200,
    alignItems: 'center', // Canh giữa theo chiều ngang
    justifyContent: 'flex-start', // Canh trên
    paddingTop: 40, // Tạo khoảng cách từ trên xuống
  },
  imgHeader: {
    width: '50%',
    height: '40%',
  },
  textInput: {
    flex: 1,
    height: 30,
    paddingLeft: 10, // Tạo khoảng cách từ trái vào
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    marginTop: 20, // Tạo khoảng cách giữa ảnh và ô tìm kiếm
  },
  textHeader: {
    marginTop: 16,
    fontSize: 20,
    marginLeft: 8
  },
  scrollView: {
    width: '100%',
    marginTop: 12,
  },
  scrollViewContent: {
    alignItems: 'center', // Canh giữa theo chiều ngang
  },
  flatList: {
    width: "100%",
    marginTop: 12,
  },
  orderItem: {
    width: "45%",
    margin: "2.5%",
    borderWidth: 1,
    borderColor: Color.GREEN_COLOR,
    borderRadius: 5,
    justifyContent: "center",
  },
  orderDetailsContainer: {
    justifyContent: "space-between",
    padding: 10,
  },
  imgContainer: {
    flex: 1,
    alignItems: "center",
  },
  orderItemImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginBottom: 10,
  },
  ft_16: {
    fontSize: 16,
  },
  medicText: {
    marginBottom: 10
  }, 
  textColor: {
    color: Color.GREEN_COLOR
  },
  backSpecti: {
    backgroundColor: '#a2a2a2',
    alignSelf: 'flex-start', // Điều chỉnh chiều rộng theo nội dung
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4
  },
  button: {
    marginTop: 'auto', // Đẩy nút button xuống dưới cùng
    paddingVertical: 10,
    backgroundColor: Color.GREEN_COLOR,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})