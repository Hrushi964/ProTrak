document.addEventListener('DOMContentLoaded', function() {
    console.log('Teams page loaded');
});

// Function to toggle the profile menu
function toggleProfileMenu() {
    var profileMenu = document.getElementById("profileMenu");
    if (profileMenu.classList.contains("show")) {
        profileMenu.classList.remove("show");
    } else {
        profileMenu.classList.add("show");
    }
}

// Close the profile menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.profile-icon') && !event.target.matches('.profile-icon *')) {
        var profileMenu = document.getElementById("profileMenu");
        if (profileMenu.classList.contains('show')) {
            profileMenu.classList.remove('show');
        }
    }
};

// Example data
var employeeData = [
    { role: 'Role A', total: 10, currentlyWorking: 8, free: 2 },
    { role: 'Role B', total: 20, currentlyWorking: 15, free: 5 },
    { role: 'Role C', total: 5, currentlyWorking: 3, free: 2 },
];

// Function to update employee overview
function updateEmployeeOverview() {
    employeeData.forEach(function(data, index) {
        document.getElementById('total-role-' + String.fromCharCode(97 + index)).innerText = data.total; // 'a' = 97
        document.getElementById('currently-working-role-' + String.fromCharCode(97 + index)).innerText = data.currentlyWorking;
        document.getElementById('free-role-' + String.fromCharCode(97 + index)).innerText = data.free;
    });
}

// Call the function to update the overview
updateEmployeeOverview();
