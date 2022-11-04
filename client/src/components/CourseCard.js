import React from "react";
import {
    Box,
    Image,
    Flex,
    Text,
    Heading,
    Divider,
    Link,
  } from "@chakra-ui/react";

  export function CourseCard(props) {
    return (
          <Box h='475px' w='375px' boxShadow='shadow1' borderRadius ='8px' mx='24px' mt='24px'  overflow='hidden' mb ='24px'>
              <Box>
              <Image
              src={
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }/>
              </Box>
              <Box >
              <Flex w='325px' h='115px' flexDirection='column' ml='16px'>
              <Text variant="body3" color="orange.500" mt="20px" mb='8px'>
              Course
              </Text>
              <Heading variant="headline3" color="black" mb='8px'> 
              {props.courseTitle}
            </Heading>
            <Box>
            <Text variant="body2" color="gray.700" noOfLines={2}>
            {props.courseSummary}
            </Text>
            </Box>
              </Flex>
          <Flex
            flexDirection='column'
            justifyContent='flex-start'
             mt='70px' >
            <Divider borderColor='gray.300'/>
            <Flex flexDirection='row' ml='16px' mb='16px' mt='7px'>
            <Image src="/assets/courseCard/book.svg" alt="book" pr='10.5px'/>
            <Text variant="body2" color="gray.700" pr='26.5px'>
              {props.courseNumLessons} Lesson
            </Text>
            <Image src="assets/courseCard/clock.svg" alt="clock" pr='10.5px'/>
            <Text variant="body2" color="gray.700">
              {props.courseTime} Hours
            </Text>
            </Flex>
          </Flex>
          </Box>
          </Box>
    );
  }