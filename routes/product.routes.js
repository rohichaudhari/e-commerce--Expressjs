const express = require('express'); 
const productRoutes = express.Router(); 
const { 
    addNewProduct, 
    getAllProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controller/product.controller"); 
 
 
//  add new product - create 
productRoutes.post("/addproduct",addNewProduct); 
productRoutes.get("/getAllProduct",getAllProduct); 
productRoutes.get("/get-product",getProduct); 
productRoutes.put("/update-product",updateProduct); 
productRoutes.delete("/delete-product",deleteProduct);
 
module.exports = productRoutes;
