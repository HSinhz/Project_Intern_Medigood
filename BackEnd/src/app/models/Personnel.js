const  mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;
const Personnel = new Schema({
        Email: { type:String, required: true },
        Password: { type:String, default: 111111 },
        PositionId: {type: Number},
        BranchId: {type: String, default: 'abc'},
        LastName: { type:String, required: true },
        FirstName: { type:String, required: true },
        Phone: { type:String, required: true },
        Address: { type:String, required: true },
        Gender: { type: Number, required: true},
        ImgUrl : {type: String, required: true},
        BirthDay: {type: String, required: true},
        Country: {type: String, required: true},
        Gender: { type: String, required: true},
        Verify: { type: Boolean},
        URIVerify : { type: String },
        Code_Verify: { type: Number},
        Token_Verify: { type: String},
        ExpVerify: { type: Number},
        Verify: { type: Boolean, default: false},
        Access_token: {type: String},
        Refresh_token: {type: String},
        Online: {type: Boolean, default: false},
        OnlineRecent: {type: Number},
        OnlineTotal: {type: Number, default: 0},
        TotalOrder: {type: Number, default: 0},
        Decscription: {type: String}
    },
    {
        timestamps: true,
    },
);


Personnel.pre('save', async function(next){
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
module.exports = mongoose.model('Personnel', Personnel); 