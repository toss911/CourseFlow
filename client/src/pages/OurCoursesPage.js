import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { SearchIcon } from '@chakra-ui/icons';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import useCourses from '../hooks/useCourses';

function OurCourses() {
  const [keywords, setKeywords] = useState('');
  const [page, setPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(12);

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

  const noCourse = typeof courses !== 'undefined' && courses > 0;

  useEffect(() => {
    setIsLoading(true);
    const getData = setTimeout(() => {
      getCourses({ keywords, page });
    }, 1000);
    return () => clearTimeout(getData);
  }, [keywords, page]);

  // Get current posts
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo(0, 150);
  };

  return (
    <Box>
      <Navbar />
      <Box>
        <Image w='100%' src='/assets/courseCard/bgOc.svg' position='relative' />

        <Flex flexDirection='column' alignItems='center' mt='-100'>
          <Heading variant='headline2' mb='60px'>
            Our Courses
          </Heading>
          <Box mb='100px'>
            <InputGroup w='357px'>
              <Input
                type='string'
                placeholder='Search...'
                pl='40px'
                onChange={handleSearchTextChange}
                value={keywords}
              />
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='#646D89' />}
              />
            </InputGroup>
          </Box>
        </Flex>
      </Box>

      <Center>
        {isLoading ? (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            mb='187px'
          />
        ) : typeof courses !== 'undefined' && courses.length > 0 ? (
          <Flex
            flexDirection='row'
            justifyContent='center'
            mb='180px'
            flexWrap='wrap'
            w='100%'
          >
            {currentCourses.map((course, key) => {
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
          </Flex>
        ) : (
          <Text as='i' color='black' mb='187px'>
            Course not found
          </Text>
        )}
      </Center>
      <Center mb='20'>
        <Pagination
          total={courses.length}
          current={page}
          pageSize={coursesPerPage}
          onChange={paginate}
        />
      </Center>

      <Footer />
    </Box>
  );
}

export default OurCourses;
