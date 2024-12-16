// Get references to the DOM elements
const searchEnrollment = document.getElementById('searchEnrollment');
const searchBtn = document.getElementById('searchBtn');
const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
const logoutBtn = document.getElementById('logoutBtn');
const attendanceStats = document.getElementById('attendanceStats');
const alertContainer = document.getElementById('alertContainer');

// Retrieve students from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to render students in the table with serial number and search functionality
function renderStudents(searchQuery = '') {
    attendanceTable.innerHTML = ''; // Clear the table

    // Filter students based on the search query (name or enrollment number)
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.enrollmentNumber.includes(searchQuery)
    );

    let presentCount = 0;
    let absentCount = 0;

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
        `;

        if (student.attendance === 'Present') {
            presentCount++;
        } else {
            absentCount++;
        }

        attendanceTable.appendChild(row);
    });

    // Update attendance stats
    attendanceStats.textContent = `Total Present: ${presentCount} | Total Absent: ${absentCount}`;
}

// Function to show alerts
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`);
    alert.textContent = message;
    alertContainer.appendChild(alert);

    // Auto-dismiss the alert after 3 seconds
    setTimeout(() => alert.remove(), 3000);
}

// Function to sort table columns
function sortTable(columnIndex) {
    const rows = Array.from(attendanceTable.rows);
    const sortedRows = rows.sort((rowA, rowB) => 
        rowA.cells[columnIndex].innerText.localeCompare(rowB.cells[columnIndex].innerText)
    );

    // Reattach the sorted rows
    attendanceTable.innerHTML = '';
    sortedRows.forEach(row => attendanceTable.appendChild(row));
}

// Handle Search Button Click
searchBtn.addEventListener('click', () => {
    const searchQuery = searchEnrollment.value.trim();
    renderStudents(searchQuery); // Render filtered list based on the search query
});

// Handle Logout Button Click
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
        window.location.href = 'index.html'; // Redirect to index.html (or login page)
    }
});

// Initial Render
renderStudents();
