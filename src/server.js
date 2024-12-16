var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var cors = require('cors');
var dotenv = require('dotenv');
var authRoutes = require('./routes/auth.js');

dotenv.config();

var app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(function() {
    console.log('Connected to MongoDB');
  })
  .catch(function(err) {
    console.error('MongoDB connection error:', err);
  });

// User Schema
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    otp: String,
    isVerified: Boolean
});

var User = mongoose.model('User', userSchema);

// Email configuration
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-specific-password'
    }
});

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Signup endpoint
app.post('/api/signup', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var otp = generateOTP();
    
    // Create new user
    var user = new User({
        email: email,
        password: password, // Note: In production, hash the password
        otp: otp,
        isVerified: false
    });
    
    user.save()
        .then(function() {
            // Send OTP email
            var mailOptions = {
                from: 'your-email@gmail.com',
                to: email,
                subject: 'Verification OTP',
                text: 'Your OTP is: ' + otp
            };

            return transporter.sendMail(mailOptions);
        })
        .then(function() {
            res.json({ message: 'User registered. Please verify OTP.' });
        })
        .catch(function(error) {
            res.status(500).json({ error: error.message });
        });
});

// Verify OTP endpoint
app.post('/api/verify-otp', function(req, res) {
    var email = req.body.email;
    var otp = req.body.otp;

    User.findOne({ email: email }).then(function(user) {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is already verified
        if (user.isVerified) {
            return res.status(400).json({ error: 'User is already verified' });
        }

        if (user.otp === otp) {
            user.isVerified = true;
            user.otp = null;
            return user.save().then(function() {
                res.json({ message: 'OTP verified successfully' });
            });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    }).catch(function(error) {
        res.status(500).json({ error: error.message });
    });
});

// Routes
app.use('/api/auth', authRoutes);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
}); 