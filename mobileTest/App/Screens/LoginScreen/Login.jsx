import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    Dimensions, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView } from 'react-native';
import React, {useMemo} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
import Color from '../../Utils/Color';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { isValidCheckEmail} from '../../Utils/Validation';
import { handleLoginApp } from '../../Services/loginService';
import { useAuth } from '../../Utils/AuthContext';
import { getSocket } from '../../Utils/sendLocationSocket';
WebBrowser.maybeCompleteAuthSession();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Login() {
    useWarmUpBrowser();
    const {login} = useAuth();
    const [phoneNumber, onChangePhoneNumber] = React.useState('');
    const socket = useMemo(getSocket, []);
    const [errorEmail, setErrorEmail] = React.useState('');
    const navigation = useNavigation(); 
    const handleLogin = async () => {
        console.log("phoneNumber 123: ", phoneNumber)
        let respone = await handleLoginApp(phoneNumber);
        if( respone.data.Success === true) {
            login(phoneNumber)
            await AsyncStorage.setItem('phoneNumber', phoneNumber);
            console.log(respone.data)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            }); 
        } else {
            setErrorEmail(respone.data.Mess);
        }
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.img_login}
                source={require('../../../assets/images/Medigood.png')}
                resizeMode="contain"
            />
            
            <View style={styles.subcontainer}>
                <Text style={styles.header_text}>
                    Đăng nhập
                </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePhoneNumber}
                        value={phoneNumber}
                        placeholder="Số điện thoại"
                    />
                <Text style={{color: 'red'}}>{errorEmail}</Text>
                <TouchableOpacity
                    // onPress={() => {
                    //     let validateEmail = isValidCheckEmail(email);
                    //     validateEmail.ER === true ?  handleLogin(email) : setErrorEmail(validateEmail.Mess); 
                    // }}
                    onPress={() => {
                        handleLogin(phoneNumber)
                    }}
                    style={styles.btnLogin}
                    title="Login in"> 
                    <Text style={{color: Color.WHITE}}> Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    subcontainer: {
        width: '100%', // Điều chỉnh chiều rộng của subcontainer
        alignItems: 'center', // Canh chỉnh các phần tử bên trong theo chiều ngang
    },
    header_text: {
        fontSize: 44,
        color:Color.GREEN_COLOR
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: Color.GREEN_COLOR, // Màu sắc có thể thay đổi
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 8
    },
    btnLogin: {
        width: '60%',
        alignItems: 'center',
        backgroundColor: Color.GREEN_COLOR,
        padding: 10,
        borderRadius: 8,
        marginTop:20,

    },
    img_login: {
        width: windowWidth,
        height: windowHeight / 2, // Chiếm một nửa chiều cao của màn hình
    }
})
