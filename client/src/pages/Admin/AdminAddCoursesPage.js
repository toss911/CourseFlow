import { Box, Flex, Stack, Input, Text, Container } from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";

const AdminAddCoursesPage = () => {
  return (
    <>
      <Flex>
        <Sidebar />
        <Flex flexDirection="column" w="vw">
          <AdminNavbarAdd
            heading="Add Course"
            action="Cancel"
            action2="Create"
          />
          <Box
            alignItems="center"
            m="40px 40px 40px 40px"
            backgroundColor="gray.100"
            px="100px"
            py="40px"
            h="vh"
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
                  <Text>Course summary</Text>
                  <Input placeholder="" h="72px" w="920px" />
                </Box>
                <Box>
                  <Text>Course detail</Text>
                  <Input placeholder="" h="192px" w="920px" />
                </Box>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminAddCoursesPage;
