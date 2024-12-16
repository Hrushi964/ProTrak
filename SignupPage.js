// signupPage.js
document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        var fullName = document.getElementById('fullname').value;
        var role = document.getElementById('role').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var phone = document.getElementById('phone').value;
        var otp = document.getElementById('otp').value;

        // Basic validation
        if (!fullName || !role || !email || !password || !phone || !otp) {
            alert('Please fill in all fields');
            return;
        }

        // Create user object
        var userData = {
            fullName: fullName,
            role: role,
            email: email,
            password: password,
            phone: phone
        };

        // Store user data
        storeUserData(userData);
    });
});

function storeUserData(data) {
    // Retrieve existing users or initialize empty array
    var users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    var existingUser = users.find(function(user) {
        return user.email === data.email;
    });
    if (existingUser) {
        alert('User with this email already exists!');
        return;
    }

    // Add new user
    users.push(data);
    
    // Store updated users array
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and redirect
    alert('Registration Successful! Please Sign In.');
    window.location.href = 'signin.html';
}

function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Show password
    } else {
        passwordInput.type = "password"; // Hide password
    }
}