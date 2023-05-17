const studentForm = document.getElementById("student-form");
const studentsList = document.getElementById("students-list");

// Dummy data
const students = [
   {
      name: "John",
      surname: "Wick",
      age: 47,
      phone: "+22",
      email: "johnwick@gmail.com",
      skill: 7,
      group: "FEU 4",
      interests: ["JavaScript", "PHP", "Java"]   
   },
   {
      name: "Tom",
      surname: "Cruise",
      age: 33,
      phone: "+300",
      email: "tom@cruise.com",
      skill: 5,
      group: "FEU 3",
      interests: ["C++"]
   },
   {
      name: "Dan",
      surname: "Smith",
      age: 44,
      phone: "+1",
      email: "dan@smith.com",
      skill: 10,
      group: "FEU 5",
      interests: ["C++", "PHP", "Python", "Java"]
   },
   {
      name: "Jeff",
      surname: "Bezos",
      age: 37,
      phone: "+22",
      email: "info@amazon.com",
      skill: 9,
      group: "FEU 5",
      interests: ["JavaScript", "Java"]
   },
   {
      name: "Airingas",
      surname: "Staraitis",
      age: 21,
      phone: "+3706",
      email: "airingas@gmail.com",
      skill: 2,
      group: "FEU 7",
      interests: ["JavaScript", "C++", "Java"]
   }
];

// Inserting objects into student-list
populateStudentsData(students, studentForm, studentsList);

// Show range value
showRangeElementValue();

// Handling the form
handleStudentForm(studentForm, studentsList);

function handleStudentForm(form, list) {
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Select form button
      const submitBtn = document.getElementById("save-btn");

      // Checks if user is in edit mode or wants to create a new student.
      // If user is in edit mode, it rewrites the student information
      // else, user creates a new student
      if (submitBtn.value === "Save changes") {
         submitBtn.value = "Submit";
      } else {
         // form validation
         if (checkIfMissingFields()) {
            // Creates a student & inserts into a div element
            if (pickUpValueFromInput(event, list)) {
               // doesn't reset the form input fields is the user failed with validation
            }
         }  
      }
      form.reset();
   });
}

function pickUpValueFromInput(event, list) {
   const output = event.target.elements;

   const name = output.name.value;
   const surname = output.surname.value;
   const age = output.age.value;
   const phone = output.phone.value;
   const email = output.email.value;
   const skill = output["it-knowledge"].value;
   const group = output.group.value;
   // Array for interests
   const arrayOfInterests = [];
   output["it-language"].forEach((element) => {
      if (element.checked) arrayOfInterests.push(element.value);
   });

   // Student input validation
   if (formValidation(name, surname, age, email)) {
      createStudent(
         name,
         surname,
         age,
         phone,
         email,
         skill,
         group,
         arrayOfInterests,
         list
      );
      // Return true - resets the studentForm if the user was successfully with validation
      return true;
   }

   // Return false - doesn't reset the form input fields if the user failed with validation
   return false;
}

