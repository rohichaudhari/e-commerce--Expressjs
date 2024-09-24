const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    mobileNo:{
        type:String
    },
    age:{
        type:Number
    },
    profileImage:{
        type:String
    },
    // hobbies:[{
    //     type:String
    // }],
    address:{
        line1:String,
        line2:String,
        pincode:Number
    },
    isDelete:{
        type:Boolean,
        default:false
    },
},
{
    versionKey: false,
    timestamps:true
});

module.exports = mongoose.model('users',userSchema);
