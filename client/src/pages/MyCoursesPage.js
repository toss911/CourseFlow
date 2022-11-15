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
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication.js";
import axios from "axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [coursesCount, setCoursesCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:4000/user/mycourses?byUser=${userId}`
      );
      setCoursesCount(result.data.coursesCount);
      setCourses(result.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box
      w="100vw"
      backgroundImage="url('assets/profile-page/profileBg.svg')"
      backgroundRepeat="no-repeat"
      backgroundSize="98%"
      backgroundPosition="43px 188px"
    >
      <Navbar />
      <Skeleton isLoaded={!isLoading}>
        <Container flexWrap="wrap" w="100%" pt="100px">
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
                <Tab>All Courses</Tab>
                <Tab>In progress</Tab>
                <Tab>Completed</Tab>
              </TabList>

              <Box display="flex" justifyContent="end" flex="wrap">
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
                    {courses.map((course, key) => {
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
                    {courses
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
                    {courses
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
      </Skeleton>
      <Footer />
    </Box>
  );
}

export default MyCourses;
