import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";

function AuthenticatedAdmin() {
    return (
      <Routes>
        <Route path="/courses/admin" element={<AdminViewCourses />} />
      </Routes>
    );
  }
  
  export default AuthenticatedAdmin;
  