import { Sidebar } from "../../components/SidebarAdmin";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { useState, useEffect } from "react";

function AdminAddLesson() {
  return (
    <Box>
      <Sidebar />
    </Box>
  );
}

export default AdminAddLesson;
