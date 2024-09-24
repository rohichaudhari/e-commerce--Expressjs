const Cart = require('../model/cart.model');

class cartServices {
    async getOneCart (body) {
        return await Cart.findOne(body);
    }
    async getAllCart (body) {
        return await Cart.find(body);
    }
    async createCart (body) {
        return await Cart.create(body);
    };

    async updateCart (id,updateBody) {
        return await Cart.findByIdAndUpdate(id,{$set : updateBody } , {new : true})
    };
};


module.exports = cartServices;
