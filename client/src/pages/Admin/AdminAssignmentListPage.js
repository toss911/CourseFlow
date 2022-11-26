import { Sidebar } from "../../components/SidebarAdmin";
import {
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
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authentication";
import AdminNavbar from "../../components/AdminNavbar.js";

function AdminAssignmentList() {
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  const [adminAssignment, setAdminAssignment] = useState();
  const [isLoading, setIsLoadeing] = useState(true);
  const navigate = useNavigate();
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
    getAdminAssignment("");
  }, []);

  const getAdminAssignment = async (searchText) => {
    setIsLoadeing(true);
    const query = new URLSearchParams();
    query.append("searchText", searchText);
    query.append("adminId", adminId);
    const results = await axios.get(
      `http://localhost:4000/assignment/admin?${query.toString()}`
    );
    setAdminAssignment(results.data.data);
    setIsLoadeing(false);
  };

  const handleSearch = async (searchText) => {
    await getAdminAssignment(searchText);
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
          handleSearch={handleSearch}
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
                          if (/assignment_id/i.test(assignmentKey)) {
                            return;
                          }
                          return (
                            <Td
                              maxW="200px"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              p="32px 16px"
                              color="black"
                              fontSize="15px"
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
                              cursor="pointer"
                            />
                            <Image
                              src="../../../assets/admin-page/edit.svg"
                              alt="edit"
                              cursor="pointer"
                              onClick={() =>
                                navigate(`./edit/${assignment.assignment_id}`)
                              }
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
