import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

import { Assignment } from "./models/Assignment.js";
import { Course } from "./models/Course.js";
import { Enrollment } from "./models/Enrollment.js";
import { Faculty } from "./models/Faculty.js";
import { LiveSession } from "./models/LiveSession.js";
import { MaterialProgress } from "./models/MaterialProgress.js";
import { Module } from "./models/Module.js";
import { StudyMaterial } from "./models/StudyMaterial.js";
import { User } from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

// add users
const users = await User.insertMany([
  {
    name: "Amal Krishnan",
    email: "amal@example.com",
    password: "123456",
  },
  {
    name: "Abhilash",
    email: "abhilash@example.com",
    password: "123456",
  },
  {
    name: "Sreelakshmi",
    email: "sreelakshmi@example.com",
    password: "123456",
  },
]);

// add courses
const courses = await Course.insertMany([
  {
    title: "HTML Fundamentals",
    description:
      "Learn the fundamentals of HTML, including document structure, elements, forms, tables, and semantic HTML.",
  },
  {
    title: "CSS Fundamentals",
    description:
      "Learn CSS styling, selectors, layouts, Flexbox, Grid, responsive design, and modern CSS techniques.",
  },
  {
    title: "JavaScript Fundamentals",
    description:
      "Learn JavaScript basics, variables, functions, DOM manipulation, events, and ES6 features.",
  },
]);

// add enrollments
const enrollments = await Enrollment.insertMany([
  // Amal
  {
    userId: users[0]._id,
    courseId: courses[0]._id, // HTML
    classroomAssigned: true,
  },
  {
    userId: users[0]._id,
    courseId: courses[1]._id, // CSS
    classroomAssigned: false, // Edge case
  },

  // Abhilash
  {
    userId: users[1]._id,
    courseId: courses[1]._id, // CSS
    classroomAssigned: true,
  },
  {
    userId: users[1]._id,
    courseId: courses[2]._id, // JavaScript
    classroomAssigned: true,
  },

  // Sreelakshmi
  {
    userId: users[2]._id,
    courseId: courses[0]._id, // HTML
    classroomAssigned: true,
  },
  {
    userId: users[2]._id,
    courseId: courses[2]._id, // JavaScript
    classroomAssigned: true,
  },
]);

// add modules
const modules = await Module.insertMany([
  // HTML Fundamentals
  {
    title: "Introduction to HTML",
    description: "Learn the basics of HTML and document structure.",
    courseId: courses[0]._id,
    order: 1,
  },
  {
    title: "HTML Elements",
    description: "Learn headings, paragraphs, lists, links, and images.",
    courseId: courses[0]._id,
    order: 2,
  },
  {
    title: "Forms & Tables",
    description: "Create forms, tables, and semantic HTML layouts.",
    courseId: courses[0]._id,
    order: 3,
  },

  // CSS Fundamentals
  {
    title: "Introduction to CSS",
    description: "Learn CSS syntax, selectors, and colors.",
    courseId: courses[1]._id,
    order: 1,
  },
  {
    title: "Flexbox Layout",
    description: "Build responsive layouts using Flexbox.",
    courseId: courses[1]._id,
    order: 2,
  },
  {
    title: "CSS Grid",
    description: "Create complex layouts using CSS Grid.",
    courseId: courses[1]._id,
    order: 3,
  },

  // JavaScript Fundamentals
  {
    title: "Variables & Data Types",
    description: "Understand variables, data types, and operators.",
    courseId: courses[2]._id,
    order: 1,
  },
  {
    title: "Functions",
    description:
      "Learn function declarations, expressions, and arrow functions.",
    courseId: courses[2]._id,
    order: 2,
  },
  {
    title: "DOM Manipulation",
    description: "Interact with web pages using the DOM API.",
    courseId: courses[2]._id,
    order: 3,
  },
]);

