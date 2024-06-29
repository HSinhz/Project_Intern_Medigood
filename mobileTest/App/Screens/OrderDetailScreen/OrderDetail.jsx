import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput,ToastAndroid, ScrollView  } from "react-native";
import React, {useEffect, useState, useMemo} from "react";
import { useRoute } from '@react-navigation/native';
import Color from "../../Utils/Color";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { ToastNotificationSuccess, ToastNotificationError } from "../../Utils/Toastnotification";
import { getSocket } from "../../Utils/sendLocationSocket";
import { getMedicineWithId } from "../../Services/loginService";
import { color } from "react-native-elements/dist/helpers";
import ModalPicker from './ModalPicker'; // Đảm bảo đường dẫn đến ModalPicker là đúng
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DetailMedicine() {
    const navigation = useNavigation();
    const socket = useMemo(getSocket, []);
    const [dataMedic, setDataMedic] = useState({});
    const route = useRoute(); // Get route object
    const {medic} = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        console.log("MedicineId: ", medic.MedicineId);
        fetchDataMedicineWithId();
    }, [medic])
    
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    
    const fetchDataMedicineWithId = async () => {
        try {
            let respone = await getMedicineWithId(medic.MedicineId);
            if( respone.data.Success === true) {
              console.log("respone.data.Data: ", respone.data.Data.ImgUrl);
              setDataMedic(respone.data.Data)
            } else {
              ToastNotificationError(respone.data.Mess);
            }
        } catch (error){
            ToastNotificationError('Vui lòng thử lại');
        }
    }
    
    const handleAddToCart = async () => {
        // Logic xử lý khi nhấn nút Thêm vào giỏ hàng
        console.log("Thêm vào giỏ hàng: ", dataMedic.MedicineId);

        try {
            // Lấy giỏ hàng hiện tại từ AsyncStorage
            const jsonValueCart = await AsyncStorage.getItem('dataOrder');
            let cart = jsonValueCart != null ? JSON.parse(jsonValueCart) : [];
        
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const index = cart.findIndex(item => item.MedicineId === dataMedic.MedicineId);
            if (index >= 0) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                // cart[index].quantity += product.quantity;
                ToastNotificationError("Sản phẩm đã tồn tại trong giỏ hàng");
            } else {
              // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                dataMedic.Quantity = 1;
                dataMedic.UnitBuy = dataMedic.Unit;
                dataMedic.TotalPrice = 0;
                cart.push(dataMedic);
                await AsyncStorage.setItem('dataOrder', JSON.stringify(cart));
                ToastNotificationSuccess('Thêm sản phẩm vào giỏ hàng thành công!')
            }
        
            // Lưu lại giỏ hàng mới vào AsyncStorage
            
          } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
          }
    };
    return (
        <View style={[styles.container]}>
            <Image
                style={[styles.img_login, styles.mb12]}
                source={{uri : dataMedic.ImgUrl}}
                // resizeMode="contain"
            />
            <ScrollView>
                <View style={styles.inforContainer}>
                    <View style={styles.mb12}>
                        <Text style={styles.fs24}>{dataMedic.MedicineDetailName}</Text>
                    </View>
                    <View style={styles.mb12}>
                        <Text >{dataMedic.MedicineId}</Text>
                    </View>
                    <View style={styles.mb12}>
                        <Text style={[styles.colorGreen, styles.fs24]}>{dataMedic.Price}/ {dataMedic.UnitName} </Text>
                    </View>
                    <View>
                        <Text style={[styles.fw500, styles.mb12]}>Thông tin sản phẩm</Text>
                        <View style={styles.mb12}>
                            <Text style={styles.inforText}>Danh mục</Text>
                            <Text style={styles.inforDetail}>{dataMedic.CategoryName}</Text>
                        </View>
                        <View style={styles.mb12}>
                            <Text style={styles.inforText}>Quy cách</Text>
                            <Text style={styles.inforDetail}>{dataMedic.Specification}</Text>
                        </View>
                        <View style={styles.mb12}>
                            <Text style={styles.inforText}>Thành phầnn</Text>
                            <Text style={styles.inforDetail}>{dataMedic.Ingredient}</Text>
                        </View>
                        <View style={styles.mb12}>
                            <Text style={styles.inforText}>Nhà sản xuất</Text>
                            <Text style={styles.inforDetail}>{dataMedic.Producer}</Text>
                        </View>
                        <View style={styles.mb12}>
                            <Text style={styles.inforText}>Mô tả</Text>
                            <Text style={styles.inforDetail}>{dataMedic.Description}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
                    <Text style={styles.buttonText}>Mua ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
            <ModalPicker 
                isVisible={modalVisible} 
                onClose={handleCloseModal} 
                dataMedic={dataMedic}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        // alignItems: 'center',
      },
      img_login: {
        marginTop: 30,
        width: windowWidth,
        height: windowHeight / 2, // Chiếm một nửa chiều cao của màn hình
    },
    inforContainer: {
        paddingHorizontal: 20,
    },
    fs24: {
        fontSize: 20
    },
    mb12: {
        marginBottom: 12
    },
    colorGreen: {
        color: Color.GREEN_COLOR,
        fontWeight: '700'
    },
    fw500: {
        fontSize: 16,
        fontWeight: '500'
    },
    inforText: {
        fontWeight: '400'
    },
    inforDetail: {
        fontSize: 14,
        color: '#282c99'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Để tạo độ mờ cho nền nút
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        marginHorizontal: 10,
        backgroundColor: Color.GREEN_COLOR,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

})