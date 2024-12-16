var signupForm = document.querySelector('form');

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var fullname = document.getElementById('fullname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var phone = document.getElementById('phone').value;
  var role = document.getElementById('role').value;

  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname: fullname, email: email, password: password, phone: phone, role: role })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.message) {
      alert('Details submitted successfully! Please check your email for OTP');
    } else {
      alert(data.error);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
    alert('Signup failed');
  });
});

function verifyOTP() {
  var email = document.getElementById('email').value;
  var otp = document.getElementById('otp').value;

  fetch('/api/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, otp: otp })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (response.ok) {
      alert('OTP verified successfully');
      window.location.href = '/signin.html';
    } else {
      alert(data.error);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
    alert('OTP verification failed');
  });
}