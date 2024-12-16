
// Select the form and input elements
const signupForm = document.getElementById('signupForm');
const signupUsernameInput = document.getElementById('signupUsername');
const signupPasswordInput = document.getElementById('signupPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const roleInput = document.getElementById('role');
const alertContainer = document.getElementById('alertContainer');

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

// Handle the sign-up form submission
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const role = roleInput.value;

    // Basic validation
    if (!username || !password || !confirmPassword || !role) {
        showAlert('Please fill in all fields!', 'danger');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'danger');
        return;
    }

    // Check if the username already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === username)) {
        showAlert('Username already exists!', 'danger');
        return;
    }

    // Save new user to localStorage
    existingUsers.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Redirect to login page
    showAlert('Account created successfully! You can now log in.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});

// Handle the sign-up form submission
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const role = roleInput.value;

    // Basic validation
    if (!username || !password || !confirmPassword || !role) {
        showAlert('Please fill in all fields!', 'danger');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'danger');
        return;
    }

    // Check if the username already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === username)) {
        showAlert('Username already exists!', 'danger');
        return;
    }

    // Save new user to localStorage
    existingUsers.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Redirect to login page
    showAlert('Account created successfully! You can now log in.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});
