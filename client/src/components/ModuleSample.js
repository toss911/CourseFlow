import {
  Box,
  Text,
  ListItem,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useCourses from "../hooks/useCourses";

export const ModuleSample = () => {
  const { course, getCoursesbyId } = useCourses();

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
                <Box flex="1" textAlign="left" display="flex" color="black">
                  <Heading color="gray.700" display="flex" variant="headline3">
                    {numberLesson}
                  </Heading>
                  <Heading ml="24px" variant="headline3">
                    {lessonName}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel ml="13px" pb={4}>
              <UnorderedList>
                {allLessons[lessonName].map((subLessonName, key) => {
                  return (
                    <ListItem
                      fontWeight="400"
                      color="gray.700"
                      fontSize="16px"
                      key={key}
                    >
                      {subLessonName}
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
