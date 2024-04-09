
const validateLogin = (Email, PassWord ) => {
    if( !Email ){
        return {
            ER: false,
            Type: 1,
            EM: 'Vui lòng nhập Email'
        };
    }
    let regx = /\S+@\S+\.\S+/;
    if( !regx.test(Email)){
        return {
            ER: false,
            Type: 1,
            EM: 'Nhập đúng định dạng Email'
        };
    }
    if(!PassWord){
        return {
            ER: false,
            Type: 2,
            EM: 'Vui lòng nhập mật khẩu'
        };
    }
    if(PassWord < 8){
        return {
            ER: false,
            Type: 2,
            EM: 'Mật khẩu phải hơn 8 kí tự'
        };
    }
    return true;
}

export default validateLogin;