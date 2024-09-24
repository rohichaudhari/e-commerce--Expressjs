const jwt = require('jsonwebtoken');

const UserServices = require('../services/user.service');
const userServices = new UserServices();
exports.verifyToken = async (req,res,next)=>{
    try {
        let authorization = req.headers['authorization'];
        if(!authorization){
            res.json({message:'user not Authorization'});
        }
        let token = authorization.split(" ")[1];
        let payload = await jwt.verify(token,process.env.JWT_SECRET);
        // console.log(payload);
        if(!payload){
            res.status(404).json({message:'user unauthorization'});
        }
        let user = await userServices.getUser({_id:payload.userId,isDelete:false});
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}
