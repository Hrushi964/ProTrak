// Simulated task data
var tasks = [
    { name: "Foundation Concrete Pour", dueDate: "2023-05-15", status: "In Progress" },
];

// Function to update task status
function updateTask() {
    var taskStatus = document.getElementById('taskStatus');
    if (taskStatus.innerText === "In Progress") {
        taskStatus.innerText = "Completed";
        alert("Task status updated to Completed!");
        updateTaskOverview();
    } else {
        alert("Task is already completed.");
    }
}

// Function to update task overview counts
function updateTaskOverview() {
    var totalTasks = tasks.length;
    var completedTasks = tasks.filter(function(task) {
        return task.status === "Completed";
    }).length;
    var inProgressTasks = tasks.filter(function(task) {
        return task.status === "In Progress";
    }).length;
    var pendingSubmissionTasks = 5; // Example static value

    // Update the UI elements with the counts
    document.getElementById('totalTasks').innerText = totalTasks;
    document.getElementById('completed').innerText = completedTasks;
    document.getElementById('inProgress').innerText = inProgressTasks;
    document.getElementById('pendingSubmission').innerText = pendingSubmissionTasks;
}

var isProfileMenuOpen = false;

function toggleProfileMenu() {
    var profileMenu = document.getElementById('profileMenu');
    isProfileMenuOpen = !isProfileMenuOpen;
    profileMenu.style.display = isProfileMenuOpen ? 'block' : 'none';
}

// Close the profile menu if clicked outside
document.addEventListener('click', function(event) {
    var profileMenu = document.getElementById('profileMenu');
    var profileIcon = document.querySelector('.profile-icon');

    if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.style.display = 'none';
        isProfileMenuOpen = false;
    }
});

function handleTaskClick(taskId) {
    // Highlight the clicked task
    var tasks = document.querySelectorAll('.nav-task');
    tasks.forEach(function(task) {
        task.classList.remove('active'); // Remove active class from all tasks
    });
    document.getElementById(taskId).classList.add('active'); // Add active class to clicked task
}

// Add event listeners for tasks
var taskElements = document.querySelectorAll('.nav-task');
taskElements.forEach(function(task) {
    task.addEventListener('click', function() {
        handleTaskClick(task.id);
    });
}); 