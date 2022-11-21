import { Routes, Route } from "react-router-dom";
import AdminViewCourses from "./AdminViewCoursesPage";

function AuthenticatedAdmin() {
    return (
      <Routes>
        <Route path="/admin/courses" element={<AdminViewCourses />} />
      </Routes>
    );
  }
  
  export default AuthenticatedAdmin;
  