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

  const { getCourses, courses } = useCourses();

  useEffect(()=>{
    getCourses( { keywords, page } );
  }, [keywords, page]);
//   const [course,setCourses] = useState([]);
//   const [loading,setLoading] = useState(false);
//   const [currentPage,setCurrentPage] = useState(1);
//   const [ourCoursesPage,setCoursesPage] = useState(10);
//   const paginate = (pageNumber) => setCoursesPage(pageNumber)
// useEffect(()=>{
//   const fetchPost = async() =>{
//   setLoading(true);
//   const res = {cardData}
//   setCourses(res.cardData);
//   setLoading(false);
// }
//  fetchPost();
// },[]);

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
              <Input type="string" placeholder="Search..." pl="40px" value={keywords} onchange={(e)=>{setKeywords(e.target.value)}}/>
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
          w="70%"
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
