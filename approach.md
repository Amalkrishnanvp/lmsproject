# Implementation Approach

## Objective

The goal of this assignment was to build the "My Courses" module of a Learning Management System where authenticated students can view their enrolled courses and access complete course information.

---

# Authentication

JWT authentication was implemented using HTTP-only cookies.

The login endpoint validates the user credentials, generates a JWT, and stores it inside a secure cookie.

Protected APIs verify the JWT before allowing access.

The frontend checks authentication during application startup and stores the authenticated user in Zustand.

---

# Database Design

The application uses normalized MongoDB collections.

## User

Stores student information.

## Course

Stores course metadata.

## Enrollment

Acts as a junction collection between users and courses.

Additional information such as classroom assignment is stored here.

## Module

Each course contains multiple modules.

## StudyMaterial

Each module contains multiple study materials.

## MaterialProgress

Tracks completion status for every study material for each student.

This design avoids modifying the StudyMaterial collection for individual users and allows multiple students to have independent progress.

## Faculty

Stores faculty assigned to a course.

## Assignment

Stores assignments associated with a course.

## LiveSession

Stores scheduled live sessions.

---

# API Design

## My Courses

The API first retrieves all enrollments for the authenticated student.

The corresponding course details are fetched.

Progress is calculated by comparing completed study materials with the total number of materials.

Only essential information is returned to reduce payload size.

---

## Course Details

The course details endpoint verifies enrollment before returning any data.

The response includes:

- Course information
- Faculty
- Modules
- Study materials
- Completion status
- Assignments
- Live sessions
- Progress percentage

Study materials are grouped inside their respective modules to simplify frontend rendering.

---

## Material Completion

A separate endpoint toggles completion status.

If the material is completed, it becomes incomplete.

If incomplete, it becomes completed.

The completion timestamp is updated accordingly.

---

# Frontend Architecture

React Router handles navigation.

Zustand manages authentication state.

TanStack Query is used for server state management.

Axios handles API communication.

shadcn/ui provides reusable UI components.

Tailwind CSS is used for responsive styling.

---

# Security

- JWT authentication
- HTTP-only cookies
- Protected routes
- Enrollment validation before course access
- Prevents users from accessing courses they are not enrolled in

---

# Assumptions

- Only students can log in.
- Authentication is cookie-based.
- Seed data is used for demonstration.
- File uploads and assignment submissions are outside the assignment scope.

---

# Future Enhancements

- Assignment submission
- Quiz module
- Video progress tracking
- Attendance
- Notifications
- Course discussion forum
- Search and filtering
- Admin dashboard
- Instructor dashboard

---
