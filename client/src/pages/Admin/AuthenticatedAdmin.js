import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddLesson from "./AdminAddLessonPage";
function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/add-lesson" element={<AdminAddLesson />} />
    </Routes>
  );
}

export default AuthenticatedAdmin;
