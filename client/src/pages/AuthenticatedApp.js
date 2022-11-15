import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.js";
import OurCourses from "./OurCoursesPage.js";
import CourseDetail from "./CourseDetailPage.js";
import UserProfile from "./UserProfilePage.js";
import LearningPage from "./LearningPage.js";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<OurCourses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/courses/:courseId/learning" element={<LearningPage />} />
    </Routes>
  );
}

export default AuthenticatedApp;
