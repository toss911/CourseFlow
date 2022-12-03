import React, { useState } from "react";

export const AdminContext = React.createContext();

function AdminProvider(props) {
  // addLesson state is for storing lesson/sub-lesson data before sending to post
  const [addLesson, setAddLesson] = useState([]);
  // addCourseFields is for storing add course fields on add course page
  const [addCourseFields, setAddCourseFields] = useState({});
  // editCourseField is for storing edit course fields on edit course page
  const [editCourseFields, setEditCourseFields] = useState({});

  return (
    <AdminContext.Provider
      value={{
        addLesson,
        setAddLesson,
        addCourseFields,
        setAddCourseFields,
        editCourseFields,
        setEditCourseFields,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

const useAdmin = () => React.useContext(AdminContext);
export { AdminProvider, useAdmin };
