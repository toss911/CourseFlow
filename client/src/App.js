import "./App.css";
import HomePage from "./pages/HomePage.js";
import Login from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { Routes, Route } from "react-router-dom";
import OurCourses from "./pages/OurCoursesPage";
import CourseDetail from "./pages/Coursedetail.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      {/* <Route path="/coursesdetail" element={<CourseDetail />} /> */}

      {/* <Route path="/post/edit/:postId" element={<EditPostPage />} /> */}
      <Route path="/courses" element={<OurCourses />} />
    </Routes>
  );
}

export default App;
