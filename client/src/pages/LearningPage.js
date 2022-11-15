import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Input,
  Button,
  Textarea,
  Spacer,
  Progress,
  AspectRatio,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourses from "../hooks/useCourses";
import { useAuth } from "../contexts/authentication.js";
function LearningPage() {
  const { getCourseLearningById, course } = useCourses();
  const [changeSubLesson, setChangeSubLesson] = useState();
  const { contextState } = useAuth();

  useEffect(() => {
    getCourseLearningById(contextState.user.user_id);
    setChangeSubLesson(course.course_name);
  }, [course.course_name]);

  const handleSubLesson = (subLessonName) => {
    setChangeSubLesson(subLessonName);
  };

  const handleVideoEnded = () => {
    alert("Testaodkaopk");
  };

  return (
    <>
      <Navbar />

      <Flex
        mt="100px"
        flexDirection="row"
        alignItems="start"
        justifyContent="center"
      >
        {/* //------------------------- Left Column ----------------------// */}
        <Flex
          flexDirection="column"
          alignItems="start"
          justifyContent="start"
          width="372px"
          height="940px"
          shadow="shadow1"
          //height="240px"
          mr="25px"
          pl="24px"
          overflowY="scroll"
        >
          <Text mt="32px" color="orange.500" fontSize="14px" fontWeight="400">
            Course
          </Text>

          <Heading variant="headline3" mt="24px">
            {course.course_name}
          </Heading>
          <Text variant="body2" color="gray.700" mt="8px">
            {course.summary}
          </Text>
          <Text variant="body3" mt="24px">
            {course.percentProgress}% Complete
          </Text>
          <Progress
            mt="8px"
            height="10px"
            width="309px"
            value={course.percentProgress}
            sx={{
              ".css-1jrtelv": {
                background:
                  "linear-gradient(109.54deg, #95BEFF 18.21%, #0040E6 95.27%)",
                borderRadius: "99px",
              },
            }}
          />
          {Object.keys(course).length === 0
            ? null
            : Object.keys(course.lessons).map((lessonName, key) => {
                let numberLesson = null;
                if (key < 10) {
                  numberLesson = "0" + (key + 1);
                } else {
                  numberLesson = key + 1;
                }
                return (
                  <Accordion
                    key={key}
                    defaultIndex={[1]}
                    allowMultiple
                    w="300px"
                    mt="24px"
                  >
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            flex="1"
                            textAlign="left"
                            display="flex"
                            color="black"
                          >
                            <Text
                              color="gray.700"
                              display="flex"
                              variant="body2"
                            >
                              {numberLesson}
                            </Text>
                            <Text ml="27px" variant="body2">
                              {lessonName}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel pb={4}>
                        <UnorderedList>
                          {course.lessons[lessonName].map(
                            (subLessonName, key) => {
                              return (
                                <Flex
                                  flexDirection="row"
                                  alignItems="start"
                                  justifyContent="start"
                                  mt="24px"
                                  key={key}
                                >
                                  <Image
                                    src="/assets/learning-page/circle.svg"
                                    alt="empty-circle"
                                    mt="5px"
                                    mr="15px"
                                  />
                                  <Text
                                    cursor="pointer"
                                    variant="body2"
                                    onClick={() => {
                                      handleSubLesson(subLessonName, key);
                                    }}
                                  >
                                    {subLessonName}
                                  </Text>
                                </Flex>
                              );
                            }
                          )}
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                );
              })}
        </Flex>
        {/* //---------------------------- Right Column -----------------------// */}
        <Flex flexDirection="column" alignItems="start" width="739px">
          <Heading mb="33px" variant="headline2">
            {changeSubLesson}
          </Heading>
          <AspectRatio w="739px" ratio={16 / 9}>
            <video controls onEnded={() => handleVideoEnded()}>
              <source
                src="https://res.cloudinary.com/dxk5mdqoz/video/upload/v1668525048/Countdown_amqcom.mp4"
                type="video/mp4"
              />
            </video>
          </AspectRatio>
          <Flex
            bg="blue.100"
            width="739px"
            flexDirection="column"
            alignItems="start"
            mt="80px"
            mb="100px"
            pl="24px"
            borderRadius="8px"
          >
            <Flex
              flexDirection="row"
              alignItems="start"
              mt="24px"
              width="691px"
            >
              <Text variant="body1">Assignment</Text>
              <Spacer />
              <Text
                bg="#FFFBDB"
                color="#996500"
                fontSize="16px"
                fontWeight="500"
                mt="3px"
                p="4px 8px"
                borderRadius="4px"
              >
                Pending
              </Text>
            </Flex>
            <Text variant="body2" mt="25px">
              What are the service design?
            </Text>
            <Textarea
              mt="4px"
              width="691px"
              height="100px"
              resize="none"
              placeholder="Answer..."
              size="16px"
              fontWeight="400"
              bg="white"
              p="12px 16px 12px 12px"
              border="1px solid"
              borderColor="gray.400"
              borderRadius="8px"
              _focus={{ borderColor: "gray.100" }}
            />
            <Flex
              flexDirection="row"
              alignItems="start"
              justifyContent="center"
              width="691px"
              mt="25px"
              mb="24px"
            >
              <Button width="210px" height="60px">
                Send Assignment
              </Button>
              <Button ml="20px" width="100px" height="60px">
                Save
              </Button>
              <Spacer />
              <Text pt="20px" color="gray.700">
                Submit within 2 days
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        shadow="shadow1"
        width="100vw"
        height="100px"
      >
        <Text
          cursor="pointer"
          color="blue.500"
          fontWeight="700"
          fontSize="16px"
          ml="68px"
        >
          Previous Sub-lesson
        </Text>

        <Spacer />
        <Button width="200px" height="60px" mr="68px">
          Next Sub-lesson
        </Button>
      </Flex>
      <Footer />
    </>
  );
}

export default LearningPage;
