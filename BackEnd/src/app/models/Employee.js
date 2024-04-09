const  mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const Employee = new Schema({
        Email: { type:String, required: true },
        Password: { type:String, required: true },
        Name: { type:String, required: true },
        Phone: { type:String, required: true },
        Address: { type:String, required: true },
        Gender: { type: Boolean, required: true},
        Shop_Name: { type: String, required: true},
        Shop_Address: { type: String, required: true},
        Scope: { type: Boolean, default: false},
        Verify: { type: Boolean},
        URIVerify : { type: String },
        Code_Verify: { type: Number},
        Token_Verify: { type: String},
        ExpVerify: { type: Number},
        Verify: { type: Boolean, default: false},
        Access_token: {type: String},
        Refresh_token: {type: String},
        PositionId: {type: Number},
        Online: {type: Boolean, default: false}
    },
    {
        timestamps: true,
    },
);


Employee.pre('save', async function(next){
    try{
        console.log('password: ', this.Password)
        const salt = await bcryptjs.genSalt(10);
        console.log('salt: ' , salt);
        const passwordHashed = await bcryptjs.hash(this.Password, salt);
        console.log('passwordHashed: ',passwordHashed);
        this.Password = passwordHashed;
        return false;
    } catch ( error){
        next(error);
    }
})
module.exports = mongoose.model('Employee', Employee); 