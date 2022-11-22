import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminAddCoursesPage from "./AdminAddCoursesPage";

function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/admin/courses" element={<AdminViewCourses />} />
      <Route path="/admin/courses/add-lesson" element={<AdminAddLesson />} />
      <Route path="/admin/add-courses" element={<AdminAddCoursesPage />} />
    </Routes>
  );
}

export default AuthenticatedAdmin;
