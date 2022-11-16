import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  Button,
  Textarea,
  Spacer,
  Progress,
  AspectRatio,
  Badge,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer.js";
import { useEffect, useState } from "react";
import useCourses from "../hooks/useCourses";
import { useAuth } from "../contexts/authentication.js";
import axios from "axios";

function LearningPage() {
  const { getCourseLearningById, course } = useCourses();
  const [changeSubLesson, setChangeSubLesson] = useState();
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  useEffect(() => {
    getCourseLearningById(userId);
    /* setChangeSubLesson value ที่เอามาใส่ ต้องเป็น value ของหัวข้อ sub-lesson ที่เรียนจบล่าสุด (ซึ่งรับมาจาก back-end) */
    setChangeSubLesson(course.course_name);
  }, [course.course_name]);

  const handleSubLesson = async (subLessonId) => {
    /* เวลากดที่หัวข้อ sub-lesson จะต้องมีการส่ง request ไปขอ back-end ดึงข้อมูลของ sub-lesson นั้น ๆ มาแสดงอีกที */
    await axios.get(
      `http://localhost:4000/courses/${course.course_id}/learning?byUser=${userId}&subLessonId=${subLessonId}`
    );
  };

  const handleAcceptAssignment = async (subLessonId) => {
    await axios.post(
      `http://localhost:4000/courses/${course.course_id}/learning?byUser=${userId}&subLessonId=${subLessonId}`,
      { action: "accepted" }
    );
  };

  const handleVideoEnded = async (subLessonId) => {
    /* หลังจากดูวิดีโอจบแล้ว จะต้องยิง request ไปเพื่อของ post ข้อมูลลงตาราง users_sub_lessons ว่ามีการดูจบแล้ว */
    await axios.post(
      `http://localhost:4000/courses/${course.course_id}/learning?byUser=${userId}&subLessonId=${subLessonId}`,
      { action: "watched" }
    );
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
                    <AccordionItem border="0px">
                      <h2>
                        <AccordionButton
                          _hover={{ backgroundColor: "gray.100" }}
                          borderBottom="1px solid #D6D9E4"
                          pl="0"
                        >
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
                            <Text ml="24px" variant="body2">
                              {lessonName}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <UnorderedList>
                          {course.lessons[lessonName].map((subLesson, key) => {
                            return (
                              <Flex
                                flexDirection="row"
                                alignItems="start"
                                justifyContent="start"
                                mt="24px"
                                key={key}
                                _hover={{ backgroundColor: "gray.100" }}
                              >
                                {subLesson.video_status &&
                                subLesson.assign_status === true ? (
                                  <Image
                                    src="/assets/learning-page/success-circle.svg"
                                    alt="empty-circle"
                                    mt="3px"
                                    mr="15px"
                                  />
                                ) : subLesson.video_status ||
                                  subLesson.assign_status === true ? (
                                  <Image
                                    src="/assets/learning-page/half-circle.svg"
                                    alt="empty-circle"
                                    mt="3px"
                                    mr="15px"
                                  />
                                ) : (
                                  <Image
                                    src="/assets/learning-page/circle.svg"
                                    alt="empty-circle"
                                    mt="3px"
                                    mr="15px"
                                  />
                                )}

                                <Text
                                  cursor="pointer"
                                  variant="body2"
                                  onClick={() => {
                                    handleSubLesson(subLesson.sub_lesson_id);
                                  }}
                                >
                                  {subLesson.sub_lesson_name}
                                </Text>
                              </Flex>
                            );
                          })}
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
              <Badge variant="pending">pending</Badge>
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
              <Button height="60px">Send Assignment</Button>
              <Button variant="save draft" ml="20px" height="60px">
                Save Draft
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
