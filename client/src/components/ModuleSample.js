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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ModuleSample = () => {
  const params = useParams();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [course, setCourse] = useState([]);

  const getCoursebyId = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4000/courses/${params.courseId}`
      );
      setCourse(result.data.data);
      //console.log("result.data.data: ", result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCoursebyId();
  }, []);

  // convert object lesson_name to array lesson_name
  let allLessons = [];

  let uniqueLessonName = [];
  for (let i = 0; i < course.length; i++) {
    if (course[i].lesson_name in allLessons) {
      allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
    } else {
      allLessons[course[i].lesson_name] = [];
      allLessons[course[i].lesson_name].push(course[i].sub_lesson_name);
    }
  }
  console.log("allLessons: ", allLessons);

  return (
    <Accordion defaultIndex={[0]} allowMultiple w="739px">
      {uniqueLessonName.map((name, key) => {
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
                  <Text ml="24px">{name}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            {uniqueLessonName.map((lessonName, key) => {
              course.filter((course) => {
                if (lessonName === course.lesson_name) {
                  return (
                    <AccordionPanel key={key} ml="13px" pb={4}>
                      <UnorderedList>
                        <ListItem>{course.sub_lesson_name}</ListItem>
                      </UnorderedList>
                    </AccordionPanel>
                  );
                }
              });

              //course.lesson_name === uniqueLessonName[1];
              //console.log("course.lesson_name: ", lesson_name);
            })}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
