const express = require('express');
const {verifyToken} = require("../helpers/tokenverify")
const { addToCart , deleteToCart , updateToCart , getAllCart } = require('../controller/cart.controller');

const CartRoutes = express.Router();

CartRoutes.get('/',verifyToken,getAllCart); 

CartRoutes.post('/',verifyToken,addToCart); 

CartRoutes.put('/updateCart',verifyToken,updateToCart);  
CartRoutes.delete('/deleteCart',verifyToken,deleteToCart); 

module.exports = CartRoutes;