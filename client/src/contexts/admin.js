import React, { useState } from "react";

export const AdminContext = React.createContext();

function AdminProvider(props) {
  const [addLesson, setAddLesson] = useState([]);
  const [addCourseFields, setAddCourseFields] = useState({});

  return (
    <AdminContext.Provider
      value={{ addLesson, setAddLesson, addCourseFields, setAddCourseFields }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

const useAdmin = () => React.useContext(AdminContext);
export { AdminProvider, useAdmin };
