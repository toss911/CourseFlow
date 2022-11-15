import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { UserCourseCard } from "../components/UserCourseCard";
import {
  Box,
  TabPanels,
  TabPanel,
  Container,
  Heading,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import useCourses from "../hooks/useCourses";
import { useEffect } from "react";
import { useAuth } from "../contexts/authentication.js";

function MyCourses() {
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  const { setIsLoading, getUserCourses, userCourses, coursesCount } =
    useCourses();

  useEffect(() => {
    setIsLoading(true);
    getUserCourses(userId);
  }, []);

  return (
    <Box w="vw">
      <Navbar />
      <Container flexWrap="wrap" w="vw" h="fit-content" mt="100px" gap="60px">
        <Heading align="center" variant="headline2" mb="60px">
          My Courses
        </Heading>
        <Box>
          <Tabs
            align="center"
            justifyContent="center"
            pb="16px"
            sx={{
              ".css-1oezttv": {
                borderColor: "white",
                color: "#9AA1B9",
              },
              ".css-1oezttv[aria-selected=true]": {
                borderColor: "black",
                color: "black",
              },
            }}
          >
            <TabList w="fit-content">
              <Tab>All Course</Tab>
              <Tab>Inprogress</Tab>
              <Tab>Complete</Tab>
            </TabList>

            <Box
              display="flex"
              justifyContent="end"
              flex="wrap"
              // flexDirection="row"
            >
              <Box>
                <Box
                  top="0px"
                  position="sticky"
                  flex="wrap"
                  pt="16px"
                  align="end"
                >
                  <UserCourseCard coursesCount={coursesCount} />
                </Box>
              </Box>
              <TabPanels>
                <TabPanel
                  w="850px"
                  display="flex"
                  flexWrap="wrap"
                  align="start"
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
                </TabPanel>
                <TabPanel
                  w="850px"
                  display="flex"
                  flexWrap="wrap"
                  align="start"
                >
                  {userCourses
                    .filter((item) => {
                      return item.status === false;
                    })
                    .map((course, key) => {
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
                </TabPanel>
                <TabPanel
                  w="850px"
                  display="flex"
                  flexWrap="wrap"
                  align="start"
                >
                  {userCourses
                    .filter((item) => {
                      return item.status === true;
                    })
                    .map((course, key) => {
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
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Container>
      ;{/* // Cards Start Here // */}
      <Footer />
    </Box>
  );
}

export default MyCourses;
