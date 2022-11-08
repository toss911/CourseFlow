import React from "react";
import { Box, Image, Flex, Text, Heading, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function CourseCard(props) {
  const navigate = useNavigate();
  return (
    <Box
      h="475px"
      w="357px"
      boxShadow="shadow1"
      borderRadius="8px"
      mx="24px"
      mt="24px"
      overflow="hidden"
      mb="24px"
      _hover={{
        background: "white",
        border: "solid 1px",
        borderColor: "blue.200",
      }}
      onClick={() => navigate(`/courses/${props.courseId}`)}
      cursor="pointer"
    >
      <Box w="357px" h="240px">
        <Image w="357px" src={props.courseImg} />
      </Box>
      <Box>
        <Flex w="325px" h="115px" flexDirection="column" ml="16px">
          <Text variant="body3" color="orange.500" mt="20px" mb="8px">
            Course
          </Text>
          <Heading variant="headline3" color="black" mb="8px">
            {props.courseTitle}
          </Heading>
          <Box>
            <Text variant="body2" color="gray.700" noOfLines={2}>
              {props.courseSummary}
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" justifyContent="flex-start" mt="70px">
          <Divider borderColor="gray.300" />
          <Flex flexDirection="row" ml="16px" mb="16px" mt="7px">
            <Image src="/assets/courseCard/book.svg" alt="book" pr="10.5px" />
            <Text variant="body2" color="gray.700" pr="26.5px">
              {props.courseNumLessons} Lesson
            </Text>
            <Image src="/assets/courseCard/clock.svg" alt="clock" pr="10.5px" />
            <Text variant="body2" color="gray.700">
              {props.courseTime} Hours
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
