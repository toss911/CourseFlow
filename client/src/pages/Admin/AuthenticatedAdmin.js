import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminAssignmentList from "./AdminAssignmentListPage";
function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/add-lesson" element={<AdminAddLesson />} />
      <Route path="/assignment" element={<AdminAssignmentList />}/>
    </Routes>
  );
}

export default AuthenticatedAdmin;
