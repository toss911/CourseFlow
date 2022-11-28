import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [category, setCategory] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [desireCourses, setDesireCourses] = useState([]);
  const params = useParams();

  const getCourses = async (keywords) => {
    try {
      /* In case of no searchText => transform searchText into empty string (instead of null) */
      if (!keywords) {
        keywords = "";
      }
      setIsLoading(true);
      const query = new URLSearchParams();
      query.append("keywords", keywords);
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
      );
      setCourses(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getCourseById = async (userId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      let apiRoute;
      if (userId) {
        apiRoute = `http://localhost:4000/courses/${params.courseId}?byUser=${userId}`;
      } else {
        apiRoute = `http://localhost:4000/courses/${params.courseId}`;
      }

      //*---- Query course data ----*//
      const courseData = await axios.get(apiRoute);
      setCourse(courseData.data.data);
      setCategory(courseData.data.dataCategory);

      //*---- Query user's subscribe/desire status ----*//
      const status = {
        subscribe: false,
        desire: false,
      };
      if (courseData.data.subscribeStatus) {
        status.subscribe = true;
      }
      if (courseData.data.desireStatus) {
        status.desire = true;
      }
      setIsLoading(false);
      return status;
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getDesiredCourses = async (userId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const desireCourseData = await axios.get(
        `http://localhost:4000/user/desired?byUser=${userId}`
      );

      setDesireCourses(desireCourseData.data.data);
      setIsLoading(false);
      console.log(desireCourses.data.data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getCourseLearningById = async (userId) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const results = await axios.get(
        `http://localhost:4000/courses/${params.courseId}/learning?byUser=${userId}`
      );
      setCourse(results.data.data);
      setIsLoading(false);
      return results.data.data;
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    courses,
    course,
    category,
    getCourses,
    getCourseById,
    getCourseLearningById,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    getDesiredCourses,
    desireCourses,
  };
};

export default useCourses;
