// Initialize an array to store project data
var projects = [];

// Function to add a new project
function addProject(project) {
    projects.push(project);
    updateProjectTable();
}

// Function to update the project table
function updateProjectTable() {
    var tableBody = document.querySelector('#projectTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    projects.forEach(function(project) {
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td><a href="ProjectDetails.html">' + project.name + '</a></td>' +
            '<td>' + project.startDate + '</td>' +
            '<td>' + project.endDate + '</td>' +
            '<td>' + project.status + '</td>';
        tableBody.appendChild(row);
    });
}

// Handle form submission
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var newProject = {
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectOverview').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value,
        status: 'In Progress' // Set the initial status
    };

    addProject(newProject); // Add the new project
    this.reset(); // Reset the form
});

// Toggle profile menu function
document.querySelector('.profile-icon').addEventListener('click', function(event) {
    var menu = document.getElementById('profileMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    event.stopPropagation();
});

// Close profile menu if clicked outside
document.addEventListener('click', function(event) {
    var menu = document.getElementById('profileMenu');
    if (menu.style.display === 'block' && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

function filterManagers() {
    var input = document.getElementById('managerSearch');
    var filter = input.value.toLowerCase();
    var dropdown = document.getElementById('managerDropdown');
    var divs = dropdown.getElementsByTagName('div');

    for (var i = 0; i < divs.length; i++) {
        var label = divs[i].getElementsByTagName('label')[0];
        if (label) {
            var txtValue = label.textContent || label.innerText;
            divs[i].style.display = txtValue.toLowerCase().includes(filter) ? '' : 'none';
        }
    }
}

document.getElementById('memberSearch').addEventListener('focus', function() {
    document.getElementById('memberDropdown').style.display = 'block'; // Show dropdown on focus
});

document.getElementById('memberSearch').addEventListener('blur', function() {
    setTimeout(function() {
        document.getElementById('memberDropdown').style.display = 'none'; // Hide dropdown after a short delay
    }, 100);
});
