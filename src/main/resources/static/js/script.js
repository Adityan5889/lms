//document.addEventListener("DOMContentLoaded", function() {
//    // Handle registration form submission
//    const registerForm = document.getElementById("registerForm");
//    if (registerForm) {
//        registerForm.addEventListener("submit", function(event) {
//            event.preventDefault();
//            const username = document.getElementById("username").value;
//            const email = document.getElementById("email").value;
//            const password = document.getElementById("password").value;
//
//            fetch('/api/users/register', {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json'
//                },
//                body: JSON.stringify({ username, email, password })
//            })
//            .then(response => response.json())
//            .then(data => {
//                document.getElementById("message").innerText = "Registration successful!";
//                registerForm.reset();
//            })
//            .catch(error => {
//                document.getElementById("message").innerText = "Registration failed!";
//                console.error('Error:', error);
//            });
//        });
//    }
//
//    // Load courses
//    const courseList = document.getElementById("courseList");
//    if (courseList) {
//        fetch('/api/courses')
//            .then(response => response.json())
//            .then(courses => {
//                courses.forEach(course => {
//                    const courseItem = document.createElement("div");
//                    courseItem.className = "course-item";
//                    courseItem.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
//                    courseList.appendChild(courseItem);
//                });
//            })
//            .catch(error => {
//                console.error('Error fetching courses:', error);
//            });
//    }
//
//    // Handle adding a new course (you can implement this as needed)
//    const addCourseBtn = document.getElementById("addCourseBtn");
//    if (addCourseBtn) {
//        addCourseBtn.addEventListener("click", function() {
//            // Logic to add a new course (e.g., show a modal or redirect to a new page)
//            alert("Add course functionality not implemented yet.");
//        });
//    }
//});

const apiUrl = "http://localhost:8080/api/courses";

// Fetch and display all courses
const fetchCourses = async () => {
    const response = await fetch(`${apiUrl}/all`);
    const courses = await response.json();
    const coursesList = document.getElementById("courses");
    coursesList.innerHTML = "";
    courses.forEach(course => {
        const li = document.createElement("li");
        li.textContent = `${course.title} - ${course.description}`;
        coursesList.appendChild(li);
    });
};

// Add a new course
const addCourse = async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const response = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
        alert("Course added successfully!");
        fetchCourses();
        document.getElementById("course-form").reset();
    } else {
        alert("Failed to add course.");
    }
};

// Attach event listener to the form
document.getElementById("course-form").addEventListener("submit", addCourse);

// Load courses on page load
fetchCourses();
