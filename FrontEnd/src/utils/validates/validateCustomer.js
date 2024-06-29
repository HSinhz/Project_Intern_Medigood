import _ from "lodash"

const validateCustomer = (dataCustomer , validDefault) => {
    let _validInputs = validDefault;
    let arrVNI = ['Số điện thoại', 'Tên khách hàng'];
    let arr = [ 'CustomerPhone', 'CustomerName' ];
    let success = true;
    let ErrMess =''
    for( let i = 0 ; i < arr.length ; i++) {
        if(!dataCustomer[arr[i]]){
            _validInputs = _.cloneDeep(validDefault);
            _validInputs[arr[i]] = false;
            success = false;
            ErrMess = `Vui lòng nhập ${arrVNI[i]}`;
            break;
        }
    }

    if(dataCustomer.CustomerPhone ) {
        const phoneNumberRegex = /^\d{10,11}$/;
        const isValid = phoneNumberRegex.test(dataCustomer.CustomerPhone);
        if( isValid === false) {
            _validInputs.CustomerPhone = false
            success = false;
            ErrMess = "Vui Lòng nhập đúng định dạng số điện thoại"
        }
    }
    return {success, _validInputs, ErrMess};
}

export {
    validateCustomer
}