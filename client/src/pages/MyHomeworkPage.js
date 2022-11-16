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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authentication.js";
import axios from "axios";

function MyHomework() {
  // *- States and variables -* //
  const [homework, setHomework] = useState([{}]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [overdueAssignments, setOverdueAssignments] = useState([]);
  const [inProgressAssignments, setInProgressAssignments] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;

  // *- Get homework details function-* //
  const getHomeworkDetails = async () => {
    const results = await axios.get(`http://localhost:4000/homework/${userId}`);
    setHomework(results.data.data);
    // *- Categorize homework -* //
    for (let hw of results.data.data) {
      if (hw.status == "submitted") {
        setSubmittedAssignments([...submittedAssignments, hw]);
      } else if (hw.status == "overdue") {
        setOverdueAssignments([...overdueAssignments, hw]);
      } else if (hw.status == "in progress") {
        setInProgressAssignments([...inProgressAssignments, hw]);
      } else {
        setPendingAssignments([...pendingAssignments, hw]);
      }
    }
  };

  // *- Submit homework function-* //
  const submitHomework = async (assignmentId, answer) => {
    const result = await axios.put(
      `http://localhost:4000/homework/${assignmentId}?userId=${userId}`,
      answer
    );
  };

  useEffect(() => {
    getHomeworkDetails();
  }, []);

  return (
    <Box>
      <Navbar />
      <Flex flexDirection="column" h="1560px" mb="345px">
        <Flex
          mt="100px"
          w="1418px"
          h="190px"
          ml="43px"
          justifyContent="center"
          backgroundImage="url('/assets/myhomework-page/background.png')"
        >
          <Flex flexDirection="column" alignItems="center" h="145px">
            <Heading variant="headline2">My Homework</Heading>
            {/* Don't forget to change the color of active tabs to black */}
            <Tabs w="470px" h="40px" mt="60px" gap="16px" textColor="gray.600">
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
                      h="1560px"
                      mb="145px"
                      overflowY="scroll"
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
                          />
                        );
                      })}
                    </Flex>
                  </Center>
                </TabPanel>
                <TabPanel>
                <Center border="1px">
                    <Flex
                      flexDirection="column"
                      alignItems="center"
                      w="1120px"
                      h="1560px"
                      mb="145px"
                      border="1px"
                
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
                      h="1560px"
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
                      h="1560px"
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
                      h="1560px"
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
      <Footer />
    </Box>
  );
}

export default MyHomework;
