import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { PreFooter } from "../components/PreFooter";
import { ModuleSample } from "../components/ModuleSample";
import { PriceCard } from "../components/PriceCard";
import { useEffect } from "react";
import useCourses from "../hooks/useCourses";

function CourseDetail() {
  const { getCoursesbyId, course, category } = useCourses();

  useEffect(() => {
    getCoursesbyId();
  }, []);
  console.log("category: ", category);
  //console.log("course: ", course);

  return (
    <>
      <Navbar />
      {/* <NavbarLogin /> */}

      <Box
        w="100vw"
        pt="100px"
        pl="160px"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        <Flex flexDirection="row">
          <Image
            src="/assets/CourseDetail/Course1.svg"
            alt="Course picture"
            h="460px"
            w="739px"
          />

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
        </Flex>
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
                <Heading variants="headline2" color="black" mt="100px">
                  Course Detail
                </Heading>
                <Text variants="body2" w="739px" mt="10px">
                  {course.detail}
                </Text>
              </Box>
            );
          }
        })}
        <Heading mt="100px" color="black" mb="20px">
          Module Samples
        </Heading>
        <ModuleSample />
        {/* //ModuleSample Below// */}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        backgroundImage="url('/assets/CourseDetail/BG.svg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Heading variants="headline2" color="black" mt="121px">
          Other Interesting Courses
        </Heading>
        <Flex pb="50px">
          {category.map((category, key) => {
            if (key < 3) {
              return (
                <CourseCard
                  key={key}
                  courseTitle={category.course_name}
                  courseSummary={category.summary}
                  courseNumLessons={category.lessons_count}
                  courseTime={category.learning_time}
                  courseImg={category.cover_image_directory}
                  onClick={() => {
                    getCoursesbyId(course.course_id);
                  }}
                />
              );
            }
          })}
        </Flex>
      </Box>
      <PreFooter />
      <Footer />
    </>
  );
}

export default CourseDetail;
