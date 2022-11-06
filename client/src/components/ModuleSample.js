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
  let newArrayLessonName = [];
  let uniqueLessonName = [];
  for (let i = 0; i < course.length; i++) {
    let valueObject = Object.values(course[i]);
    let lessonName = valueObject[18];
    newArrayLessonName.push(lessonName);
  }
  // find unique lesson_name
  for (let i = 0; i < newArrayLessonName.length; i++) {
    if (uniqueLessonName.indexOf(newArrayLessonName[i]) < 0) {
      uniqueLessonName.push(newArrayLessonName[i]);
    }
  }
  //console.log("uniqueLessonName: ", uniqueLessonName);
  // group lesson name for map sub_lesson name
  for (let i = 0; i < uniqueLessonName.length; i++) {
    let groupLessonName = course.filter(
      (course) => course.lesson_name === uniqueLessonName[i]
    );
    return groupLessonName;
  }

  return (
    <Accordion defaultIndex={[0]} allowMultiple w="739px">
      <AccordionItem>
        {uniqueLessonName.map((name, key) => {
          let numberLesson = null;
          if (key < 10) {
            numberLesson = "0" + (key + 1);
          } else {
            numberLesson = key + 1;
          }
          return (
            <h2>
              <AccordionButton key={key} display="flex" w="739px">
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
          );
        })}
        <AccordionPanel ml="13px" pb={4}>
          <UnorderedList>
            <ListItem>sub_lesson_name</ListItem>
            <ListItem>sub_lesson_name</ListItem>
            <ListItem>sub_lesson_name</ListItem>
            <ListItem>sub_lesson_name</ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
