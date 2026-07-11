import { Routes, Route } from "react-router-dom";
import HomePage from "../mycomponents/HomePage";
import { LoginForm as LoginPage } from "../mycomponents/LoginForm";
import CoursesPage from "@/mycomponents/CoursesPage";
import CoursesDetailsPage from "@/mycomponents/CoursesDetailsPage";

import Layout from "@/mycomponents/Layout";
import ProtectedRoute from "@/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user/courses"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/courses/:courseId"
          element={
            <ProtectedRoute>
              <CoursesDetailsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
