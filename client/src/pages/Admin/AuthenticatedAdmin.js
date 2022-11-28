import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddAssignment from "./AdminAddAssignment";
import AdminEditAssignment from "./AdminEditAssignment";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminAddCoursesPage from "./AdminAddCoursesPage";
import AdminError from "./AdminErrorPage";
import AdminAssignmentList from "./AdminAssignmentListPage";

function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/course/add" element={<AdminAddCoursesPage />} />
      <Route path="/course/add/lesson" element={<AdminAddLesson />} />
      <Route path="/assignment" element={<AdminAssignmentList />} />
      <Route path="/assignment/add" element={<AdminAddAssignment />} />
      <Route
        path="/assignment/edit/:assignmentId"
        element={<AdminEditAssignment />}
      />
      <Route path="*" element={<AdminError />} />
    </Routes>
  );
}

export default AuthenticatedAdmin;
