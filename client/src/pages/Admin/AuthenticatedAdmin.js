import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddAssignment from "./AdminAddAssignment";
import AdminEditAssignment from "./AdminEditAssignment";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminAddCoursesPage from "./AdminAddCoursesPage";

function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/add-lesson" element={<AdminAddLesson />} />
      <Route path="/courses" element={<AdminViewCourses />} />
      <Route path="/courses/add-lesson" element={<AdminAddLesson />} />
      <Route path="/add-courses" element={<AdminAddCoursesPage />} />
      <Route path="/assignment/add" element={<AdminAddAssignment />} />
      <Route
        path="/assignment/edit/:assignmentId"
        element={<AdminEditAssignment />}
      />
    </Routes>
  );
}

export default AuthenticatedAdmin;
