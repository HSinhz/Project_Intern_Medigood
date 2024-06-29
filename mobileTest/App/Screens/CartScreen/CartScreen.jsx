import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from "../../Utils/Color";
import { useNavigation } from '@react-navigation/native';


export default function CartScreen() {
  const navigation = useNavigation();
    const [listCart, setListCart] = useState([]);
    const [unit, setUnit] = useState('Box'); // Default unit is 'Box'
    const [unitStates, setUnitStates] = useState({});

    useEffect(() => {
        const getCart = async () => {
            const dataOrder = await AsyncStorage.getItem('dataOrder');
            if (dataOrder) {
                try {
                    const parsedDataOrder = JSON.parse(dataOrder);
                    if (Array.isArray(parsedDataOrder)) {
                        setListCart(parsedDataOrder);
                        // Initialize unit states for each item in the cart
                        const initialUnitStates = {};
                        parsedDataOrder.forEach((item, index) => {
                            initialUnitStates[index] = item.UnitBuy === 'Box';
                        });
                        setUnitStates(initialUnitStates);
                    } else {
                        setListCart([]);
                    }
                } catch (e) {
                    console.error("Error parsing dataOrder: ", e);
                    setListCart([]);
                }
            } else {
                setListCart([]);
            }
        };

        getCart();
    }, []);

    const increaseQuantity = (index) => {
        const newCart = [...listCart];
        newCart[index].Quantity += 1;
        newCart[index].TotalPrice = handleQuantity(newCart[index].UnitBuy, newCart[index].Quantity, newCart[index])
        setListCart(newCart);
        AsyncStorage.setItem('dataOrder', JSON.stringify(newCart));
    };

    const decreaseQuantity = (index) => {
        const newCart = [...listCart];
        if (newCart[index].Quantity > 1) {
            newCart[index].Quantity -= 1;
            newCart[index].TotalPrice = handleQuantity(newCart[index].UnitBuy, newCart[index].Quantity, newCart[index]);
            setListCart(newCart);
            AsyncStorage.setItem('dataOrder', JSON.stringify(newCart));
        }
    };

    const removeItem = (index) => {
        const newCart = listCart.filter((item, i) => i !== index);
        setListCart(newCart);
        AsyncStorage.setItem('dataOrder', JSON.stringify(newCart));
    };

    const handleUnitSelection = (selectedUnit, index, unitBuy) => {
        const newCart = [...listCart];
        newCart[index].UnitBuy = unitBuy;
        newCart[index].TotalPrice = handleQuantity(newCart[index].UnitBuy, newCart[index].Quantity, newCart[index]);
        setListCart(newCart);
        AsyncStorage.setItem('dataOrder', JSON.stringify(newCart));

        // Update unit states for the selected item
        const updatedStates = { ...unitStates };

        // Special handling for items with Unit === 7
        if (newCart[index].Unit === 7) {
            if (selectedUnit === 'Box') {
                updatedStates[index] = {
                  Box: true,
                  Vie: false,
                  Piece: false,
                };
            } else if (selectedUnit === 'Vie') {
                updatedStates[index] = {
                  Box: false,
                  Vie: true,
                  Piece: false,
                };
            } else {
                updatedStates[index] = {
                    Box: false,
                    Vie: false,
                    Piece: true,
                };
            }
        } else {
            // Toggle between 'Box' and 'Piece' for other units
            updatedStates[index] = {
                Box: selectedUnit === 'Box',
                Vie: selectedUnit === 'Vie',
                Piece: selectedUnit === 'Piece',
            };
        }

        setUnitStates(updatedStates);
    };

    const handleQuantity = (unit, currentQuantity, dataMedic) => {
      let price = 0
      if(unit === 0){
          if( dataMedic.Unit === 7 ){
              price = parseInt(currentQuantity) *  parseInt(dataMedic.Price) * parseInt(dataMedic.ViePerBox) * parseInt(dataMedic.ViePerBlis) ;
          } else {
              price = parseInt(currentQuantity) * parseInt(dataMedic.Price) * parseInt(dataMedic.ViePerBox) ;
          }
      } else if( unit === dataMedic.Unit){
          if( dataMedic.Unit === 7) {
              price = parseInt(currentQuantity) * parseInt(dataMedic.Price) * parseInt(dataMedic.ViePerBlis) ;
          } else {
              price =parseInt(currentQuantity) * parseInt(dataMedic.Price);
          }
      } else if(unit === 1){
          price =parseInt(currentQuantity) * parseInt(dataMedic.Price);
      }

      return price;
  } 

  const handleConfirm = () => {
    let dataOrder = listCart
    navigation.navigate('BuyNowScreen', {dataOrder});
  }
    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.mb12]}>
                <Text style={styles.headerText}>Giỏ hàng</Text>
            </View>
            <View style={styles.listCart}>
                {listCart && listCart.length > 0 ? (
                    listCart.map((item, index) => (
                        <View key={index} style={[styles.inforMedic, styles.mb16]}>
                            <Image
                                style={styles.orderItemImage}
                                source={{ uri: item.ImgUrl }}
                                resizeMode="contain"
                            />
                            <View style={styles.detailInfor}>
                                <Text style={styles.nameMedic}>{item.MedicineDetailName}</Text>
                                <View style={styles.groupPrice}>
                                    <Text style={styles.quantity}>{item.TotalPrice} đ</Text>
                                </View>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(index)}>
                                        <Text style={styles.buttonText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantity}>{item.Quantity}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => increaseQuantity(index)}>
                                        <Text style={styles.buttonText}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => removeItem(index)}>
                                        <AntDesign name="delete" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.groupUnit}>
                                    <TouchableOpacity
                                        style={[styles.detailBtnUnit, unitStates[index]?.Box && { backgroundColor: Color.GREEN_COLOR }]}
                                        onPress={() => handleUnitSelection('Box', index, 0)}
                                    >
                                        <Text>{'Hộp'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.detailBtnUnit, unitStates[index]?.Piece && { backgroundColor: Color.GREEN_COLOR }]}
                                        onPress={() => handleUnitSelection('Piece', index, item.Unit)}
                                    >
                                        <Text>{item.UnitName}</Text>
                                    </TouchableOpacity>
                                    {item.Unit === 7 &&
                                        <TouchableOpacity
                                            style={[styles.detailBtnUnit, unitStates[index]?.Vie && { backgroundColor: Color.GREEN_COLOR }]}
                                            onPress={() => handleUnitSelection('Vie', index, 1)}
                                        >
                                            <Text>{'Viên'}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.notiNothing}>
                        <Text>Chưa có sản phẩm trong giỏ hàng</Text>
                    </View>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
                    <Text style={styles.buttonTextConfirm}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.GREEN_COLOR
    },
    headerText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff'
    },
    notiNothing: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
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
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    detailInfor: {
        flexDirection: 'column',
        marginLeft: 16
    },
    nameMedic: {
        fontSize: 14,
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold'
    },
    groupUnit: {
        flexDirection: 'row',
        marginTop: 10,
    },
    detailBtnUnit: {
        marginLeft: 8,
        marginRight: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff', // Default background color for the button
        borderColor: Color.GREEN_COLOR, // Border color
        borderWidth: 1, // Border width
        borderRadius: 5,
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
  buttonConfirm: {
      flex: 1,
      paddingVertical: 15,
      marginHorizontal: 10,
      backgroundColor: Color.GREEN_COLOR,
      borderRadius: 5,
      alignItems: 'center',
  },
  buttonTextConfirm: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
  },
});
