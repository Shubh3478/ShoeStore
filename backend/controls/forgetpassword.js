const User = require('../models/userdata');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Create the transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Corrected typo here
    auth: {
        user: 'mhakalshiv8000@gmail.com', // Your email
        pass: process.env.EMAIL_PASSWORD, // Use environment variable for security
    },
    tls: {
        rejectUnauthorized: false, // Allow unauthorized certificates (can be improved for production)
    },
});

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // console.log("Request Email:", email); // Logging the email received

        // Check if user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            // If no user is found, send error response
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }
        const resetLink =  `http://localhost:3000/reset-password`;
        // Define the email options
        const mailOptions = {
            from: 'mhakalshiv8000@gmail.com', // Sender's email
            to: email, // Receiver's email
            subject: "Password Reset Request", // Subject of the email
            // text: "I am using Nodemailer to send this email. Here is your password reset link: [insert link]",
            html:  `
            <h3>Password Reset Request</h3>
            <p>Hi,</p>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${resetLink}" target="_blank">Reset Your Password</a>
            <p><strong>Important:</strong> The link will expire in 1 hour for security purposes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <br>
            <p>Best regards,</p>
            <p>StepStyle Team</p>
        `, 
        };

        // Send the email using Nodemailer
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error); // Log error for debugging
                return res.status(500).json({
                    success: false,
                    message: 'Email failed to send',
                });
            }
            // console.log('Email sent:', info.response); // Log the successful email response
            // Respond back with a success message
            res.status(200).json({
                success: true,
                message: 'Password reset email sent successfully.',
            });
        });

    } catch (err) {
        // Handle unexpected errors
        // console.error(err); // Log the error to the console for debugging
        res.status(500).json({
            success: false,
            message: "Internal server error", // Send a generic error message
        });
    }
};

module.exports = forgetPassword;
