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

        <Box w="100vw" pt="15px" pl="160px" display="flex" flexDirection="row">
          <Box className="left-section" display="flex" flexDirection="column">
            <Image
              src="/assets/CourseDetail/Course1.svg"
              alt="Course picture"
              h="460px"
              w="739px"
            />
            <Box display="flex" flexDirection="column" w="548px" gap="24px">
              <Heading variant="headline2" color="black" mt="100px">
                Course Detail
              </Heading>
              <Text variant="body2" w="739px" mt="10px">
                {course.detail}
              </Text>
            </Box>
            {subscribeStatus ? (
              <Accordion
                allowMultiple
                w="739px"
                mt="100px"
                borderTop="0px solid white"
                defaultIndex={[0]}
              >
                <AccordionItem>
                  <AccordionButton
                    pl="0"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Heading variant="headline2">Attached Files</Heading>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} pl={0}>
                    <Flex w="90%" wrap="wrap" justify="space-between">
                      {Object.keys(course).length !== 0
                        ? course.files.map((file, key) => {
                            console.log("file: ", file);
                            return (
                              <Flex
                                key={key}
                                w="45%"
                                h="82px"
                                bg="blue.100"
                                mt={3}
                                borderRadius="8px"
                              >
                                {file.file_name} {file.type} {file.size}
                              </Flex>
                            );
                          })
                        : null}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
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
          <Box className="right-section">
            {Object.keys(course).length !== 0 ? (
              <Box position="sticky" top="0">
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
            ) : null}
          </Box>
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
            <Heading variant="headline2" color="black" mt="121px" mb="36px">
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
