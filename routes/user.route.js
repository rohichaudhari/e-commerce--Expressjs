const express = require('express');
const userRoutes = express.Router();
const {RegisterUser,loginUser,userProfile,updateUser,deleteUser,getAllUser,changePassword} = require('../controller/user.controller');
const{upload} = require('../helpers/imageUpload');
const {verifyToken} = require('../helpers/tokenverify');

userRoutes.post('/register',upload.single("profileImage"),RegisterUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/userverify',verifyToken,userProfile);
userRoutes.put('/updateUser',verifyToken,updateUser);
userRoutes.delete('/delete',verifyToken,deleteUser);
userRoutes.get('/allUser',getAllUser);
userRoutes.put('/chagePassword',verifyToken,changePassword);
// userRoutes.post('/register', RegisterUser);

module.exports =userRoutes;