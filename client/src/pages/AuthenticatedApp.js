import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.js";
import OurCourses from "./OurCoursesPage.js";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<OurCourses />} />
    </Routes>
  );
}

export default AuthenticatedApp;
