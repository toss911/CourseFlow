import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.js";
import OurCourses from "./OurCoursesPage.js";
import CourseDetail from "./Coursedetail.js";
import UserProfile from "./UserProfile.js";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<OurCourses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="profile" element={<UserProfile />} />
    </Routes>
  );
}

export default AuthenticatedApp;
