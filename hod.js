// Get references to the DOM elements
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');
const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
const attendanceSummary = document.getElementById('attendanceSummary');
const presentCount = document.getElementById('presentCount');
const absentCount = document.getElementById('absentCount');

// Retrieve students from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Display the username for the logged-in HOD
const username = localStorage.getItem('username');
if (username) {
    usernameDisplay.textContent = username;
} else {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
}

// Function to render students in the table based on search query
function renderStudents(searchQuery = '') {
    attendanceTable.innerHTML = '';  // Clear the table

    // Filter students based on the search query (name, enrollment number, or branch)
    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               student.enrollmentNumber.includes(searchQuery) ||
               student.branch.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Update Attendance Summary
    updateAttendanceSummary(filteredStudents);

    // Render the filtered students in the table
    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.enrollmentNumber}</td>
            <td>${student.branch}</td>
            <td>${student.batch}</td>
            <td>${student.gender}</td>
            <td>${student.day}</td>
            <td>${student.date}</td>
            <td>${student.attendance}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="toggleAttendance(${index})">Toggle Attendance</button>
                <button class="btn btn-danger btn-sm" onclick="removeStudent(${index})">Remove</button>
            </td>
        `;
        attendanceTable.appendChild(row);
    });
}

// Function to update the attendance summary (present/absent count)
function updateAttendanceSummary(filteredStudents) {
    const presentStudents = filteredStudents.filter(student => student.attendance === 'Present').length;
    const absentStudents = filteredStudents.length - presentStudents;

    presentCount.textContent = presentStudents;
    absentCount.textContent = absentStudents;
}

// Function to toggle attendance (Present/Absent)
function toggleAttendance(index) {
    const student = students[index];
    student.attendance = (student.attendance === 'Present') ? 'Absent' : 'Present';
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();  // Re-render the table after toggling attendance
}

// Function to remove a student
function removeStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();  // Re-render the table after removal
}

// Handle search input changes
searchInput.addEventListener('input', function () {
    renderStudents(searchInput.value.trim());
});

// Handle logout button click
logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = 'login.html';  // Redirect to login page
});

// Render all students initially
renderStudents();