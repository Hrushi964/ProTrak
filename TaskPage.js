// Array to hold tasks
var tasks = [];

// Function to handle form submission
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    var taskTitle = document.getElementById('taskTitle').value;
    var taskDescription = document.getElementById('taskDescription').value;
    var startDate = document.getElementById('startDate').value;
    var dueDate = document.getElementById('dueDate').value;
    var priority = document.getElementById('priority').value;
    var siteManager = document.getElementById('siteManager').value; // Get site manager

    // Create a new task object
    var newTask = {
        title: taskTitle,
        description: taskDescription,
        startDate: startDate,
        dueDate: dueDate,
        siteManager: siteManager // Add site manager to task object
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Update the task table
    updateTaskTable();

    // Clear the form
    document.getElementById('taskForm').reset();
});

// Function to update the task table
function updateTaskTable() {
    var taskTableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    taskTableBody.innerHTML = ''; // Clear existing tasks

    tasks.forEach(function(task) {
        var row = taskTableBody.insertRow();
        row.insertCell(0).innerText = task.title;
        row.insertCell(1).innerText = task.startDate;
        row.insertCell(2).innerText = task.dueDate;
        row.insertCell(3).innerText = task.siteManager; // Display site manager
    });
}

function toggleProfileMenu(event) {
    var menu = document.getElementById('profileMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    event.stopPropagation();
}

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