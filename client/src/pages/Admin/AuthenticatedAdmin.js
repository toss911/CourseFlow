import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
<<<<<<< Updated upstream
import AdminAddLesson from "./AdminAddLessonPage";
=======
import AdminAddCoursesPage from "./AdminAddCoursesPage";

>>>>>>> Stashed changes
function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/admin/courses" element={<AdminViewCourses />} />
<<<<<<< Updated upstream
      <Route path="/admin/courses/add-lesson" element={<AdminAddLesson />} />
=======
      <Route path="/admin/add-courses" element={<AdminAddCoursesPage />} />
>>>>>>> Stashed changes
    </Routes>
  );
}

export default AuthenticatedAdmin;
