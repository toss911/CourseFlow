import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { UserCourseCard } from "../components/UserCourseCard";
import {
  Box,
  Container,
  Heading,
  Button,
  Stack,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import useCourses from "../hooks/useCourses";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authentication.js";
import { PriceCard } from "../components/PriceCard";

function MyCourse() {
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  const {
    getCourses,
    courses,
    getCoursesbyId,
    isLoading,
    setIsLoading,
    totalPages,
    getUserCourses,
    userCourses,
  } = useCourses();

  const noCourse = typeof courses !== "undefined" && courses > 0;

  useEffect(() => {
    setIsLoading(true);
    const getData = setTimeout(() => {
      getUserCourses(userId);
    }, 1000);
    return () => clearTimeout(getData);
  }, []);

  console.log(userCourses);

  return (
    <Box>
      <Navbar />
      {/* // MY COURSE START HERE // */}
      <Container
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        align="center"
        w="vw"
        h="fit-content"
        mt="100px"
        gap="60px"
      >
        <Heading variant="headline2">My Course</Heading>
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing="8"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="link">
            <Text variant="body2" _hover={{ color: "black" }}>
              All Course
            </Text>
          </Button>
          <Button variant="link">
            <Text variant="body2" _hover={{ color: "black" }}>
              Inprogress
            </Text>
          </Button>
          <Button variant="link">
            <Text variant="body2" _hover={{ color: "black" }}>
              Complete
            </Text>
          </Button>
        </Stack>
      </Container>

      {/* // Cards Start Here // */}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        m="40px 160px 200px 160px "
        w="100%"
      >
        <Box position="relative" alignItems="start">
          <Box top="0px" position="sticky">
            <UserCourseCard />
          </Box>
        </Box>

        <Box
          w="850px"
          display="flex"
          justifyContent="start"
          flexWrap="wrap"
          gap="0px"
        >
          {userCourses.map((course, key) => {
            return (
              <CourseCard
                key={key}
                courseTitle={course.course_name}
                courseSummary={course.summary}
                courseNumLessons={course.lessons_count}
                courseTime={course.learning_time}
                courseImg={course.cover_image_directory}
                courseId={course.course_id}
              />
            );
          })}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default MyCourse;
