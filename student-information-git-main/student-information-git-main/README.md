# Student Information System

A collaborative web application developed as part of the DevOps Collaborative Git Workflow Lab Exercise.

---

## 👥 Team Members & Roles

| Student | Role | Responsibilities |
| :--- | :--- | :--- |
| **Student 1** | Team Lead / Integrator | Repository creation, base application setup, PR reviews, and integration |
| **Student 2** | UI / Frontend Developer | HTML/CSS improvements, card layouts, contact details |
| **Student 3** | JavaScript Developer | Interactive JavaScript functionality (dynamic student details toggle) |

---

## 📋 Project Description

The **Student Information System** is an interactive, modern web portal designed to display and manage academic records for students (such as MCA candidates). It provides a clean dashboard displaying individual profile details (Name, Register Number, Programme, Cohort), contact channels, and an expandable panel for extended academic metrics (GPA, Term, Faculty Mentor).

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document structure
- **CSS3**: Modern responsive styling, CSS Grid, Flexbox, custom design tokens
- **JavaScript (ES6+)**: Interactive DOM manipulation, collapsible details view, event handling
- **Git & GitHub/GitLab**: Distributed version control and collaborative branching workflow

---

## 🌿 Git Branching Strategy

The team adheres to a feature-branch workflow:

1. `main` / `master`: The production-ready, stable codebase.
2. `feature/ui`: Branch used by Student 2 to enhance the visual presentation and CSS layout.
3. `feature/javascript`: Branch used by Student 3 to implement the interactive "Show Details" functionality.
4. `feature/contact`: Branch used by Student 2 to add email and phone contact information.
5. `feature/student-name` & `feature/app-title`: Branches created to demonstrate intentional merge conflict creation and resolution.

---

## 🔀 Pull Requests Created

- **PR #1 (`feature/ui` → `main`)**: Improve student information UI and responsive styling.
- **PR #2 (`feature/javascript` → `main`)**: Add student details display/toggle functionality on click.
- **PR #3 (`feature/contact` → `main`)**: Add student contact information (Email & Phone).

---

## ⚡ Merge Conflict (Planned Exercise)

- **Cause**: Both Student 2 (`feature/student-name`) and Student 3 (`feature/app-title`) edit the same heading line in `index.html` concurrently.
- **Resolution**: Merge `main` into the feature branch locally, resolve conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), commit the unified title, and push.

---

## 🚀 How to Run the Application

1. Clone or download the repository.
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox).
3. Click the **"Show Details"** button on the student card to toggle extended academic details.
