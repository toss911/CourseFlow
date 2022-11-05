import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const { contextState, setContextState } = useAuth();

  const getCourses = async (input) => {
    const { keywords, page } = input;
    try {
      const params = new URLSearchParams();
      params.append("keywords", keywords);
      // params.append("page", page);
      setIsError(false);
      const results = await axios.get(
        `http://localhost:4000/courses?${params.toString()}`
        // `http://localhost:4000/courses?keywords=${params.get("keywords")}&page=${params.get("page")}`
      );
      setCourses(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getCoursesbyId = async (courseId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/courses/${courseId}`
      );
      setCourse(result.data.data);
      setIsLoading(false);
      navigate("/"); // check again if the path is correct
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    courses,
    course,
    getCourses,
    getCoursesbyId,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
  };
};

export default useCourses;
