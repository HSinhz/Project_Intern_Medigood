const AppService = require("../../Services/AppService");
const SocketService = require("../../webSocket")
class AppController  {
    async handlerLoginApp(req, res ){
        try {
            let Email = req.body.Email;
            console.log(Email)
            if( Email ){
                let data = await AppService.handlerLoginApp(Email);
                if( data.Success === true ){
                    return res.status(200).json({data});
                } 
                return res.status(200).json({data});
            } return res.status(200).json({
                Success: false,
                Mess: 'Email không tồn tại 1'
            })
        } catch (error ){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from server',
            })
        }
    }
    async updateStatusUpdate(req, res){
        try {
            let Email = req.params.email;
            let Status = req.body.Status;
            if( Email ){
                let data = await AppService.updataStatusUpdate(Email, Status);
                if( data.Success === true){
                    return res.status(200).json({data});
                }
                return res.status(200).json({data});
            } 
            return res.status(200).json({
                Success: false,
                Mess: 'Email trống'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: 'Error from server'
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

    async showOrderWithStatus( req, res ) {
        try {
            const dataShipper = await SocketService.getDataWSShipper();
            let statusOrder = req.params.status;
            let ShopId = req.user.ShopId;
            if( req.user ) {
                let data = await AppService.showOrderWithStatus(ShopId, statusOrder);
                return res.status(201).json({data});
            } else {
                return res.status(401).json({
                    Success: false,
                    Mess: ''
                })
            }
        } catch (error ){
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess:'Error from server'
            })
        }   
    }

    async updateStatusOrder( req, res){
        try  {
            if(req.user){
                console.log("")
                if( req.params) {
                    let data = await AppService.updateStatusOrder(req.user.ShopId, req.body.Status, req.params.orderId, req.user.EmployeeId);
                    if( data.Success === true) {
                        return res.status(200).json({data})
                    }
                    return res.status(200).json({data})
                } 
                return res.status(200).json({
                    Success: false,
                    Mess: 'Không có đơn hàng'
                })
            }
            return res.status(200).json({
                Success: false,
                Mess: 'Không có cửa hàng'
            })
        } catch (error){
            console.log(error);
            return res.status(500).json({
                Success: false,
                Mess: "Error from server"
            })
        }
    }
}

module.exports = new AppController;