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

const AdminAddCoursesPage = () => {
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
