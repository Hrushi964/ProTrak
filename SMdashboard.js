// Function to toggle the visibility of the profile menu
function toggleProfileMenu() {
    var menu = document.getElementById('profileMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Function to close the profile menu when clicking outside of it
window.onclick = function(event) {
    var menu = document.getElementById('profileMenu');
    if (!event.target.matches('.profile-icon') && menu.style.display === 'block') {
        menu.style.display = 'none';
    }
};

// Example function to simulate continuous updates (e.g., fetching tasks)
function fetchTasks() {
    // Simulate fetching tasks from an API
    setInterval(function() {
        // Here you would typically make an API call to get updated tasks
        console.log("Fetching updated tasks...");
        // Update the task list in the DOM as needed
    }, 5000); // Fetch every 5 seconds
}

// Call the fetchTasks function to start the updates
fetchTasks();