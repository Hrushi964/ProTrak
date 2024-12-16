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

    projects.forEach(function(project, index) {
        var row = document.createElement('tr');
        row.innerHTML = 
            '<td>' + (index + 1) + '</td>' +
            '<td>' + project.name + '</td>' +
            '<td>' + project.startDate + '</td>' +
            '<td>' + project.endDate + '</td>';
        tableBody.appendChild(row);
    });
}

// Handle form submission
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var newProject = {
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        priority: document.getElementById('priority').value,
        siteManagers: Array.from(document.getElementById('siteManagers').selectedOptions).map(function(option) {
            return option.value;
        })
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
