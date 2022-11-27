import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminAddCourses from "./AdminAddCoursesPage";
import AdminEditCourses from "./AdminEditCoursesPage";

function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/add-lesson" element={<AdminAddLesson />} />
      <Route path="/courses" element={<AdminViewCourses />} />
      <Route path="/courses/add-lesson" element={<AdminAddLesson />} />
      <Route path="/add-courses" element={<AdminAddCourses />} />
      <Route path="/edit-courses" element={<AdminEditCourses />} />

    </Routes>
  );
}

export default AuthenticatedAdmin;