function createStudent(name, surname, age, phone, email, skill, group, arrayOfInterests, list) {
   const divElement = document.createElement("div");
   divElement.classList.add("student-item");

   const h2Element = document.createElement("h2");
   h2Element.textContent = "Student";

   const studentName = document.createElement("div");
   studentName.innerHTML = `<b>Name:</b> ${name}`;

   const studentSurname = document.createElement("div");
   studentSurname.innerHTML = `<b>Surname:</b> ${surname}`;

   const studentAge = document.createElement("div");
   studentAge.innerHTML = `<b>Age:</b> ${age}`;

   const studentPhone = document.createElement("div");
   // saving a copy
   const studentPhoneCopy = phone;
   studentPhone.innerHTML = `<b>Phone number:</b> ${phone.replace(/\S/g, "*")}`;

   const studentEmail = document.createElement("div");
   const studentEmailCopy = email;
   studentEmail.innerHTML = `<b>Email:</b> ${email.replace(/\S/g, "*")}`;

   const studentSkill = document.createElement("div");
   studentSkill.innerHTML = `<b>IT knowledge level:</b> ${skill}`;

   const studentGroup = document.createElement("div");
   studentGroup.innerHTML = `<b>Group:</b> ${group}`;

   const studentInterests = document.createElement("div");
   const languages = arrayOfInterests.toString().replaceAll(",", " ");
   studentInterests.innerHTML = `<b>Programming languages:</b> ${languages}`;

   // Student buttons: hideOrShow, delete & edit
   const hideShowBtn = addShowHideStudentButton(studentPhone, studentPhoneCopy, studentEmail, studentEmailCopy);
   const deleteBtn = deleteStudentButton(name, surname, divElement);
   const editBtn = editStudentButton(
      name,
      surname,
      age,
      phone,
      email,
      skill,
      group,
      arrayOfInterests,
      divElement
   );

   // Inserts all student info in 1 div element
   divElement.append(
      h2Element,
      studentName,
      studentSurname,
      studentAge,
      studentPhone,
      studentEmail,
      studentSkill,
      studentGroup,
      studentInterests,
      hideShowBtn,
      deleteBtn,
      editBtn
   );

   // span element message pop up
   let text = `Student (${name} ${surname}) has been added successfully!`;
   textReport(text, "green");

   // Inserts div elem with student info into students-list element
   list.prepend(divElement);
}

function populateStudentsData(studentsObject, form, list) {
   const populateButton = document.createElement("button");
   populateButton.textContent = "Populate";

   populateButton.addEventListener("click", function(event) {
      studentsObject.forEach(element => {

         // name, surname, age, phone & etc...
         createStudent(
            element.name,
            element.surname,
            element.age,
            element.phone,
            element.email,
            element.skill,
            element.group,
            element.interests,
            list
         );
      });

      // span element message pop up
      textReport("Data has been populated successfully!", "green");
   });

   form.after(populateButton);
}

function textReport(message, color) {
   const spanElement = document.getElementById("text-report");
   spanElement.textContent = message;
   spanElement.style.display = "block";
   // style
   spanElement.style.color = color;

   setTimeout(function() {
      spanElement.style.display = "none";
   }, 5000);
}

// TODO: when user submits form, it should reset skill value number
function showRangeElementValue() {
   // Selecting range element
   const rangeElementValue = document.getElementById("student-knowledge");
   // Creating element for range value
   const rangeInfo = document.createElement("span");
   // Default value
   rangeInfo.textContent = rangeElementValue.value;
   rangeElementValue.addEventListener("input", function() {
      rangeInfo.textContent = rangeElementValue.value;
   });

   rangeElementValue.after(rangeInfo);
}

// Show or hide information button
function addShowHideStudentButton(phoneDiv, phone, emailDiv, email) {
   const showOrHideBtn = document.createElement("button");
   showOrHideBtn.textContent = "Show info";
   showOrHideBtn.addEventListener("click", function() {
      
      if (showOrHideBtn.textContent === "Show info") {
         // Show info
         phoneDiv.innerHTML = `<b>Phone number:</b> ${phone}`;
         emailDiv.innerHTML = `<b>Email:</b> ${email}`;
         showOrHideBtn.textContent = "Hide info";
      } else {
         showOrHideBtn.textContent = "Show info";
         // Hide info
         phoneDiv.innerHTML = `<b>Phone number:</b> ${phone.replace(/\S/g, "*")}`;
         emailDiv.innerHTML = `<b>Email:</b> ${email.replace(/\S/g, "*")}`;
      }
   });

   return showOrHideBtn;
}

// delete student button
function deleteStudentButton(name, surname, divElement) {
   const deleteBtn = document.createElement("button");
   deleteBtn.textContent = "Delete";
   deleteBtn.addEventListener("click", function() {
      divElement.remove();
      // Informs user about deletion
      const text = `Student (${name} ${surname}) was deleted successfully!`;
      textReport(text, "red");
   });

   return deleteBtn;
}

