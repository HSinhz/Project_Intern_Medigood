const PersonnelService = require('../../Services/PersonnelService');

class PersonnelController {
    async getEmployeeWithPagination(req, res ){
        try {
            if( req.user) {
                console.log(req.user);
                let data = await PersonnelService.getEmployeeWithPagination(req.user.email);
                if( data && data.Success === true) {
                    return res.status(200).json({data:data})
                }
                return res.status(200).json({data:data})
            } 
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Not Authenticated the user'
                }
            })
        } catch (error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            })
        }
    }

    async getPosition(req, res){
        try{
            if(req.user){
                let data = await PersonnelService.getPosition(req.user.email);
                if( data && data.Success === true){
                    return res.status(data.Type).json({data: data});
                }
                return res.status(data.Type).json({data: data});
            }
            return res.status(401).json({
                data: {
                    Success: false,
                    Mess: 'Lỗi vui lòng thử lại sau'
                }
            })
        } catch( error){
            return res.status(500).json({
                Success: false,
                Mess: 'Error from Server',
            }) 
        }
    }
 }

module.exports = new PersonnelController;