var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = []; // In-memory storage for users (replace with a database in production)

// New API endpoint for signup
app.post('/api/signup', function(req, res) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    // Check if user already exists
    var existingUser = users.find(function(user) {
        return user.email === email;
    });
    if (existingUser) {
        return res.status(400).send('User with this email already exists!');
    }

    // Save new user
    users.push({
        fullName: fullName,
        email: email,
        password: password,
        role: role
    });
    res.status(201).send('User created');
});

// New API endpoint for login
app.post('/api/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    // Find user with matching credentials and role
    var user = users.find(function(user) {
        return user.email === email && user.password === password && user.role === role;
    });
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Define a route for the root URL using traditional function syntax
app.get('/', function(req, res) {
    res.send('Hello, World!');
});

app.listen(PORT, function() {
    console.log('Server is running on port ' + PORT);
});
