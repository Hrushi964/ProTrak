var signinForm = document.querySelector('form');

signinForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var formData = {
    email: document.querySelector('input[type="email"]').value,
    password: document.querySelector('input[type="password"]').value,
    role: document.querySelector('.role-select').value
  };

  fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);

      if (data.role === 'project_manager') {
        window.location.href = 'PMdashboard.html';
      } else if (data.role === 'site_manager') {
        window.location.href = 'SMdashboard.html';
      }
    } else {
      alert(data.message);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
    alert('An error occurred during signin');
  });
}); 