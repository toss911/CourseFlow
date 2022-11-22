import {
  Box,
  Flex,
  Stack,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import LessonTable from "../../components/LessonsTable";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";
import axios from "axios";

// Steps:
// 1. Check if the user (admin) added at least one lesson and one sub-lesson:
// >> If YES, 1. Send POST request to create a new course. 
//            2. FE shows pop-up modal 'Course created successfully', and 
//            3. Redirect user to admin-view-courses page.  
// >> If NO,  1. Jump to lesson table section
//            2. Display message 'Must add at least one lesson and one sub-lesson to continue'

const AdminAddCoursesPage = () => {

  let courseData = [];

  const addCourse = async () => {
    const result = await axios.post("", courseData)
  };

  return (
    <>
      <Flex>
        <Sidebar />
        <Flex flexDirection="column" w="vw" >
          <AdminNavbarAdd
            heading="Add Course"
            action="Cancel"
            action2="Create"
          />
          <Box backgroundColor="gray.100">
            <Box
              m="40px 40px 40px 40px"
              px="100px"
              pb="60px"
              pt="40px"
              h="vh"
              bg="white"
              borderRadius="16px"
            >
              <Flex>
                <Stack
                  spacing="28px"
                  flexDirection="row"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  <Box>
                    <Text variant="body2">Course name *</Text>
                    <Input placeholder="" size="lg" w="920px" />
                  </Box>

                  <Flex justifyContent="space-between" w="920px">
                    <Box>
                      <Text variant="body2">Price *</Text>
                      <Input placeholder="" size="lg" w="420px" />
                    </Box>
                    <Box>
                      <Text variant="body2">Total learning time *</Text>
                      <Input placeholder="" size="lg" w="420px" />
                    </Box>
                  </Flex>
                  <Box>
                    <Text variant="body2">Course summary</Text>
                    <Input placeholder="" h="72px" w="920px" />
                  </Box>
                  <Box>
                    <Text variant="body2">Course detail</Text>
                    <Input placeholder="" h="192px" w="920px" />
                  </Box>
                </Stack>
              </Flex>
            </Box>
            <LessonTable/>
          </Box>
          
        </Flex>
      </Flex>
    </>
  );
};

export default AdminAddCoursesPage;