// add study materials
const materials = await StudyMaterial.insertMany([
  // ==========================
  // HTML - Module 1
  // ==========================
  {
    title: "Introduction to HTML",
    type: "pdf",
    url: "https://example.com/html-introduction.pdf",
    moduleId: modules[0]._id,
  },
  {
    title: "HTML Document Structure",
    type: "video",
    url: "https://example.com/html-structure",
    moduleId: modules[0]._id,
  },
  {
    title: "Headings & Paragraphs",
    type: "link",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    moduleId: modules[0]._id,
  },

  // ==========================
  // HTML - Module 2
  // ==========================
  {
    title: "Lists in HTML",
    type: "pdf",
    url: "https://example.com/html-lists.pdf",
    moduleId: modules[1]._id,
  },
  {
    title: "Images & Links",
    type: "video",
    url: "https://example.com/html-images",
    moduleId: modules[1]._id,
  },
  {
    title: "Semantic HTML",
    type: "link",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
    moduleId: modules[1]._id,
  },

  // ==========================
  // HTML - Module 3
  // ==========================
  {
    title: "HTML Forms",
    type: "pdf",
    url: "https://example.com/html-forms.pdf",
    moduleId: modules[2]._id,
  },
  {
    title: "HTML Tables",
    type: "video",
    url: "https://example.com/html-tables",
    moduleId: modules[2]._id,
  },
  {
    title: "Input Types",
    type: "link",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
    moduleId: modules[2]._id,
  },

  // ==========================
  // CSS - Module 1
  // ==========================
  {
    title: "Introduction to CSS",
    type: "pdf",
    url: "https://example.com/css-introduction.pdf",
    moduleId: modules[3]._id,
  },
  {
    title: "CSS Selectors",
    type: "video",
    url: "https://example.com/css-selectors",
    moduleId: modules[3]._id,
  },
  {
    title: "Colors & Backgrounds",
    type: "link",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    moduleId: modules[3]._id,
  },

  // ==========================
  // CSS - Module 2
  // ==========================
  {
    title: "Flex Container",
    type: "pdf",
    url: "https://example.com/flex-container.pdf",
    moduleId: modules[4]._id,
  },
  {
    title: "Flex Items",
    type: "video",
    url: "https://example.com/flex-items",
    moduleId: modules[4]._id,
  },
  {
    title: "Building Layouts with Flexbox",
    type: "link",
    url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
    moduleId: modules[4]._id,
  },

  // ==========================
  // CSS - Module 3
  // ==========================
  {
    title: "Introduction to CSS Grid",
    type: "pdf",
    url: "https://example.com/css-grid.pdf",
    moduleId: modules[5]._id,
  },
  {
    title: "Grid Areas",
    type: "video",
    url: "https://example.com/grid-areas",
    moduleId: modules[5]._id,
  },
  {
    title: "Responsive Grid Layout",
    type: "link",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
    moduleId: modules[5]._id,
  },
]);

// add faculties
const faculties = await Faculty.insertMany([
  {
    name: "Dhanya",
    email: "dhanya@example.com",
    designation: "Senior HTML Instructor",
    courseId: courses[0]._id, // HTML Fundamentals
  },
  {
    name: "Sandhya",
    email: "sandhya@example.com",
    designation: "Senior CSS Instructor",
    courseId: courses[1]._id, // CSS Fundamentals
  },
  {
    name: "Sreehari",
    email: "sreehari@example.com",
    designation: "Senior JavaScript Instructor",
    courseId: courses[2]._id, // JavaScript Fundamentals
  },
]);

// add live sessions
const liveSessions = await LiveSession.insertMany([
  // HTML Fundamentals
  {
    topic: "Introduction to HTML",
    date: new Date("2026-07-15"),
    time: "10:00 AM",
    meetingLink: "https://meet.google.com/html-session-1",
    courseId: courses[0]._id,
  },
  {
    topic: "HTML Forms & Tables Workshop",
    date: new Date("2026-07-18"),
    time: "2:00 PM",
    meetingLink: "https://meet.google.com/html-session-2",
    courseId: courses[0]._id,
  },

  // CSS Fundamentals
  {
    topic: "CSS Selectors & Styling",
    date: new Date("2026-07-16"),
    time: "11:00 AM",
    meetingLink: "https://meet.google.com/css-session-1",
    courseId: courses[1]._id,
  },
  {
    topic: "Flexbox & Grid Layout",
    date: new Date("2026-07-19"),
    time: "3:00 PM",
    meetingLink: "https://meet.google.com/css-session-2",
    courseId: courses[1]._id,
  },

  // JavaScript Fundamentals
  {
    topic: "JavaScript Basics",
    date: new Date("2026-07-17"),
    time: "10:30 AM",
    meetingLink: "https://meet.google.com/js-session-1",
    courseId: courses[2]._id,
  },
  {
    topic: "Functions & DOM Manipulation",
    date: new Date("2026-07-20"),
    time: "1:30 PM",
    meetingLink: "https://meet.google.com/js-session-2",
    courseId: courses[2]._id,
  },
]);

