import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import HomeworkBox from "../components/HomeworkBox";
import {
  Box,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Center,
  Container,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authentication.js";
import axios from "axios";

function MyHomework() {
  // *- States and variables -* //
  const [homework, setHomework] = useState([{}]);
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  // *- Get homework details function-* //
  const getHomeworkDetails = async () => {
    const results = await axios.get(`http://localhost:4000/homework/${userId}`);
    setHomework(results.data.data);
  };

  // *- Submit homework function-* //
  const submitHomework = async (assignmentId, answer) => {
    const result = await axios.put(
      `http://localhost:4000/homework/submit/${assignmentId}?userId=${userId}`,
      answer
    );
    window.location.reload();
    getHomeworkDetails();
  };

  // *- Save answer draft-* //
  const saveAnswerDraft = async (assignmentId, answer) => {
    const result = await axios.put(
      `http://localhost:4000/homework/save/${assignmentId}?userId=${userId}`,
      answer
    );
  };

  useEffect(() => {
    getHomeworkDetails();
  }, []);

  return (
    <Stack direction={"column"}>
      <Box>
        <Navbar />
        <Box>
          <Flex
            flexDirection="column"
            // h="1560px"
          >
            <Flex
              mt="100px"
              w="1418px"
              // h="190px"
              backgroundSize="100%"
              backgroundRepeat="no-repeat"
              ml="43px"
              justifyContent="center"
              backgroundImage="url('/assets/myhomework-page/background.png')"
            >
              <Flex
                flexDirection="column"
                alignItems="center"
                // h="145px"
              >
                <Heading variant="headline2">My Homework</Heading>
                {/* Don't forget to change the color of active tabs to black */}
                <Tabs
                  w="470px"
                  // h="40px"
                  mt="60px"
                  gap="16px"
                  textColor="gray.600"
                  sx={{
                    ".css-1oezttv": {
                      borderColor: "white",
                      color: "#9AA1B9",
                    },
                    ".css-1oezttv[aria-selected=true]": {
                      borderColor: "black",
                      color: "black",
                    },
                  }}
                >
                  <TabList>
                    <Tab>
                      <Text variant="body2">All</Text>
                    </Tab>
                    <Tab>
                      <Text variant="body2">Pending</Text>
                    </Tab>
                    <Tab>
                      <Text variant="body2">In progress</Text>
                    </Tab>
                    <Tab>
                      <Text variant="body2">Submitted</Text>
                    </Tab>
                    <Tab>
                      <Text variant="body2">Overdue</Text>
                    </Tab>
                  </TabList>
                  <TabPanels mt="40px">
                    <TabPanel>
                      <Center>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          w="1120px"
                          // h="1560px"
                          mb="145px"
                        >
                          {homework.map((hw, key) => {
                            return (
                              <HomeworkBox
                                key={key}
                                courseName={hw.course_name}
                                lessonName={hw.lesson_name}
                                subLessonName={hw.sub_lesson_name}
                                status={hw.status}
                                hwDetail={hw.detail}
                                daysUntilDeadline={hw.days_until_deadline}
                                answer={hw.answer}
                                dayOrDays={
                                  hw.days_until_deadline <= 1 ? "day" : "days"
                                }
                                courseId={hw.course_id}
                                submitHomework={submitHomework}
                                assignmentId={hw.assignment_id}
                              />
                            );
                          })}
                        </Flex>
                      </Center>
                    </TabPanel>
                    <TabPanel>
                      <Center>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          w="1120px"
                          // h="1560px"
                          mb="145px"
                        >
                          {pendingAssignments.map((hw, key) => {
                            return (
                              <HomeworkBox
                                key={key}
                                courseName={hw.course_name}
                                lessonName={hw.lesson_name}
                                subLessonName={hw.sub_lesson_name}
                                status={hw.status}
                                hwDetail={hw.detail}
                                daysUntilDeadline={hw.days_until_deadline}
                                answer={hw.answer}
                                dayOrDays={
                                  hw.days_until_deadline <= 1 ? "day" : "days"
                                }
                                assignmentId={hw.assignment_id}
                              />
                            );
                          })}
                        </Flex>
                      </Center>
                    </TabPanel>
                    <TabPanel>
                      <Center>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          w="1120px"
                          // h="1560px"
                          mb="145px"
                        >
                          {inProgressAssignments.map((hw, key) => {
                            return (
                              <HomeworkBox
                                key={key}
                                courseName={hw.course_name}
                                lessonName={hw.lesson_name}
                                subLessonName={hw.sub_lesson_name}
                                status={hw.status}
                                hwDetail={hw.detail}
                                daysUntilDeadline={hw.days_until_deadline}
                                answer={hw.answer}
                                dayOrDays={
                                  hw.days_until_deadline <= 1 ? "day" : "days"
                                }
                                assignmentId={hw.assignment_id}
                              />
                            );
                          })}
                        </Flex>
                      </Center>
                    </TabPanel>
                    <TabPanel>
                      <Center>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          w="1120px"
                          // h="1560px"
                          mb="145px"
                          pl="24px"
                        >
                          {submittedAssignments.map((hw, key) => {
                            return (
                              <HomeworkBox
                                key={key}
                                courseName={hw.course_name}
                                lessonName={hw.lesson_name}
                                subLessonName={hw.sub_lesson_name}
                                status={hw.status}
                                hwDetail={hw.detail}
                                daysUntilDeadline={hw.days_until_deadline}
                                answer={hw.answer}
                                dayOrDays={
                                  hw.days_until_deadline <= 1 ? "day" : "days"
                                }
                              />
                            );
                          })}
                        </Flex>
                      </Center>
                    </TabPanel>
                    <TabPanel>
                      <Center>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          w="1120px"
                          // h="1560px"
                          mb="145px"
                        >
                          {overdueAssignments.map((hw, key) => {
                            return (
                              <HomeworkBox
                                key={key}
                                courseName={hw.course_name}
                                lessonName={hw.lesson_name}
                                subLessonName={hw.sub_lesson_name}
                                status={hw.status}
                                hwDetail={hw.detail}
                                daysUntilDeadline={hw.days_until_deadline}
                                answer={hw.answer}
                                dayOrDays={
                                  hw.days_until_deadline <= 1 ? "day" : "days"
                                }
                                assignmentId={hw.assignment_id}
                              />
                            );
                          })}
                        </Flex>
                      </Center>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </Stack>
  );
}

export default MyHomework;
