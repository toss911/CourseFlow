import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { PreFooter } from "../components/PreFooter";
import { PriceCard } from "../components/PriceCard";
import { useEffect, useState } from "react";
import useCourses from "../hooks/useCourses";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authentication.js";

function CourseDetail() {
  // subscribeStatus: true => already subscribed course
  const [subscribeStatus, setSubscribeStatus] = useState(false);
  // addStatus: true => already added course
  const [addStatus, setAddStatus] = useState(false);
  const { getCourseById, course, category, isLoading } = useCourses();
  const { isAuthenticated, setContextState, contextState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let data;
    if (isAuthenticated) {
      data = { user_id: contextState.user.user_id };
    }
    async function fetchData() {
      const result = await getCourseById(data);
      setSubscribeStatus(result.subscribe);
      setAddStatus(result.desire);
    }
    fetchData();

    // To remember the lastest URL that non-user visited
    setContextState({ ...contextState, previousUrl: location.pathname });
  }, [location]);

  return (
    <>
      <Navbar />
      <Skeleton isLoaded={!isLoading}>
        <Box display="flex" pl="160px">
          <Text mt="59px" mb="5px" color="blue.500" fontSize="16px">
            <Link pl="12px" onClick={() => navigate("/courses")}>
              <ArrowBackIcon mr="10px" color="blue.500" />
              Back
            </Link>
          </Text>
        </Box>

        <Box
          w="100vw"
          pt="15px"
          pl="160px"
          display="flex"
          flexDirection="column"
          position="relative"
        >
          <Image
            src="/assets/CourseDetail/Course1.svg"
            alt="Course picture"
            h="460px"
            w="739px"
            position="absolute"
          />

          {Object.keys(course).length !== 0 ? (
            <>
              <Box position="sticky" top="0px" ml="739px">
                <PriceCard
                  courseId={course.course_id}
                  courseName={course.course_name}
                  courseContent={course.summary}
                  coursePrice={course.price}
                  subscribeStatus={subscribeStatus}
                  setSubscribeStatus={setSubscribeStatus}
                  addStatus={addStatus}
                  setAddStatus={setAddStatus}
                />
              </Box>
              <Box display="flex" flexDirection="column" w="548px" gap="24px">
                <Heading variant="headline2" color="black" mt="150px">
                  Course Detail
                </Heading>
                <Text variant="body2" w="739px" mt="10px">
                  {course.detail}
                </Text>
              </Box>
            </>
          ) : null}

          <Heading mt="100px" color="black" mb="20px" variant="headline2">
            Module Samples
          </Heading>
          <Accordion defaultIndex={[0]} allowMultiple w="739px">
            {Object.keys(course).length === 0
              ? null
              : Object.keys(course.lessons).map((lessonName, key) => {
                  let numberLesson = null;
                  if (key < 10) {
                    numberLesson = "0" + (key + 1);
                  } else {
                    numberLesson = key + 1;
                  }

                  return (
                    <AccordionItem key={key}>
                      <h2>
                        <AccordionButton display="flex" w="739px">
                          <Box
                            flex="1"
                            textAlign="left"
                            display="flex"
                            color="black"
                          >
                            <Heading
                              color="gray.700"
                              display="flex"
                              variant="headline3"
                            >
                              {numberLesson}
                            </Heading>
                            <Heading ml="24px" variant="headline3">
                              {lessonName}
                            </Heading>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel ml="13px" pb={4}>
                        <UnorderedList>
                          {course.lessons[lessonName].map(
                            (subLessonName, key) => {
                              return (
                                <ListItem
                                  fontWeight="400"
                                  color="gray.700"
                                  fontSize="16px"
                                  key={key}
                                >
                                  {subLessonName}
                                </ListItem>
                              );
                            }
                          )}
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
          </Accordion>
        </Box>
        {subscribeStatus ? (
          <Box mt="300px"></Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            backgroundColor="gray.100"
            mt="169px"
          >
            <Heading variant="headline2" color="black" mt="121px">
              Other Interesting Courses
            </Heading>
            {typeof category !== "undefined" && category.length > 0 ? (
              <Flex pb="50px">
                {category.map((category, key) => {
                  return (
                    <CourseCard
                      key={key}
                      courseId={category.course_id}
                      courseTitle={category.course_name}
                      courseSummary={category.summary}
                      courseNumLessons={category.lessons_count}
                      courseTime={category.learning_time}
                      courseImg={category.cover_image_directory}
                    />
                  );
                })}
              </Flex>
            ) : (
              <Text as="i" color="black" mt="187px" mb="187px">
                No relevant course
              </Text>
            )}
          </Box>
        )}
        {!isAuthenticated ? <PreFooter /> : null}
        <Footer />
      </Skeleton>
    </>
  );
}

export default CourseDetail;
