// Array of students
const students = [
    {
      ID: 1,
      name: "MD SOHAIL ALI",
      age: 22,
      grade: "9.2",
      degree: "Btech",
      email: "sohail@example.com",
    },
  ];
  
  // Variable to store the ID of the student being edited
  let editStudentID = null;
  
  // Function to create a table row for a student
  function createStudentRow(student) {
    const row = document.createElement("tr");
  
    // Create table cells for each student property
    const idCell = document.createElement("td");
    idCell.textContent = student.ID || "";
    row.appendChild(idCell);
  
    const nameCell = document.createElement("td");
    nameCell.textContent = student.name || "";
    row.appendChild(nameCell);
  
    const emailCell = document.createElement("td");
    emailCell.textContent = student.email || "";
    row.appendChild(emailCell);
  
    const ageCell = document.createElement("td");
    ageCell.textContent = student.age || "";
    row.appendChild(ageCell);
  
    const gradeCell = document.createElement("td");
    gradeCell.textContent = student.grade || "";
    row.appendChild(gradeCell);
  
    const degreeCell = document.createElement("td");
    degreeCell.textContent = student.degree || "";
    row.appendChild(degreeCell);
  
    // Create actions cell with edit and delete buttons
    const actionsCell = document.createElement("td");
  
    if (student.ID) {
      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.addEventListener("click", () => handleEdit(student.ID));
      actionsCell.appendChild(editButton);
  
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener("click", () => handleDelete(student.ID));
      actionsCell.appendChild(deleteButton);
    }
  
    row.appendChild(actionsCell);
  
    return row;
  }
  
  // Function to render the student table
  function renderStudents(filteredStudents) {
    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = "";
  
    const studentsToRender = filteredStudents || students;
  
    // Determine the number of empty rows needed to make a total of 4 rows
    const emptyRowCount = Math.max(4 - studentsToRender.length, 0);
  
    // Render the existing students
    for (const student of studentsToRender) {
      const row = createStudentRow(student);
      studentTableBody.appendChild(row);
    }
  
    // Render the empty rows
    for (let i = 0; i < emptyRowCount; i++) {
      const row = createStudentRow({});
      row.classList.add("empty-row"); // Add the empty-row class to the row
      studentTableBody.appendChild(row);
    }
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get form input values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const degree = document.getElementById("degree").value;
    const email = document.getElementById("email").value;
  
    // Add form validation logic
  
    if (editStudentID) {
      // Update the existing student
      const student = students.find((student) => student.ID === editStudentID);
      student.name = name;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
      student.email = email;
  
      // Clear the editStudentID variable
      editStudentID = null;
    } else {
      // Create a new student object
      const newStudent = {
        ID: students.length + 1,
        name: name,
        age: age,
        grade: grade,
        degree: degree,
        email: email,
      };
  
      // Add the new student to the students array
      students.push(newStudent);
    }
  
    // Clear the form inputs
    document.getElementById("studentForm").reset();
  
    // Render the updated student table
    renderStudents();
  }
  
  // Function to handle editing a student
  function handleEdit(studentID) {
    // Find the student in the array by ID
    const student = students.find((student) => student.ID === studentID);
  
    // Pre-fill the form inputs with the student's data
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;
    document.getElementById("degree").value = student.degree;
    document.getElementById("email").value = student.email;
  
    // Set the editStudentID variable to the ID of the student being edited
    editStudentID = student.ID;
  
    // Change the button text to "Edit Student"
    document.getElementById("submitButton").textContent = "Edit Student";
  }
  
  // Function to handle deleting a student
  function handleDelete(studentID) {
    // Find the index of the student in the array by ID
    const studentIndex = students.findIndex((student) => student.ID === studentID);
  
    // Remove the student from the array using splice()
    students.splice(studentIndex, 1);
  
    // Render the updated student table
    renderStudents();
  }
  
  // Function to handle search input
  function handleSearch() {
    // Get the search input value
    const searchValue = document
      .getElementById("searchInput")
      .value.toLowerCase();
  
    // Filter the students array based on the search input value
    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.degree.toLowerCase().includes(searchValue)
    );
  
    // Render the updated student table with filtered results
    renderStudents(filteredStudents);
  }
  
  // Add event listeners
  document
    .getElementById("studentForm")
    .addEventListener("submit", handleFormSubmit);
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  
  // Initial render of the student table
  renderStudents();
  