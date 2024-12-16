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
