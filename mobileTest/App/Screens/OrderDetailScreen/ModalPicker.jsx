import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Color from "../../Utils/Color";
import { useNavigation } from '@react-navigation/native';

const ModalPicker = ({ isVisible, onClose, dataMedic }) => {
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('0'); // Mặc định đơn vị là 'Hộp'
    const [unitStates, setUnitStates] = useState({
        Box: false,
        Vie: false,
        Other: false,
        // Thêm các đơn vị khác nếu cần
    });
    const [price, setPrice] = useState(dataMedic.Price);

    useEffect(() => {
        
    },[])

    const handleComplete = () => {
        let dataOrder = [];
        dataMedic.Quantity = quantity;
        dataMedic.TotalPrice = price;
        dataOrder.push(dataMedic);  // Thêm dataMedic vào mảng
        console.log("dataOrder: ", dataOrder)
        navigation.navigate('BuyNowScreen', { dataOrder });
    };

    const handleUnitSelection = (selectedUnit, stateUnit) => {
        // setQuantity(1);
        setUnit(selectedUnit);
        // Reset all unit states
        const updatedStates = {};
        for (const key in unitStates) {
        updatedStates[key] = key === stateUnit; // Set selected unit to true, others to false
        }
        setUnitStates(updatedStates);
        dataMedic.UnitBuy = selectedUnit;
        handleQuantity(selectedUnit, quantity)
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        handleQuantity(dataMedic.UnitBuy, quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            let currentQuantity = quantity;
            setQuantity(quantity - 1);
            handleQuantity(dataMedic.UnitBuy, quantity - 1);
        }
    };

    const handleQuantity = (unit, currentQuantity) => {
        if(unit === 0){
            if( dataMedic.Unit === 7 ){
                let price = parseInt(currentQuantity) *  parseInt(dataMedic.Price) * parseInt(dataMedic.ViePerBox) * parseInt(dataMedic.ViePerBlis) ;
                console.log("price change: ", price);
                setPrice(price)
            } else {
                let price =parseInt(currentQuantity) * parseInt(dataMedic.Price) * parseInt(dataMedic.ViePerBox) ;
                console.log("price change: ", price);
                setPrice(price);
            }
        } else if( unit === dataMedic.Unit){
            if( dataMedic.Unit === 7) {
                let price = parseInt(currentQuantity) * parseInt(dataMedic.Price) * parseInt(dataMedic.ViePerBlis) ;
                console.log("price change: ", price);
                setPrice(price);
            } else {
                let price =parseInt(currentQuantity) * parseInt(dataMedic.Price);
                console.log("price change: ", price);
                setPrice(price)
            }
        } else if(unit === 1){
            let price =parseInt(currentQuantity) * parseInt(dataMedic.Price);
            console.log("price change: ", price);
            setPrice(price)
        }
    } 
  return (
    <Modal
      animationType="slide" // Hiệu ứng slide từ dưới lên
      transparent={true} // Để background mờ
      visible={isVisible}
      onRequestClose={onClose}
    >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <View style={[styles.header, styles.mb16]}>
                    <Text style={{ flex: 1, textAlign: 'center',  fontSize: 18 }}>Chọn số lượng và đơn vị:</Text>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.inforMedic, styles.mb16]}>
                    <Image
                        style={styles.orderItemImage}
                        source={{ uri: dataMedic.ImgUrl }}
                        resizeMode="cover"
                    />
                    <View>
                        <Text style={styles.nameMedic}>{dataMedic.MedicineDetailName}</Text>
                        <Text style={[styles.priceMedic]}>{price} Đ</Text>
                    </View>
                </View>
                <View style={styles.mb16

                }>
                    <Text style={styles.mb16}>Đơn vị</Text>
                    <View style={styles.groupUnit}>
                        <TouchableOpacity
                            style={[styles.detailBtnUnit, unitStates.Box ? { backgroundColor: Color.GREEN_COLOR, color: '#fff' } : null]}
                            onPress={() => handleUnitSelection(0, 'Box')}
                        >
                            <Text>{'Hộp'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.detailBtnUnit, unitStates.Other ? { backgroundColor: Color.GREEN_COLOR } : null]}
                            onPress={() => handleUnitSelection(dataMedic.Unit, 'Other')}
                        >
                            <Text>{dataMedic.UnitName}</Text>
                        </TouchableOpacity>
                        {
                            dataMedic.Unit === 7 ? 
                            <TouchableOpacity
                                style={[styles.detailBtnUnit, unitStates.Vie ? { backgroundColor: Color.GREEN_COLOR } : null]}
                                onPress={() => handleUnitSelection(1, 'Vie')}
                            >
                                <Text>{'Viên'}</Text>
                            </TouchableOpacity>
                            : <></>
                        }
                    </View>
                </View>
                <View style={styles.mb16}>
                    <Text style={styles.mb16}>Số lượng</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Button style={styles.btnContainer} title="Xác nhận" onPress={handleComplete} />
            </View>
        </View>
    </Modal>
  );
};

export default ModalPicker;


const styles = StyleSheet.create({
    header: {
      flexDirection: 'row', // Sắp xếp các phần tử theo chiều ngang
      justifyContent: 'space-between', // Các phần tử được căn chỉnh dọc theo trục ngang
      alignItems: 'center', // Căn chỉnh các phần tử theo trục dọc
      paddingVertical: 10, // Khoảng cách dọc
      paddingHorizontal: 20, // Khoảng cách ngang
    },
    orderItemImage: {
        width: 90,
        height: 90,
        borderRadius: 5,
        marginBottom: 10,
    },
    inforMedic: {
        flexDirection: 'row',
        paddingHorizontal: 0,
    },
    nameMedic: {
        fontSize: 14,
        width: '70%',
        marginBottom: 8
    },
    priceMedic: {
        color: Color.GREEN_COLOR
    },
    btnContainer: {
        backgroundColor: Color.GREEN_COLOR
    },
    mb16: {
        marginBottom: 16
    },
    groupUnit: {
        flexDirection: 'row',
    }, 
    detailBtnUnit: {
        marginLeft: 8,
        marginRight: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff', // Màu nền mặc định cho nút
        borderColor: Color.GREEN_COLOR, // Màu viền
        borderWidth: 1, // Độ dày của viền
        borderRadius: 5,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 4,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
});
  
