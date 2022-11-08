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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { PreFooter } from "../components/PreFooter";
import { PriceCard } from "../components/PriceCard";
import { useEffect } from "react";
import useCourses from "../hooks/useCourses";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetail() {
  const { getCoursesbyId, course, category } = useCourses();

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    getCoursesbyId();
  }, [courseId]);

  // Stored data for mapping in module samples section
  let allLessons = {};
  for (let i = 0; i < course.length; i++) {
    if (course[i].lesson_name in allLessons) {
      allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
    } else {
      allLessons[course[i].lesson_name] = [];
      allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
    }
  }

  return (
    <>
      <Navbar />
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
        <Box position="sticky" top="0px" ml="739px">
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
        </Box>

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
                <Heading variant="headline2" color="black" mt="150px">
                  Course Detail
                </Heading>
                <Text variants="body2" w="739px" mt="10px">
                  {course.detail}
                </Text>
              </Box>
            );
          }
        })}
        <Heading mt="100px" color="black" mb="20px" variant="headline2">
          Module Samples
        </Heading>
        <Accordion defaultIndex={[0]} allowMultiple w="739px">
          {Object.keys(allLessons).map((lessonName, key) => {
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
                    <Box flex="1" textAlign="left" display="flex" color="black">
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
                    {allLessons[lessonName].map((subLessonName, key) => {
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
                    })}
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
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
                  courseTitle={category.course_name}
                  courseSummary={category.summary}
                  courseNumLessons={category.lessons_count}
                  courseTime={category.learning_time}
                  courseImg={category.cover_image_directory}
                  courseId={category.course_id}
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
      <PreFooter />
      <Footer />
    </>
  );
}

export default CourseDetail;
