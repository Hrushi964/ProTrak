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