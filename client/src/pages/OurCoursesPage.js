import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CourseCard } from "../components/CourseCard";
import { SearchIcon } from "@chakra-ui/icons";
import { PreFooter } from "../components/PreFooter";
import Pagination from "../components/Pagination";
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

  const { getAllCourses, getCourses, courses, getCoursesbyId } = useCourses();

  useEffect(()=>{

    if(keywords) {
      getCourses( { keywords, page } );
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
              <Input type="string" placeholder="Search..." pl="40px" onChange={(e)=>{setKeywords(e.target.value)}} value={keywords}/>
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
          mb="180px"
          flexWrap="wrap"
          w="100%"
        >
          {courses.map((course, key) => {
            return (
              <CourseCard
                key={key}
                courseTitle={course.name}
                courseSummary={course.summary}
                courseNumLessons={course.lessons_count}
                courseTime={course.learning_time}
                courseImg={course.cover_image_directory}
                onClick={()=> {getCoursesbyId(course.course_id)}}
              />
            );
          })}
        </Flex>
      </Center>
       {/* <Pagination 
          ourCoursesPage={ourCoursesPage}
          totalCourse={cardData.length}
          paginate={paginate}
        />
      <PreFooter/> */}
      <Footer />
     
    </Box>
  );
}

export default OurCourses;
