// signInPage.js
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.querySelector('form');
    signinForm.addEventListener('submit', handleSignIn);
});

function handleSignUpClick() {
    window.location.href = 'signup.html'; // Redirect to sign-up page
}

function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const role = document.querySelector('.role-select').value;

    // Validate credentials
    const isValid = validateCredentials(email, password, role);
    
    if (isValid) {
        // Store current user info in session
        sessionStorage.setItem('currentUser', JSON.stringify({
            email: email,
            role: role
        }));

        // Redirect based on role
        switch(role.toLowerCase()) {
            case 'project manager':
                window.location.href = 'PMdashboard.html';
                break;
            case 'site manager':
                window.location.href = 'SMdashboard.html';
                break;
            default:
                alert('Invalid role selected');
        }
    } else {
        alert('Invalid email, password, or role. Please try again.');
    }
}

function validateCredentials(email, password, role) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching email
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return false; // User not found
    }
    
    // Validate password and role
    return user.password === password && user.role.toLowerCase() === role.toLowerCase();
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
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