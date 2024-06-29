import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput,ToastAndroid, ScrollView  } from "react-native";
import Color from "../../Utils/Color";
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataCustomerWithPhone, buyPrescription } from "../../Services/loginService";
import { ToastNotificationSuccess, ToastNotificationError } from "../../Utils/Toastnotification";
import { useAuth } from '../../Utils/AuthContext';
export default function BuyNowScreen() {
    const navigation = useNavigation(); 
    const route = useRoute(); // Get route object
    const {phoneNumber} = useAuth();
    const {dataOrder} = route.params;

    const [dataCustomer, setDataCustomer] = useState({});
    const [addressShip, setAddressShip] = useState('');
    const [cityShip, setCityShip] = useState('');
    const [totalOrder, setTotalOrder] = useState(0);
    useEffect(() => {
        let total = 0;
        for( let index = 0; index < dataOrder.length ; index++) {
            total = parseInt(total) + parseInt(dataOrder[index].TotalPrice);
        }
        setTotalOrder(total)

        const fetchDataCustomer = async () => {
            try {
                const response = await getDataCustomerWithPhone(phoneNumber);
                if( response && response.data.Success === true) {
                    setDataCustomer(response.data.Data);
                    console.log("response.data.Data Customer: ", response.data.Data)
                } else{
                    ToastNotificationError(response.data.Mess)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchDataCustomer();
    },[totalOrder])

    const handleConfirm = async () => {
        // Kiểm tra nhập địa chỉ giao hàng
        if( addressShip === '' || cityShip === ''){
            ToastNotificationError("Vui lòng nhập địa chỉ giao hàng");
            return 1;
        } 

        // Tổng hợp thông tin sản phẩm cần thiết
        const dataPrescription = dataOrder.map(medic => {
            return {
                MedicineId: medic.MedicineId,
                MedicineName: medic.MedicineName,
                TotalPrice: medic.TotalPrice,
                Quantity: medic.Quantity,
                Unit: medic.UnitBuy
            }
        })

        // Tổng hợp thông tin đơn thuốc
        let prescription = {
            CustomerPhone : dataCustomer.CustomerPhone,
            Point: dataCustomer.Point,
            InforMedic: dataPrescription,
            Address: addressShip + ', ' + cityShip
        }
        console.log("prescription: ", prescription);

        try {
            const response = await buyPrescription(prescription);
            if( response && response.data.Success === true) {
               ToastNotificationSuccess(response.data.Mess);
               navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            }); 
            } else{
                ToastNotificationError(response.data.Mess);
            }
        } catch (error) {
            console.log(error);
            ToastNotificationError("Vui lòng thử lại sau")
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.mb12]}>
                <Text style={styles.headerText}>Xác nhận đơn hàng</Text>
            </View>
            <ScrollView>
                <View style={[styles.mb12, styles.confirmContainer]}>
                    <Text style={[styles.mb12, styles.fs18]}>Địa chỉ giao hàng</Text>
                    <View style={styles.mb12}>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Họ và Tên"
                                value={dataCustomer.CustomerName}
                            />  
                        </View>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Số điện thoại"
                                value={dataCustomer.CustomerPhone}

                            />  
                        </View>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Thành phố, Quận huyện"
                                onChangeText={setCityShip}
                                value={cityShip}
                            />  
                        </View>        
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Tên đường, tòa nhà, số nhà"
                                onChangeText={setAddressShip}
                                value={addressShip}
                            />  
                        </View>
                    </View>
                    <View style={styles.mb12}> 
                        <Text style={[styles.fs18, styles.mb12]}>Danh sách sản phẩm</Text>
                        {
                            dataOrder && dataOrder.length > 0 ? 
                            <>
                                {
                                    dataOrder.map((item, index) => {
                                        return (
                                            <View style={[styles.inforMedic, styles.mb16]}>
                                                <Image
                                                    style={styles.orderItemImage}
                                                    source={{ uri: item.ImgUrl }}
                                                    resizeMode="contain"
                                                />
                                                <View style={styles.detailInfor}>
                                                    <Text style={styles.nameMedic}>{item.MedicineDetailName}</Text>
                                                    <View style={styles.groupPrice}>
                                                        <Text style={styles.quantity}>{item.TotalPrice} đ</Text>
                                                        <Text style={styles.quantity}>x  {item.Quantity} {item.UnitBuy === 'Box' ? 'Hộp' : 'Viên'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </> :
                            <>
                                <Text>Chưa có sản phẩm trong giỏ hàng</Text>
                            </> 
                        }

                    </View>
                    <View>
                        <Text style={[styles.fs18, styles.mb12]}>Thông tin thanh toán</Text>
                        <View>
                            <View style={styles.listInforPay}>
                                <Text style={styles.itemInfor}>Tổng tiền:</Text>
                                <Text style={styles.itemInfor}>{totalOrder}</Text>
                            </View>
                            <View style={styles.listInforPay}>
                                <Text style={styles.itemInfor}>Giảm giá trực tiếp</Text>
                                <Text style={styles.itemInfor}>0</Text>
                            </View>
                            <View style={styles.listInforPay}>
                                <Text style={styles.itemInfor}>Giảm giá voucher:</Text>
                                <Text style={styles.itemInfor}>0</Text>
                            </View>
                            <View style={styles.listInforPay}>
                                <Text style={styles.itemInfor}>Phí vận chuyển</Text>
                                <Text style={[styles.itemInfor, styles.free]}>Miễn phí</Text>
                            </View>
                            <View style={[styles.line, styles.mb12]}></View>
                            <View style={styles.listInforPay}>
                                <Text style={styles.itemInforTotal}>Thành tiền</Text>
                                <Text style={[styles.itemInforTotal, styles.free]}>{totalOrder}đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
        justifyContent: 'center', // canh giữa theo chiều dọc trong header
        alignItems: 'center', // canh giữa theo chiều ngang trong header
        backgroundColor: Color.GREEN_COLOR
    },
    headerText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff'
    },
    confirmContainer: {
        paddingHorizontal: 20,
    },
    inforContainer: {
        paddingHorizontal: 20,
    },
    textInput: {
        flex: 1,
        height: 30,
        paddingLeft: 10, // Tạo khoảng cách từ trái vào
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginTop: 20, // Tạo khoảng cách giữa ảnh và ô tìm kiếm
      },
    fs24: {
        fontSize: 20
    },
    fs18: {
        fontSize: 18
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
    orderItemImage: {
        width: 90,
        height: 90,
        borderRadius: 5,
        marginBottom: 10,
    },
    inforMedic: {
        width: '70%',
        flexDirection: 'row',
        paddingHorizontal: 0,
    },
    detailInfor: {
        flexDirection: 'column',
        marginLeft: 16
    },
    nameMedic: {
        fontSize: 14,
        // width: '70%',
        marginBottom: 12
    },
    groupPrice: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    quantity: {
        fontSize: 14,
        color: '#858585'
    },
    listInforPay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    itemInfor: {
        color: '#858585',
        fontSize: 16
    },
    line: {
        height: 2,
        backgroundColor: 'rgb(112 , 112, 112)'
    }, 
    free: {
        color: Color.GREEN_COLOR
    },
    itemInforTotal: {
        fontSize: 20
    }

})