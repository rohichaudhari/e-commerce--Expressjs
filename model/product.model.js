const mongoose = require("mongoose");  
const productSchema = mongoose.Schema({ 
  "isDeleted" : { 
        type : Boolean, 
        default : false 
    }, 
    "title": { 
        type : String, 
        required : true 
    }, 
    "description": { 
        type : String, 
        required : true 
    }, 
    "category": { 
        type : String , 
        required : true 
    } , 
    "price" : { 
        type : Number, 
        required : true 
    }, 
    "discountPercentage": Number, 
    "brand": String, 
    "currency":{
      type:String
    },
  "size":{
    type:[String]
  },
    
    "color":{
      type:[String]
    },
    "material":{
      type:String
    },  
    "rating":{ 
        type : Number, 
        required : true 
    }
  
  }); 
  module.exports = mongoose.model("products",productSchema)
