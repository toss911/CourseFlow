import './App.css';
import HomePage from './pages/HomePage.js';
import Login from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import CourseDetail from './pages/Coursedetail.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/coursedetail' element={<CourseDetail />} />

      {/* <Route path="/post/edit/:postId" element={<EditPostPage />} /> */}
    </Routes>
  );
}

export default App;
