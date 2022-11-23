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
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authentication";

function AdminAssignmentList() {
  // const adminId = 1
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  const [adminAssignment, setAdminAssignment] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    const getCourses = setTimeout(() => {
      getAdminAssignment(searchText);
    }, 1000);

    return () => clearTimeout(getCourses);
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

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
    console.log(contextAdminState);
  };
  return (
    <Flex backgroundColor="gray.100" >
      <Sidebar />
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <Flex
            w="100vw"
            h="92px"
            border="1px"
            borderColor="gray.400"
            alignItems="center"
            justifyContent="space-between"
            bg='white'
          >
            <Heading variant="headline3" ml="40px" w="50%">
              Assignment
            </Heading>
            <Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Image
                      src="../../assets/admin-page/search.svg"
                      alt="search"
                    />
                  }
                />
                <Input
                  pl="40px"
                  w="320px"
                  type="text"
                  placeholder="Search..."
                  onChange={handleTextChange}
                />
              </InputGroup>
            </Flex>
            <Button w="209px" h="60px" mr="15%">
              + Add Assignment
            </Button>
          </Flex>
        </Flex>
          <Flex >
          <TableContainer
            borderRadius="8px"
            mt="48px"
            ml="48px"
            w='80vw'
            h='80vh'
            overflowY="scroll"
          >
            <Table variant="simple" backgroundColor="white">
              <Thead backgroundColor="gray.300" h="41px" 
              sx={{ position: '-webkit-sticky', position: 'sticky', top: '0', }}>
                <Tr>
                  <Th></Th>
                  {columnNames.map((columnName, key) => {
                    return (
                      <Th key={key}>
                        <Text
                          variant="body3"
                          textTransform="capitalize"
                          textColor="gray.800"
                        >
                          {columnName}
                        </Text>
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                <Tr hidden={adminAssignment.length > 0} >
                  <Td colSpan="7">
                    <Text textAlign="center">Not Found !!</Text>
                  </Td>
                </Tr>
                {adminAssignment.map((assignment, key) => {
                  return (
                    <Tr key={key}>
                      <Td>{key + 1}</Td>
                      <Td>
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          maxWidth="170px"
                        >
                          {assignment.detail}
                        </Text>
                      </Td>
                      <Td>
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          maxWidth="176px"
                        >
                          {assignment.course_name}
                        </Text>
                      </Td>
                      <Td>
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          maxWidth="92px"
                        >
                          {assignment.lesson_name}
                        </Text>
                      </Td>
                      <Td>
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          maxWidth="173px"
                        >
                          {assignment.sub_lesson_name}
                        </Text>
                      </Td>
                      <Td>
                        <Text>{assignment.created_date}</Text>
                      </Td>
                      <Td>
                        <Text>{assignment.updated_date}</Text>
                      </Td>
                      <Td>
                        <Flex gap="20px" w="120px">
                          <Image
                            src="../../../assets/admin-page/bin.svg"
                            alt="bin"
                          ></Image>
                          <Image
                            src="../../../assets/admin-page/edit.svg"
                            alt="edit"
                          ></Image>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AdminAssignmentList;