// add assignments
const assignments = await Assignment.insertMany([
  // HTML Fundamentals
  {
    title: "Build a Personal Portfolio",
    description:
      "Create a simple personal portfolio website using HTML elements, headings, lists, links, and images.",
    dueDate: new Date("2026-07-25"),
    status: "Pending",
    courseId: courses[0]._id,
  },
  {
    title: "Student Registration Form",
    description:
      "Build a registration form using HTML forms, input fields, radio buttons, checkboxes, and tables.",
    dueDate: new Date("2026-07-30"),
    status: "Submitted",
    courseId: courses[0]._id,
  },

  // CSS Fundamentals
  {
    title: "Responsive Landing Page",
    description:
      "Design a responsive landing page using CSS selectors, colors, and typography.",
    dueDate: new Date("2026-07-26"),
    status: "Pending",
    courseId: courses[1]._id,
  },
  {
    title: "Flexbox & Grid Layout",
    description: "Create a responsive webpage using Flexbox and CSS Grid.",
    dueDate: new Date("2026-08-01"),
    status: "Submitted",
    courseId: courses[1]._id,
  },

  // JavaScript Fundamentals
  {
    title: "Build a Calculator",
    description:
      "Develop a calculator using JavaScript functions and DOM manipulation.",
    dueDate: new Date("2026-07-28"),
    status: "Pending",
    courseId: courses[2]._id,
  },
  {
    title: "Todo List Application",
    description:
      "Create a Todo application with add, edit, delete, and complete features using JavaScript.",
    dueDate: new Date("2026-08-03"),
    status: "Submitted",
    courseId: courses[2]._id,
  },
]);

// add material progress
const materialProgress = await MaterialProgress.insertMany([
  // ==========================
  // Amal
  // HTML (5 completed, 4 pending)
  // ==========================
  {
    userId: users[0]._id,
    materialId: materials[0]._id,
    completed: true,
  },
  {
    userId: users[0]._id,
    materialId: materials[1]._id,
    completed: true,
  },
  {
    userId: users[0]._id,
    materialId: materials[2]._id,
    completed: true,
  },
  {
    userId: users[0]._id,
    materialId: materials[3]._id,
    completed: true,
  },
  {
    userId: users[0]._id,
    materialId: materials[4]._id,
    completed: true,
  },
  {
    userId: users[0]._id,
    materialId: materials[5]._id,
    completed: false,
  },
  {
    userId: users[0]._id,
    materialId: materials[6]._id,
    completed: false,
  },
  {
    userId: users[0]._id,
    materialId: materials[7]._id,
    completed: false,
  },
  {
    userId: users[0]._id,
    materialId: materials[8]._id,
    completed: false,
  },

  // ==========================
  // Abhilash
  // CSS (3 completed, 6 pending)
  // ==========================
  {
    userId: users[1]._id,
    materialId: materials[9]._id,
    completed: true,
  },
  {
    userId: users[1]._id,
    materialId: materials[10]._id,
    completed: true,
  },
  {
    userId: users[1]._id,
    materialId: materials[11]._id,
    completed: true,
  },
  {
    userId: users[1]._id,
    materialId: materials[12]._id,
    completed: false,
  },
  {
    userId: users[1]._id,
    materialId: materials[13]._id,
    completed: false,
  },
  {
    userId: users[1]._id,
    materialId: materials[14]._id,
    completed: false,
  },
  {
    userId: users[1]._id,
    materialId: materials[15]._id,
    completed: false,
  },
  {
    userId: users[1]._id,
    materialId: materials[16]._id,
    completed: false,
  },
  {
    userId: users[1]._id,
    materialId: materials[17]._id,
    completed: false,
  },

  // ==========================
  // Sreelakshmi
  // HTML (all completed)
  // ==========================
  {
    userId: users[2]._id,
    materialId: materials[0]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[1]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[2]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[3]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[4]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[5]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[6]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[7]._id,
    completed: true,
  },
  {
    userId: users[2]._id,
    materialId: materials[8]._id,
    completed: true,
  },
]);
