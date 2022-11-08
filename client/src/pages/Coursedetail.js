import { Flex, Box, Image, Text, Heading, Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { PreFooter } from '../components/PreFooter';
import { ModuleSample } from '../components/ModuleSample';
import { PriceCard } from '../components/PriceCard';
import { useEffect } from 'react';
import useCourses from '../hooks/useCourses';
import { useNavigate } from 'react-router-dom';

function CourseDetail() {
  const { getCoursesbyId, course, category } = useCourses();

  useEffect(() => {
    getCoursesbyId();
  }, []);
  console.log('category: ', category);
  //console.log("course: ", course);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* <NavbarLogin /> */}
      <Box display='flex' pl='160px'>
        <Text as='b' mt='59px' color='blue.500' fontSize='16px'>
          <Link pl='12px' gap='10px' onClick={() => navigate('/OurCourses')}>
            <ArrowBackIcon color='blue.500' />
            Back
          </Link>
        </Text>
      </Box>

      <Box
        w='100vw'
        pt='15px'
        pl='160px'
        display='flex'
        flexDirection='column'
        position='relative'
      >
        <Image
          src='/assets/CourseDetail/Course1.svg'
          alt='Course picture'
          h='460px'
          w='739px'
          display='flex'
          position='absolute'
        />
        <Box
          display='flex'
          top='0'
          position='sticky'
          pr='160px'
          alignSelf='end'
        >
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
                display='flex'
                flexDirection='column'
                w='548px'
                gap='24px'
              >
                <Heading variant='headline2' color='black' mt='100px'>
                  Course Detail
                </Heading>
                <Text variants='body2' w='739px' mt='10px'>
                  {course.detail}
                </Text>
              </Box>
            );
          }
        })}
        <Heading mt='100px' color='black' mb='20px' variant='headline2'>
          Module Samples
        </Heading>
        <ModuleSample />
        {/* //ModuleSample Below// */}
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        backgroundColor='gray.100'
        mt='169px'
      >
        <Heading variant='headline2' color='black' mt='121px'>
          Other Interesting Courses
        </Heading>
        <Flex pb='50px'>
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
