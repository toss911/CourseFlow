import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { NavbarLogin } from "../components/NavbarLogin ";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { PreFooter } from "../components/PreFooter";
import { ModuleSample } from "../components/ModuleSample";
import { PriceCard } from "../components/PriceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetail() {
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
  useEffect(() => {
    getCoursebyId();
  }, []);
  //console.log("course: ", course[0]);

  return (
    <>
      <Navbar />
      {/* <NavbarLogin /> */}

      <Box
        w='100vw'
        pt='100px'
        pl='160px'
        display='flex'
        flexDirection='column'
        position='relative'
      >
        <Flex flexDirection="row">
          <Image
            src="/assets/CourseDetail/Course1.svg"
            alt="Course picture"
            h="460px"
            w="739px"
          />

          {course.map((course, key) => {
            if (key === 0) {
              return (
                <PriceCard
                  key={key}
                  courseName={course.course_name}
                  courseContent={course.summary}
                  coursePrice={course.price}
                />
              );
            }
          })}
        </Flex>
        {course.map((course, key) => {
          if (key === 0) {
            return (
              <Box
                key={key}
                display="flex"
                flexDirection="column"
                w="548px"
                gap="24px"
              >
                <Heading variants="headline2" color="black" mt="100px">
                  Course Detail
                </Heading>
                <Text variants="body2" w="739px" mt="10px">
                  {course.detail}
                </Text>
              </Box>
            );
          }
        })}
        <Heading mt="100px" color="black" mb="20px">
          Module Samples
        </Heading>
        <ModuleSample />
        {/* //ModuleSample Below// */}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        backgroundImage="url('/assets/CourseDetail/BG.svg')"
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
      >
        <Heading variants='headline2' color='black' mt='121px'>
          Other Interesting Courses
        </Heading>
        <Box pb='50px'>
          <CourseCard />
        </Box>
      </Box>
      <PreFooter />
      <Footer />
    </>
  );
}

export default CourseDetail;
