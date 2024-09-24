const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",  
            },
            quantity:{
                type:Number,
            },
            price:{
                type:Number
            },
            totalAmount:{
                type:Number
            },
        },],
    totalPrice:{
        type:Number,
        default:false
    }
},
{
    versionKey:false,
    timestamps:true,
});

module.exports = mongoose.model("order",orderSchema);
