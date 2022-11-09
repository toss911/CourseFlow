import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { UserCourseCard } from '../components/UserCourseCard';
import {
  Box,
  Container,
  Heading,
  Button,
  Stack,
  Text,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import useCourses from '../hooks/useCourses';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/authentication.js';
import { PriceCard } from '../components/PriceCard';

function MyCourse() {
  //   const { getCoursesbyId, course, category } = useCourses();

  //   const { isAuthenticated, setContextState, contextState } = useAuth();
  //   const navigate = useNavigate();
  //   const location = useLocation();

  //   useEffect(() => {
  //     getCoursesbyId();
  //     setContextState({ ...contextState, previousUrl: location.pathname });
  //   }, [location]);

  //   // Stored data for mapping in module samples section
  //   let allLessons = {};
  //   for (let i = 0; i < course.length; i++) {
  //     if (course[i].lesson_name in allLessons) {
  //       allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
  //     } else {
  //       allLessons[course[i].lesson_name] = [];
  //       allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
  //     }
  //   }
  return (
    <Box>
      <Navbar />
      {/* // MY COURSE START HERE // */}
      <Container
        display='flex'
        flexDirection='column'
        flexWrap='wrap'
        align='center'
        w='vw'
        mt='100px'
        gap='60px'
      >
        <Heading>My Course</Heading>
        <Stack
          direction='row'
          flexWrap='wrap'
          spacing='8'
          justifyContent='center'
          alignItems='center'
        >
          <Button variant='link'>
            <Text variant='body2' _hover={{ color: 'black' }}>
              All Course
            </Text>
          </Button>
          <Button variant='link'>
            <Text variant='body2' _hover={{ color: 'black' }}>
              Inprogress
            </Text>
          </Button>
          <Button variant='link'>
            <Text variant='body2' _hover={{ color: 'black' }}>
              Complete
            </Text>
          </Button>
        </Stack>
      </Container>
      {/* // Cards Start Here // */}

      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        m='40px 160px 200px 160px '
      >
        <Box>
          <Box display='flex' top='0px' position='sticky'>
            <UserCourseCard />
          </Box>
        </Box>
        {/* <Center>
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
          )} */}
        {/* </Center> */}
        <Box
          w='740px'
          flexDirection='row'
          justifyContent='center'
          flexWrap='wrap'
        >
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default MyCourse;
