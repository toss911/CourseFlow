import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddLesson from "./AdminAddLessonPage";
function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/admin/courses" element={<AdminViewCourses />} />
      <Route path="/admin/courses/add-lesson" element={<AdminAddLesson />} />
    </Routes>
  );
}

export default AuthenticatedAdmin;
