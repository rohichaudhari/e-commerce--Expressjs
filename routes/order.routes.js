const express = require('express');

const orderRoutes = express.Router();

const {addNewOrder,deleteOrder} = require("../controller/order.controller");
const {verifyToken} = require("../helpers/tokenverify");

orderRoutes.post("/",verifyToken,addNewOrder);

orderRoutes.delete("/" , verifyToken , deleteOrder);

module.exports = orderRoutes;