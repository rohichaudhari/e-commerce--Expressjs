const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserServices=require('../services/user.service')
const service= new UserServices();

// register user

exports.RegisterUser = async (req,res) =>{
    try {
        console.log(req.body);
        
        let imagepath = "";
        let user = await service.getUser({email:req.body.email, isDelete:false});
        console.log("user =======>",user);
        
        if(user){
            return res.status(400).json({message:'User already exist..'});
        }
        if(req.file){
            console.log(req.file.path);
            imagepath = req.file.path.replace(/\\/g,"/");
        }
        let hasPassword = await bcrypt.hash(req.body.password,10);
         
        console.log(hasPassword);
        user = await User.create({...req.body,password: hasPassword,profileImage:imagepath});
        // user = await  service.createUser({...req.body,password: hasPassword});
        console.log("New User====>", user);
        
        user.save();
        res.status(201).json({user,message:'user registration successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'=====Internal server error'})
    }
};

// login user
exports.loginUser = async (req,res)=>{
    try {
        let user = await service.getUser({email:req.body.email,isDelete:false});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        let matchpassword = await bcrypt.compare(req.body.password,user.password);
        console.log(matchpassword);
        if(!matchpassword){
            return res.status(404).json({message:'email and password invalid'});
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(200).json({message:'user login success',token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server Error'})
    }
};
// user profile
exports.userProfile = async (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internav server error'});
    }
};

// update user
exports.updateUser = async (req,res)=>{
    try {
        let user = req.user;
        user = await service.updateuser(
            user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user,message:'user update successfull'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server Error'});
    }
};

// delete user
exports.deleteUser = async (req,res) =>{
    try {
        let user =  req.user;
        user = await service.deleteuser(
            user._id,
            {isDelete:true}
        );
        res.status(202).json({user,message:'user delete successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
};

// get All user
exports.getAllUser = async (req,res)=>{
    let user = await service.allUser({isDelete:false});
    res.json(user);
    
}

// change password

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user._id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password is not match" });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
