import "./App.css";
import HomePage from "./pages/HomePage.js";
import Login from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import OurCourses from "./pages/OurCoursesPage.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ourCourses" element={<OurCourses />} />
        {/* <Route path="/post/edit/:postId" element={<EditPostPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
