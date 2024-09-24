// routes.js
const express = require('express');
const {sendOTPController} = require('../controller/otp.controller');
const otpRoutes =express.Router();

otpRoutes.post('/send-otp', sendOTPController);

module.exports = otpRoutes;