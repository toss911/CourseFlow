import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

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
      console.log(results)
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
      //navigate(`/courses/:${courseId}`);
      const result = await axios.get(
        `http://localhost:4000/courses/${params.courseId}`
      );
      setCourse(result.data.data);
      setIsLoading(false);
      //navigate("/"); // check again if the path is correct
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
