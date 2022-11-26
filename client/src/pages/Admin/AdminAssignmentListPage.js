import { Sidebar } from "../../components/SidebarAdmin";
import {
  Box,
  Flex,
  Table,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Heading,
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authentication";
import AdminNavbar from "../../components/AdminNavbar.js";

function AdminAssignmentList() {
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  const [searchText, setSearchText] = useState("");
  const [adminAssignment, setAdminAssignment] = useState();
  const [isLoading, setIsLoadeing] = useState(true);
  const columnNames = [
    "Assignment detail",
    "Course",
    "Lesson",
    "Sub-lesson",
    "Created date",
    "Update date",
    "Action",
  ];

  useEffect(() => {
    setIsLoadeing(true);
    const assignmentData = setTimeout(() => {
      getAdminAssignment(searchText);
      setIsLoadeing(false);
    }, 1000);
    return () => clearTimeout(assignmentData);
  }, [searchText]);

  const getAdminAssignment = async () => {
    const query = new URLSearchParams();
    query.append("searchText", searchText);
    query.append("adminId", adminId);
    const results = await axios.get(
      `http://localhost:4000/assignment/admin?${query.toString()}`
    );
    setAdminAssignment(results.data.data);
  };

  return (
    <Flex w="100vw">
      {/* Left Section */}
      <Sidebar selectedTab={2} />
      {/* Right Section */}
      <Flex direction="column" w="100%">
        {/* Right-Top Section */}
        <AdminNavbar
          heading="Assignment"
          action="+ Add Assignment"
          url="add"
          setSearchText={setSearchText}
          searchText={searchText}
        />
        {/* Right-Bottom Section */}
        <Flex
          bg="gray.100"
          w="100%"
          h="100%"
          px="2.5%"
          py="45px"
          align="start"
          justify="center"
        >
          {isLoading || !Boolean(adminAssignment) ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : adminAssignment.length === 0 ? (
            <Text as="i">Assignment not found!</Text>
          ) : (
            <TableContainer
              bg="white"
              borderRadius="8px"
              maxW="80vw"
              maxH="80vh"
              overflowY="auto"
            >
              <Table>
                <Thead bg="gray.300">
                  <Tr>
                    {columnNames.map((columnName, key) => {
                      return (
                        <Th
                          key={key}
                          textTransform="capitalize"
                          color="gray.800"
                          fontSize="14px"
                          fontWeight="400"
                          p="10px 16px"
                        >
                          {columnName}
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {adminAssignment.map((assignment, key) => {
                    return (
                      <Tr key={key}>
                        {Object.keys(assignment).map((assignmentKey, index) => {
                          return (
                            <Td
                              maxW="200px"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              p="32px 16px"
                              color="black"
                              fontSize="16px"
                              key={index}
                            >
                              {assignment[assignmentKey]}
                            </Td>
                          );
                        })}
                        <Td maxW="150px" p="0px">
                          <Flex gap="20%" justify="center">
                            <Image
                              src="../../../assets/admin-page/bin.svg"
                              alt="bin"
                            />
                            <Image
                              src="../../../assets/admin-page/edit.svg"
                              alt="edit"
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AdminAssignmentList;
