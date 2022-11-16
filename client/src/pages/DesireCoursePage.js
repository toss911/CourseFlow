import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import useCourses from "../hooks/useCourses";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Input,
  InputLeftElement,
  InputGroup,
  Center,
  Spinner,
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

  useEffect(() => {
    desireCourse(5);
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
    <Box>
      <Navbar />
      <Box>
        <Image w="100%" src="/assets/courseCard/bgOc.svg" position="relative" />

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
                Course not found
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
      <Footer />
    </Box>
  );
}

export default DesireCourse;
