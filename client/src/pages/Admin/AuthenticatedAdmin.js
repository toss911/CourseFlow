import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddAssignment from "./AdminAddAssignment";
import AdminEditAssignment from "./AdminEditAssignment";
import AdminAddCoursesPage from "./AdminAddCoursesPage";
import AdminError from "./AdminErrorPage";
import AdminAssignmentList from "./AdminAssignmentListPage";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminEditCourses from "./AdminEditCoursesPage";

function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/course/add" element={<AdminAddCoursesPage />} />
      <Route path="/assignment" element={<AdminAssignmentList />} />
      <Route path="/assignment/add" element={<AdminAddAssignment />} />
      <Route
        path="/assignment/edit/:assignmentId"
        element={<AdminEditAssignment />}
      />
      <Route path="*" element={<AdminError />} />
      <Route path="/course/add/add-lesson" element={<AdminAddLesson />} />
      <Route path="/edit-courses/add-lesson" element={<AdminAddLesson />} />
      <Route path="/edit-courses" element={<AdminEditCourses />} />
    </Routes>
  );
}

export default AuthenticatedAdmin;
