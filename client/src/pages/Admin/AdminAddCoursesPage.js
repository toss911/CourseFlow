import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";

const AdminAddCoursesPage = () => {
  return (
    <>
      <Flex>
        <Sidebar />
        <Box w="100vw" bg="red.100">
          <AdminNavbarAdd heading="Add Course" action="Create" />
        </Box>
      </Flex>
    </>
  );
};

export default AdminAddCoursesPage;
