import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { SearchIcon } from "@chakra-ui/icons";
import { PreFooter } from "../components/PreFooter";
import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Link,
  InputLeftElement,
  InputGroup,
  Center,
  Spinner,
} from "@chakra-ui/react";
// import { cardData } from "../data/cardData.js";
import useCourses from "../hooks/useCourses";

function OurCourses() {
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchTextChange = (event) => {
    setKeywords(event.target.value);
  };

  const {
    getCourses,
    courses,
    getCoursesbyId,
    isLoading,
    setIsLoading,
    totalPages,
  } = useCourses();

  const noCourse = typeof courses !== "undefined" && courses > 0;

  useEffect(() => {
    setIsLoading(true);
    const getData = setTimeout(() => {
      getCourses({ keywords, page });
    }, 1000);
    return () => clearTimeout(getData);
  }, [keywords, page]);

  return (
    <Box>
      <Navbar />
      <Box>
        <Image w="100%" src="/assets/courseCard/bgOc.svg" position="relative" />

        <Flex flexDirection="column" alignItems="center" mt="-100">
          <Heading variant="headline2" mb="60px">
            Our Courses
          </Heading>
          <Box mb="100px">
            <InputGroup w="357px">
              <Input
                type="string"
                placeholder="Search..."
                pl="40px"
                onChange={handleSearchTextChange}
                value={keywords}
              />
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="#646D89" />}
              />
            </InputGroup>
          </Box>
        </Flex>
      </Box>

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
        ) : typeof courses !== "undefined" && courses.length > 0 ? (
          <Flex
            flexDirection="row"
            justifyContent="center"
            mb="180px"
            flexWrap="wrap"
            w="100%"
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
                  onClick={() => {
                    getCoursesbyId(course.course_id);
                  }}
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
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb="5%"
      >
        <Box className="pagination">
          {page > 1 ? (
            <Link
              className="previous-button"
              onClick={() => setPage(page - 1)}
              mr="15px"
            >
              Previous
            </Link>
          ) : null}
          {page} / {totalPages}
          {page !== totalPages ? (
            <Link
              className="next-button"
              onClick={() => setPage(page + 1)}
              ml="15px"
            >
              Next
            </Link>
          ) : null}
        </Box>
      </Flex>
      <PreFooter />
      <Footer />
    </Box>
  );
}

export default OurCourses;
