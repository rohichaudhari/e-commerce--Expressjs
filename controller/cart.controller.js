const cartServices = require('../services/cart.service');

const cartService = new cartServices();

exports.addToCart = async (req, res) => {
  try {
    let cart = await cartService.getOneCart({userId : req.user._id,  
        productId : req.body.productId, 
        isDeleted : false});
    if(cart){
        cart.quantity += req.body.quantity || 1
        await cartService.updateCart(cart._id,{quantity : cart.quantity});
        res.status(200).json({message : 'product Added To Cart susses',IncreaseBy: cart.quantity});
      }else{
      cart = await cartService.createCart({...req.body , userId : req.user._id});
      res.status(201).json({message : 'Product Added To cart SussesFully....',cart});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateToCart = async (req,res) => {
  try {
    let cart = await cartService.getOneCart({userId : req.user._id,  
        productId : req.body.productId, 
        isDelete : false});
    if(!cart) return res.status(404).json({message : "cart Not Found Can't update..."});
    cart = await cartService.updateCart( cart._id,{ quantity : req.body.quantity});
    res.status(200).json({message :'cart Update SussesFully...',updated : req.body.quantity});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.deleteToCart = async (req,res) => {
  try {
    const cart = await cartService.getOneCart({userId : req.user._id, 
        productId : req.body.productId, 
        isDelete: false});
    await cartService.updateCart(cart._id,{isDelete : true });
    res.status(200).json({message : 'Product Was Deleted....',cart});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.getAllCart = async (req,res) => {
  try {
    const Carts = await cartService.getAllCart({
        userId :  req.user._id, 
        isDelete : false});
    if(Carts.length === 0) return res.status(404).json({message :  'cart Can t Find '});
    res.status(200).json({Carts});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}