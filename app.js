// Select DOM elements
const addStudentBtn = document.getElementById('addStudentBtn');
const studentNameInput = document.getElementById('studentName');
const enrollmentNumberInput = document.getElementById('enrollmentNumber');
const branchInput = document.getElementById('branch');
const batchInput = document.getElementById('batch');
const genderInput = document.getElementById('gender');
const attendanceDateInput = document.getElementById('attendanceDate');
const dayInput = document.getElementById('day');
const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
const generateReportBtn = document.getElementById('generateReportBtn');
const reportDiv = document.getElementById('report');
const alertContainer = document.getElementById('alertContainer');
const searchInput = document.getElementById('searchInput');

// Initialize an empty array for students
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to render students in the table with serial number and search functionality
function renderStudents(searchQuery = '') {
    attendanceTable.innerHTML = '';  // Clear the table
    // Filter students based on the search query (name or enrollment number)
    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               student.enrollmentNumber.includes(searchQuery);
    });

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

// Function to add a new student
function addStudent() {
    const studentName = studentNameInput.value.trim();
    const enrollmentNumber = enrollmentNumberInput.value.trim();
    const branch = branchInput.value;
    const batch = batchInput.value;
    const gender = genderInput.value;
    const date = attendanceDateInput.value;
    const day = dayInput.value;

    // Validate inputs
    if (studentName && enrollmentNumber && branch && batch && gender && date && day) {
        students.push({
            name: studentName,
            enrollmentNumber: enrollmentNumber,
            branch: branch,
            batch: batch,
            gender: gender,
            day: day,
            date: date,  // Store selected date
            attendance: 'Absent'  // Default attendance
        });
        localStorage.setItem('students', JSON.stringify(students));
        resetForm();
        renderStudents();  // Render all students after adding
        showAlert('Student added successfully!', 'success');
    } else {
        showAlert('Please fill all the fields!', 'danger');
    }
}

// Function to reset form inputs
function resetForm() {
    studentNameInput.value = '';
    enrollmentNumberInput.value = '';
    branchInput.value = '';
    batchInput.value = '';
    genderInput.value = '';
    attendanceDateInput.value = '';
    dayInput.value = '';
}

// Function to toggle attendance (Present/Absent)
function toggleAttendance(index) {
    const student = students[index];
    student.attendance = (student.attendance === 'Present') ? 'Absent' : 'Present';
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();  // Re-render the table after toggling attendance
    showAlert(`Attendance updated to ${student.attendance}`, 'success');
}

// Function to remove a student
function removeStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();  // Re-render the table after removal
    showAlert('Student removed successfully!', 'success');
}

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

// Function to generate an attendance report (day + date + section-wise)
function generateReport() {
    if (students.length === 0) {
        reportDiv.innerHTML = '<p>No data available to generate the report.</p>';
        return;
    }

    // Group students by day, date, and section
    const groupedByDayAndSection = students.reduce((acc, student) => {
        const { day, date, batch, attendance } = student;
        const dayAndSectionKey = `${day} ${date}`;  // Combine day and date

        if (!acc[dayAndSectionKey]) {
            acc[dayAndSectionKey] = {};
        }

        if (!acc[dayAndSectionKey][batch]) {
            acc[dayAndSectionKey][batch] = { present: 0, absent: 0 };
        }

        // Increment the present/absent count based on attendance
        if (attendance === 'Present') {
            acc[dayAndSectionKey][batch].present++;
        } else {
            acc[dayAndSectionKey][batch].absent++;
        }

        return acc;
    }, {});

    // Build the HTML table for the report
    let reportHtml = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Day and Date</th>
                    <th>Section</th>
                    <th>Present</th>
                    <th>Absent</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Loop through grouped data and generate rows
    for (let dayAndDate in groupedByDayAndSection) {
        const sections = groupedByDayAndSection[dayAndDate];

        for (let section in sections) {
            const { present, absent } = sections[section];
            reportHtml += `
                <tr>
                    <td>${dayAndDate}</td>
                    <td>${section}</td>
                    <td>${present}</td>
                    <td>${absent}</td>
                </tr>
            `;
        }
    }

    reportHtml += '</tbody></table>';

    // Display the report
    reportDiv.innerHTML = reportHtml;
}

// Event Listeners
addStudentBtn.addEventListener('click', addStudent);
generateReportBtn.addEventListener('click', generateReport);

// Event listener for the search input
searchInput.addEventListener('input', (e) => {
    renderStudents(e.target.value);  // Re-render students as the user types
});

// Initial Render
renderStudents();