// edit student button
function editStudentButton(name, surname, age, phone, email, skill, group, arrayOfInterests, divElement) {
   // Selecting input fields
   const nameField = document.getElementById("student-name");
   const surnameField = document.getElementById("student-surname");
   const ageField = document.getElementById("student-age");
   const phoneField = document.getElementById("student-phone");
   const emailField = document.getElementById("student-email");
   const skillField = document.getElementById("student-knowledge");
   const groupField = document.querySelectorAll(".radio-input");  
   const interestsField = document.querySelectorAll("[name='it-language']");

   const editBtn = document.createElement("button");
   editBtn.textContent = "Edit";
   editBtn.addEventListener("click", function () {
      // Clear programming language fields
      interestsField.forEach(element => element.checked = false);

      // Inserting student values to input fields
      nameField.value = name;
      surnameField.value = surname;
      ageField.value = age;
      phoneField.value = phone;
      emailField.value = email;
      skillField.value = skill;
      groupField.forEach(element => {
         if (element.value === group) {
            element.checked = true;
         }
      });
      // Programming languages
      interestsField.forEach(element => {
         arrayOfInterests.forEach(interest => {
            if (element.value === interest) {
               element.checked = true;
            }
         });
      });

      // Change submit button name to 'Save changes'
      const submitBtn = document.getElementById("save-btn");
      submitBtn.value = "Save changes";
      submitBtn.addEventListener("click", function(event) {
         // Delete all the elements in student-item and insert new ones
         rewriteStudentInfo(event, divElement);
      });
   });

   return editBtn;
}

function rewriteStudentInfo(event, divElement) {
   const output = event.target.form.elements;

   // Select updated information from input fields
   const name = output.name.value;
   const surname = output.surname.value;
   const age = output.age.value;
   const phone = output.phone.value;
   const email = output.email.value;
   const skill = output["it-knowledge"].value;
   const group = output.group.value;
   // Array for interests
   const arrayOfInterests = [];
   output["it-language"].forEach((element) => {
      if (element.checked) arrayOfInterests.push(element.value);
   });

   // Select student information (all div elements)
   const studentInfo = divElement.querySelectorAll("div");
   // Add new values to array
   const newStudentValues = [
      `<b>Name:</b> ${name}`,
      `<b>Surname:</b> ${surname}`,
      `<b>Age:</b> ${age}`,
      `<b>Phone number:</b> ${phone}`,
      `<b>Email:</b> ${email}`,
      `<b>IT knowledge level:</b> ${skill}`,
      `<b>Group:</b> ${group}`
   ];

   // Rewrites old values 
   for (let i=0; i<studentInfo.length; i++) {
      studentInfo[i].innerHTML = newStudentValues[i];
   }
}

function checkIfMissingFields() {
   const inputElements = document.querySelectorAll("input:required");
   let result = true;

   // Reset class
   const errorLabels = document.querySelectorAll(".error-label");
   errorLabels.forEach((element) => element.remove());

   inputElements.forEach(element => {

      // Reset class
      element.classList.remove("input-validation");

      if (element.value === "") {

         // Input error message
         const spanElement = document.createElement("span");
         spanElement.textContent = "This field is required!";
         spanElement.classList.add("error-label");
         // style
         spanElement.style.color = "red";
         spanElement.style["margin-left"] = "10px";
         element.after(spanElement);

         element.classList.add("input-validation");

         // Informs user about error message
         textReport("Please, fill all the missing information!", "red");

         result = false;
      }
   });

   return result;
}

function formValidation(name, surname, age, email) {
   const emailRegex = /^\S+@\S+\.\S+$/;

   if (name.length <= 2) {
      textReport("Name should be at least 3 words length!", "red");
      return false;
   }
   if (surname.length <= 2) {
      textReport("Surname should be at least 3 words length!", "red");
      return false;
   }
   if (age < 18) {
      textReport("You must be at least 18 years old!", "red");
      return false;
   }
   if (age > 100) {
      textReport("You cannot be older than 100!", "red");
      return false;
   }
   if (!emailRegex.test(email)) {
      textReport("Your email address is incorrect!", "red");
      return false;
   }

   return true;
}