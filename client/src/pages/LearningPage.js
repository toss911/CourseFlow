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
  Divider,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer.js";
import { useEffect, useState } from "react";
import useCourses from "../hooks/useCourses";
import { useAuth } from "../contexts/authentication.js";
import axios from "axios";

function LearningPage() {
  const [userAssignment, setUserAssignment] = useState({});
  const [subLessonData, setSubLessonData] = useState({});
  const [answer, setAnswer] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCourseLearningById, course, isLoading, setIsLoading } =
    useCourses();
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  useEffect(() => {
    getCourseLearningById(userId);
    /* getCourseLearningById ส่ง sub_lesson_id บทล่าสุดที่เรียนมา หลังจากนั้นนำ sub_lesson_id นั้นไป fetch ขอข้อมูลของ sub_lesson_id นั้น ๆ (ทั้ง sub_lesson และ assignment) */
    // handleSubLesson(lastest_sub_lesson_id)
    /* */
  }, []);

  const handleSubLesson = async (subLessonId) => {
    setIsLoading(true);
    const result = await axios.get(
      `http://localhost:4000/courses/${course.course_id}/learning/${subLessonId}?byUser=${userId}`
    );
    setUserAssignment({
      assignment_status: result.data.data.assignment_status,
      assignments: result.data.data.assignments,
    });
    setSubLessonData({
      sub_lesson_id: result.data.data.sub_lesson_id,
      sub_lesson_name: result.data.data.sub_lesson_name,
      video_directory: result.data.data.video_directory,
    });
    setIsLoading(false);
  };

  const handleAcceptAssignment = async (subLessonId) => {
    setIsLoading(true);
    await axios.post(
      `http://localhost:4000/courses/${course.course_id}/learning/${subLessonId}?byUser=${userId}`,
      { action: "accepted" }
    );
    handleSubLesson(subLessonId);
  };

  const handleVideoEnded = async (subLessonId) => {
    await axios.post(
      `http://localhost:4000/courses/${course.course_id}/learning/${subLessonId}?byUser=${userId}`,
      { action: "watched" }
    );
    await getCourseLearningById(userId);
  };

  const handleSaveDraft = async (assignmentId) => {
    const body = { answer: answer[assignmentId] };
    await axios.put(
      `http://localhost:4000/homework/save/${assignmentId}?userId=${userId}`,
      body
    );
  };

  const handleSubmit = async (assignmentId) => {
    const body = { answer: answer[assignmentId] };
    await axios.put(
      `http://localhost:4000/homework/submit/${assignmentId}?userId=${userId}`,
      body
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
          height="1035px"
          shadow="shadow1"
          mr="25px"
          pl="24px"
          overflowY="auto"
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
          <Box>
            <Progress
              mt="8px"
              height="10px"
              width="309px"
              value={course.percentProgress}
              sx={{
                ".css-1jrtelv": {
                  background:
                    "linear-gradient(109.54deg, #95BEFF 18.21%, #0040E6 95.27%)",
                  borderRadius: "full",
                },
              }}
            />
          </Box>
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

        <Skeleton isLoaded={!isLoading}>
          <Flex
            flexDirection="column"
            alignItems="start"
            width="770px"
            height="1035px"
            overflowY="auto"
          >
            <Heading mb="33px" variant="headline2">
              {subLessonData.sub_lesson_name}
            </Heading>
            <AspectRatio w="739px" ratio={16 / 9} mb="80px">
              <video
                controls
                onEnded={() => handleVideoEnded(subLessonData.sub_lesson_id)}
              >
                <source
                  // src={subLessonData.video_directory}
                  src="https://res.cloudinary.com/dxk5mdqoz/video/upload/v1668525048/Countdown_amqcom.mp4"
                  type="video/mp4"
                />
              </video>
            </AspectRatio>
            {Object.keys(userAssignment).length ===
            0 ? null : !/^accepted/i.test(userAssignment.assignment_status) ? (
              <Flex
                bg="blue.100"
                width="739px"
                flexDirection="column"
                alignItems="start"
                pl="24px"
                borderRadius="8px"
              >
                <Text variant="body1" mt="25px">
                  Assignment
                </Text>
                <Text variant="body2" mt="25px">
                  There are {Object.keys(userAssignment.assignments).length}{" "}
                  assignments in this sub lesson.
                </Text>
                <Flex
                  direction="rows"
                  justify="space-between"
                  width="691px"
                  my="25px"
                >
                  <Button
                    height="60px"
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Accept Assignment
                  </Button>
                  <Text color="gray.700" alignSelf="end">
                    After accepted the assignment, you need to complete within
                    10 days
                  </Text>
                </Flex>
              </Flex>
            ) : userAssignment.assignments === null ? (
              <Text variant="body2" as="i">
                No assignment in this sub lesson
              </Text>
            ) : (
              Object.keys(userAssignment.assignments).map(
                (assignmentId, key) => {
                  return (
                    <Flex
                      bg="blue.100"
                      width="739px"
                      flexDirection="column"
                      alignItems="start"
                      pl="24px"
                      mb="15px"
                      borderRadius="8px"
                      key={key}
                    >
                      <Flex
                        flexDirection="row"
                        alignItems="start"
                        mt="24px"
                        width="691px"
                      >
                        <Text variant="body1">Assignment</Text>
                        <Spacer />
                        <Badge
                          variant={
                            userAssignment.assignments[assignmentId].status
                          }
                        >
                          {userAssignment.assignments[assignmentId].status}
                        </Badge>
                      </Flex>
                      <Text variant="body2" mt="25px">
                        {userAssignment.assignments[assignmentId].detail}
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
                        value={answer[assignmentId]}
                        onChange={(e) =>
                          setAnswer({
                            ...answer,
                            [assignmentId]: e.target.value,
                          })
                        }
                      />
                      <Flex
                        flexDirection="row"
                        alignItems="start"
                        justifyContent="center"
                        width="691px"
                        mt="25px"
                        mb="24px"
                      >
                        <Button
                          height="60px"
                          onClick={() => {
                            handleSubmit(assignmentId);
                          }}
                        >
                          Send Assignment
                        </Button>
                        <Button
                          variant="save draft"
                          ml="20px"
                          height="60px"
                          onClick={() => {
                            handleSaveDraft(assignmentId);
                          }}
                        >
                          Save Draft
                        </Button>
                        <Spacer />
                        <Text pt="20px" color="gray.700">
                          Submit within{" "}
                          {userAssignment.assignments[assignmentId].duration}{" "}
                          days
                        </Text>
                      </Flex>
                    </Flex>
                  );
                }
              )
            )}
          </Flex>
        </Skeleton>
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
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="24px">
          <ModalHeader borderRadius="24px 24px 0px 0px">
            <Text variant="body1" color="black">
              Confirmation
            </Text>
          </ModalHeader>
          <Divider sx={{ borderColor: "gray.300" }} />
          <ModalCloseButton color="gray.500" />
          <ModalBody p="24px 50px 24px 24px" color="black">
            <Text variant="body2" color="gray.700" as="span">
              Do you want to accept the assignment
            </Text>
            <Box mt="24px" width="600px">
              <Button variant="secondary" onClick={onClose}>
                No, I don't
              </Button>
              <Button
                ml="16px"
                isLoading={isLoading}
                variant="primary"
                onClick={() => {
                  onClose();
                  handleAcceptAssignment(subLessonData.sub_lesson_id);
                }}
              >
                Yes, I want to accept
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LearningPage;
