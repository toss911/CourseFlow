import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [category, setCategory] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const params = useParams();
  const [userCourses, setUserCourses] = useState([]);
  const [coursesCount, setCoursesCount] = useState({});

  const getCourses = async (input) => {
    try {
      const { keywords, page } = input;
      const query = new URLSearchParams();
      query.append("keywords", keywords);
      query.append("page", page);
      setIsError(false);
      const results = await axios.get(
        `http://localhost:4000/courses?${query.toString()}`
        // `http://localhost:4000/courses?keywords=${params.get("keywords")}&page=${params.get("page")}`
      );
      setCourses(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getCourseById = async (data) => {
    try {
      setIsError(false);
      setIsLoading(true);

      //*---- Query course data ----*//
      const courseData = await axios.get(
        `http://localhost:4000/courses/${params.courseId}`
      );
      setCourse(JSON.parse(courseData.data.data));
      setCategory(JSON.parse(courseData.data.dataCategory));

      //*---- Query subscription or desired course data ----*//
      const status = {
        subscribe: false,
        desire: false,
      };
      if (data) {
        const statusData = await axios.post(
          `http://localhost:4000/courses/${params.courseId}`,
          data
        );
        if (statusData.data.subscribeStatus) {
          status.subscribe = true;
        }
        if (statusData.data.desireStatus) {
          status.desire = true;
        }
      }
      setIsLoading(false);
      return status;
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const getUserCourses = async (userId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        `http://localhost:4000/user/courses/${userId}`
      );
      setUserCourses(results.data.data);
      setCoursesCount(results.data.coursesCount);
      setIsLoading(false);
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
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    getUserCourses,
    userCourses,
    coursesCount,
  };
};

export default useCourses;
