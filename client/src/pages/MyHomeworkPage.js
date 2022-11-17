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
    window.location.reload();
    getHomeworkDetails();
  };

  useEffect(() => {
    getHomeworkDetails();
  }, []);

  console.log(homework);

  return (
    <Stack direction="column">
    <Box>
     
        <Navbar />
        <Box>
          <Flex flexDirection="column">
          <Flex
            mt="100px"
            w="1418px"
            backgroundSize="100%"
            // h="190px"
            backgroundRepeat="no-repeat"
            ml="43px"
            justifyContent="center"
            backgroundImage="url('/assets/myhomework-page/background.png')"
          >
            <Flex flexDirection="column" alignItems="center">
              <Heading variant="headline2">My Homework</Heading>
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
                              saveAnswerDraft={saveAnswerDraft}
                              assignmentId={hw.assignment_id}
                              submittedDate={hw.submitted_date}
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
                        {homework
                          .filter((hw) => {
                            return hw.status == "pending";
                          })
                          .map((hw, key) => {
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
                                submittedDate={hw.submitted_date}
                                saveAnswerDraft={saveAnswerDraft}
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
                        {homework
                          .filter((hw) => {
                            return hw.status == "in progress";
                          })
                          .map((hw, key) => {
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
                                submittedDate={hw.submitted_date}
                                saveAnswerDraft={saveAnswerDraft}
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
                        {homework
                          .filter((hw) => {
                            return hw.status == "submitted";
                          })
                          .map((hw, key) => {
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
                                saveAnswerDraft={saveAnswerDraft}
                                submitHomework={submitHomework}
                                submittedDate={hw.submitted_date}
                          
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
                        {homework
                          .filter((hw) => {
                            return hw.status == "overdue";
                          })
                          .map((hw, key) => {
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
                                submittedDate={hw.submitted_date}
                                saveAnswerDraft={saveAnswerDraft}
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
          
       
    
      <Footer />
      </Flex>
      </Box>
    </Box>
    </Stack>
  );
}

export default MyHomework;
