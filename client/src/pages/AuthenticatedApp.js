import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.js";
import OurCourses from "./OurCoursesPage.js";
import CourseDetail from "./CourseDetailPage.js";
import UserProfile from "./UserProfilePage";
import MyHomework from "./MyHomeworkPage.js";
//import LearningPage from "./LearningPage.js";
import MyCourses from "./MyCoursesPage.js";
import LearningPage from "./LearningPage.js";
import DesireCourse from "./DesireCoursePage.js";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<OurCourses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      {/* <Route path="/learning" element={<LearningPage />} /> */}
      <Route path="/subscription" element={<MyCourses />} />
      <Route path="/mycourses" element={<MyCourses />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="/learning" element={<LearningPage />} />
      <Route path ="/homework" element= {<MyHomework/>}/>
      <Route path="desire" element={<DesireCourse />} />
    </Routes>
  );
}

export default AuthenticatedApp;
