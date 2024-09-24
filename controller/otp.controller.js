//  otpController.js
const { sendOTP } = require('../services/user.service');

// Example API to send OTP
const sendOTPController = async (req, res) => {
    const { email } = req.body;  // Get the email from the request body
    const otp = Math.floor(100000 + Math.random() * 900000);  // Generate a random 6-digit OTP

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Send the OTP to the user's email
    const result = await sendOTP(email, otp);

    if (result.success) {
        res.status(200).json({ message: 'OTP sent to your email', otp });
    } else {
        res.status(500).json({ message: result.message });
    }
};

module.exports = { sendOTPController };