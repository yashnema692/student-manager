// Get references to the DOM elements
const alertContainer = document.getElementById('alertContainer');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role');

// Function to show alerts
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`);
    alert.textContent = message;
    alertContainer.appendChild(alert);

    // Auto-dismiss the alert after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Handle the login form submission
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleInput.value;

    if (!username || !password || !role) {
        showAlert('Please fill in all fields!', 'danger');
        return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with matching username, password, and role
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // Redirect based on role
        if (role === 'faculty') {
            window.location.href = 'index.html';
        } else if (role === 'student') {
            window.location.href = 'student.html';  // Assuming this is a student-specific page
        } else if (role === 'hod') {
            window.location.href = 'hod.html';  // Redirect to HOD page
        }
    } else {
        showAlert('Invalid username, password, or role!', 'danger');
    }
});
