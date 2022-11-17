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
  const [page, setPage] = useState(1);
  const {
    getCourses,
    courses,
    isLoading,
    setIsLoading,
    desireCourse,
    desireCourses,
  } = useCourses();
  const {contextState} = useAuth();
  console.log(contextState);

  useEffect(() => {
    desireCourse(contextState.user.user_id);
    console.log(desireCourses);
  }, []);

  // Get current posts
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 150);
  };

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
                w="100%"
              >
                {desireCourses.map((course, key) => {
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
          total={courses.length}
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
