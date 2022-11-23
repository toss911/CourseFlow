import React, { useState } from "react";

export const AdminContext = React.createContext();

function AdminProvider(props) {
  const [addLesson, setAddLesson] = useState({
    order: 0,
    lesson_name: "",
    sub_lesson_name: "",
    video_directory: "",
    duration: "",
  });
  return (
    <AdminContext.Provider value={{ addLesson, setAddLesson }}>
      {props.children}
    </AdminContext.Provider>
  );
}

const useAdmin = () => React.useContext(AdminContext);
export { AdminProvider, useAdmin };
