import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";
import AdminAddAssignment from "./AdminAddAssignmentPage";
import AdminEditAssignment from "./AdminEditAssignmentPage";
import AdminAddCoursesPage from "./AdminAddCoursesPage";
import AdminError from "./AdminErrorPage";
import AdminAssignmentList from "./AdminAssignmentListPage";
import AdminAddLesson from "./AdminAddLessonPage";
import AdminEditLesson from "./AdminEditLessonPage";
import AdminEditCourses from "./AdminEditCoursesPage";

function AuthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<AdminViewCourses />} />
      <Route path="/add-course" element={<AdminAddCoursesPage />} />
      <Route path="/add-course/add-lesson" element={<AdminAddLesson />} />
      <Route
        path="/add-course/edit-lesson/:lessonId"
        element={<AdminEditLesson />}
      />
      <Route path="/assignment" element={<AdminAssignmentList />} />
      <Route path="/assignment/add" element={<AdminAddAssignment />} />
      <Route
        path="/assignment/edit/:assignmentId"
        element={<AdminEditAssignment />}
      />
      <Route path="*" element={<AdminError />} />
      <Route
        path="/edit-course/:courseId/add-lesson"
        element={<AdminAddLesson />}
      />
      <Route
        path="/edit-course/:courseId/edit-lesson/:lessonId"
        element={<AdminEditLesson />}
      />
      <Route path="/edit-course/:courseId" element={<AdminEditCourses />} />
    </Routes>
  );
}

export default AuthenticatedAdmin;
