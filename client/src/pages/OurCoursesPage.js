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
} from "@chakra-ui/react";
// import { cardData } from "../data/cardData.js";
import useCourses from "../hooks/useCourses";

function OurCourses() {
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchTextChange = (event) => {
    setKeywords(event.target.value);
  };

  const { getAllCourses, getCourses, courses, getCoursesbyId,totalPages } = useCourses();

  useEffect(() => {
    // let timerId;

    if (keywords) {
      getCourses({ keywords, page });

      // timerId = setTimeout(getCourses( { keywords, page } ), 1000);
    }

    getAllCourses();
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
        <Flex
          flexDirection="row"
          justifyContent="center"
          mb="5%"
          flexWrap="wrap"
          w="70%"
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
      </Center>
      <Flex flexDirection='column' alignItems='center' justifyContent='center' mb='5%'>
      <Box className="pagination" >
        {page > 1 ? (
          <Link className="previous-button" onClick={() => setPage(page - 1)} mr='15px'>
            Previous
          </Link>
        ) : null}

        {page} / {totalPages}

        {page !== totalPages ? (
          <Link className="next-button" onClick={() => setPage(page + 1)} ml='15px'>
            Next
          </Link>
        ) : null}
      </Box>
      </Flex>
       <PreFooter/>
      <Footer />
    </Box>
  );
}

export default OurCourses;
