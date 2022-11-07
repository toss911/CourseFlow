import {
  Center,
  Box,
  Image,
  Text,
  Heading,
  Button,
  Divider,
  ListItem,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCourses from "../hooks/useCourses";

export const ModuleSample = () => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { course, getCoursesbyId } = useCourses();
  console.log(" course: ", course);

  useEffect(() => {
    getCoursesbyId();
  }, []);

  let allLessons = {};
  for (let i = 0; i < course.length; i++) {
    if (course[i].lesson_name in allLessons) {
      allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
    } else {
      allLessons[course[i].lesson_name] = [];
      allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
    }
  }
  //console.log("allLessons: ", Array.isArray(allLessons));
  //console.log("allLessons: ", allLessons);
  //console.log("course: ", course);
  return (
    <Accordion defaultIndex={[0]} allowMultiple w="739px">
      {Object.keys(allLessons).map((lessonName, key) => {
        let numberLesson = null;
        if (key < 10) {
          numberLesson = "0" + (key + 1);
        } else {
          numberLesson = key + 1;
        }

        return (
          <AccordionItem key={key}>
            <h2>
              <AccordionButton display="flex" w="739px">
                <Box
                  flex="1"
                  textAlign="left"
                  fontSize="24px"
                  fontWeight="500"
                  display="flex"
                  color="black"
                >
                  <Text color="#646D89" display="flex">
                    {numberLesson}
                  </Text>
                  <Text ml="24px">{lessonName}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel ml="13px" pb={4}>
              <UnorderedList>
                {allLessons[lessonName].map((subLessonName) => {
                  return <ListItem>{subLessonName}</ListItem>;
                })}
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
