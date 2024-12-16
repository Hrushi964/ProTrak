// otp.js
function sendOTP() {
    var phoneInput = document.querySelector('input[type="tel"]');
    var otpInput = document.querySelector('input[placeholder="Enter OTP"]');
    var sendOTPButton = document.querySelector('#sendOTPButton');

    sendOTPButton.addEventListener('click', function(e) {
        e.preventDefault();
        sendOTPButton.classList.add('loading');
        
        // Simulate OTP sending (replace with actual API call)
        setTimeout(function() {                                       
            sendOTPButton.classList.remove('loading');
            otpInput.disabled = false;
            alert('OTP sent successfully!');
        }, 1500);
    });
}
