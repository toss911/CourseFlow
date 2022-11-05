import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const useCourseDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [course, setCourse] = useState([]);

  const getCoursebyId = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/courses/${params.courseId}`
      );
      setCourse(result.data.data);
      setIsLoading(false);
    } catch (error) { 
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    course,
    getCoursebyId,
    isError,
    isLoading,
  };
};

export default useCourseDetail;
