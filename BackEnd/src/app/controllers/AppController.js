const AppService = require("../../Services/AppService");
const {INTERNAL_ERROR, NO_LOGGIN} = require('../../config/db/httpCode');
const {checkReqUser, checkReqBody, checkReqParams} = require('../../util/checkReqUser')

// const SocketService = require("../../webSocket")
class AppController  {
    async handlerLoginApp(req, res ){
        try {
            
            let phoneNumber = req.body.phoneNumber;
            console.log(phoneNumber)
            if( phoneNumber ){
                let data = await AppService.handlerLoginApp(phoneNumber);
                return res.status(data.Type).json({data});
            } return res.status(NO_LOGGIN).json({
                Success: false,
                Mess: 'Vui lòng nhập số điện thoại'
            })
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }
    
    async getMedicine(req, res) {
        try {
            let data = await AppService.getMedicine();
            return res.status(data.Type).json({data: data});
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }

    async getCategory(req, res) {
        try {
            let data = await AppService.getCategory();
            return res.status(data.Type).json({data: data})
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }

    async getMedcineByCategory(req, res) {
        try {
            
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }

    async getMedcineById(req, res) {
        try {
            console.log("req.params: ", req.params.MedicineId);
            let data = await AppService.getDetailMedicine(req.params.MedicineId);
            return res.status(data.Type).json({data: data});
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }
    async receivedDataOnSocket (){
        console.log('A client connected App controleer');
        let socket = getSocketIo();
        socket.on('coordinates', (data) => {
            console.log('Received data from client:', data.coords.longitude);
        });
    
        socket.on('shipper', (data) => {
            console.log('Received data from client:', data);
        });
    }

    async getDataCustomer (req, res) {
        try {
            console.log("OKKKKKKKKKKKK")
            console.log("req.params: ", req.params.PhoneCustomer);
            let data = await AppService.getDataCustomer(req.params.PhoneCustomer);
            return res.status(data.Type).json({data: data});
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }

    async buyPrescription( req, res){
        try {
            let checkBody = checkReqBody(req.body);
            console.log("req.body buy: ", req.body.dataPrescription);
            if( checkBody.Success === true) {
                let data = await AppService.buyPrescription(req.body.dataPrescription);
                return res.status(data.Type).json({data: data});
            }
            return res.status(checkBody.Type).json({data: checkBody});
        } catch (error ){
            console.log("Error Controller: ", error);
            return res.status(INTERNAL_ERROR).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }
    
}

module.exports = new AppController;