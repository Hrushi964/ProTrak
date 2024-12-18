// signInPage.js
function handleSignUpClick() {
    window.location.href = 'signup.html'; // Redirect to sign-up page
}

function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var email = document.querySelector('input[type="email"]').value;
    var password = document.querySelector('input[type="password"]').value;
    var role = document.querySelector('.role-select').value;

    // Validate credentials
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            role: role
        })
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Incorrect email, password, or role');
        }
    })
    .then(function(user) {
        // Redirect based on role
        switch(user.role) {
            case 'project manager':
                window.location.href = 'PMdashboard.html';
                break;
            case 'site manager':
                window.location.href = 'SMdashboard.html';
                break;
            default:
                alert('Invalid role selected');
        }
    })
    .catch(function(error) {
        alert(error.message);
    });
}

// validation.js
function validateForm(formType) {
    var form = document.querySelector(formType === 'signup' ? '#signupForm' : '#signinForm');
    
    // Email validation
    var email = form.querySelector('input[type="email"]');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
    var password = form.querySelector('input[type="password"]');
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    
    // Full name validation
    var fullName = form.querySelector('input[name="fullName"]');
    var nameRegex = /^[a-zA-Z\s]+$/;  // Only letters and spaces allowed

    // Phone validation (if signup form)
    var phone = formType === 'signup' ? form.querySelector('input[type="tel"]') : null;
    var phoneRegex = /^\d{10}$/;

    email.addEventListener('input', function() {
        if (!emailRegex.test(email.value)) {
            email.setCustomValidity('Please enter a valid email address');
        } else {
            email.setCustomValidity('');
        }
    });

    password.addEventListener('input', function() {
        if (!passwordRegex.test(password.value)) {
            password.setCustomValidity('Password must contain at least 8 characters, including uppercase, lowercase, and numbers');
        } else {
            password.setCustomValidity('');
        }
    });

    fullName.addEventListener('input', function() {
        // Remove any numbers or special characters immediately
        fullName.value = fullName.value.replace(/[^a-zA-Z\s]/g, '');
        
        if (!nameRegex.test(fullName.value)) {
            fullName.setCustomValidity('Please enter a valid name (only letters allowed)');
        } else {
            fullName.setCustomValidity('');
        }
    });

    if (phone) {
        phone.addEventListener('input', function() {
            // Remove any non-numeric characters immediately
            phone.value = phone.value.replace(/[^\d]/g, '');
            
            // Limit to 10 digits
            if (phone.value.length > 10) {
                phone.value = phone.value.slice(0, 10);
            }
            
            if (phone.value.length !== 10) {
                phone.setCustomValidity('Please enter exactly 10 digits');
            } else {
                phone.setCustomValidity('');
            }
        });
    }
}

function validateCredentials(email, password, role) {
    return new Promise(function(resolve, reject) {
        // Retrieve users from local storage
        var users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user with matching credentials and role
        var user = users.find(function(user) {
            return user.email === email && 
                   user.password === password && 
                   user.role === role;
        });

        // Resolve with true if user found, false otherwise
        resolve(!!user);
    });
}

function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Show password
    } else {
        passwordInput.type = "password"; // Hide password
    }
}

// Add event listener to form submission
document.querySelector('.form-group').addEventListener('submit', handleSignIn);