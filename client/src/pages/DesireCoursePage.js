import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import useCourses from "../hooks/useCourses";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication.js";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Center,
  Spinner,
  Stack,
} from "@chakra-ui/react";

const coursesPerPage = 6;

function DesireCourse() {
  const {
    getCourses,
    isLoading,
    setIsLoading,
    desireCourse,
    desireCourses,
  } = useCourses();
  const {contextState} = useAuth();
  const [page, setPage] = useState(1);
  // console.log(contextState.user.user_id);

  useEffect(() => {
    desireCourse(contextState.user.user_id);}, []);

  // Get current posts
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = desireCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 150);
  };
  console.log(desireCourses.length);

  return (
    <Stack direction='column' spacing='49px'>
    <Navbar />
    <Box>
    <Image w="100%" src="/assets/courseCard/bgOc.svg" position="relative" />
      <Box>
        <Flex flexDirection="column" alignItems="center" mt="-100">
          <Heading variant="headline2" mb="60px">
            Desire Course
          </Heading>
          <Center>
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                mb="187px"
              />
            ) : typeof desireCourses !== "undefined" &&
              desireCourses.length > 0 ? (
              <Flex
                flexDirection="row"
                justifyContent="center"
                mb="180px"
                flexWrap="wrap"
                w="70%"
                // w="100%" ถ้าจอคนอื่นให้ใช้อันนี้
              >
                {currentCourses.map((course, key) => {
                  return (
                    <CourseCard
                      key={key}
                      courseTitle={course.course_name}
                      courseSummary={course.summary}
                      courseNumLessons={course.count}
                      courseTime={course.learning_time}
                      courseImg={course.cover_image_directory}
                      courseId={course.course_id}
                    />
                  );
                })}
              </Flex>
            ) : (
              <Text as="i" color="black" mb="187px">
                No Desire Courses
              </Text>
            )}
          </Center>
        </Flex>
      </Box>
      <Center mb="20">
        <Pagination
          total={desireCourses.length}
          current={page}
          pageSize={coursesPerPage}
          onChange={paginate}
        />
      </Center>
    </Box>
    <Footer />
  </Stack>
  );
}

export default DesireCourse;
