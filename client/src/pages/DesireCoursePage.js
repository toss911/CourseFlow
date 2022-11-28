import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import useCourses from "../hooks/useCourses";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/authentication.js";
import { Pagination } from "antd";
import "antd/dist/antd.min.css";
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

function DesireCourse() {
  const { isLoading, getDesiredCourses, desiredCourses } = useCourses();
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDesiredCourses(userId, searchParams.get("page"));
  }, [searchParams.get("page")]);

  const paginate = (pageNumber) => {
    navigate(`.?page=${pageNumber}`);
    window.scrollTo(0, 150);
  };

  return (
    <Stack direction="column" spacing="49px">
      <Navbar />
      <Box>
        <Image w="100%" src="/assets/courseCard/bgOc.svg" position="relative" />
        <Box>
          <Flex flexDirection="column" alignItems="center" mt="-100">
            <Heading variant="headline2" mb="60px">
              Desired Courses
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
              ) : !Object.keys(desiredCourses).length >
                0 ? null : desiredCourses.data.length > 0 ? (
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  mb="180px"
                  flexWrap="wrap"
                  w="90%"
                >
                  {desiredCourses.data.map((course, key) => {
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
                  No Desired Course
                </Text>
              )}
            </Center>
          </Flex>
        </Box>
        <Center mb="20">
          <Pagination
            total={desiredCourses.count}
            current={Number(searchParams.get("page")) || 1}
            pageSize={6}
            onChange={paginate}
            showSizeChanger={false}
            hideOnSinglePage={Number(desiredCourses.count) === 0 ? true : false}
          />
        </Center>
      </Box>
      <Footer />
    </Stack>
  );
}

export default DesireCourse;
