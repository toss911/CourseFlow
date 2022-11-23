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
  Image
} from "@chakra-ui/react";
import AdminNavbar from "../../components/AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminAssignmentList() {
  const adminId = 1
  const [adminAssignment, setAdminAssignment] = useState([]);
  const [searchText, setSearchText] = useState("");
  const columnNames =[
    "Assignment detail",
    "Course",
    "Lesson",
    "Sub-lesson",
    "Created date",
    "Update date",
    "Action"
  ]
  const getAdminAssignment = async () =>{
    const query = new URLSearchParams();
    query.append("searchText", searchText);
    query.append("adminId", adminId);
    const results = await axios.get(
      `http://localhost:4000/assignment/admin?${query.toString()}`
    );
    setAdminAssignment(results.data.data)
  }
  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const getCourses = setTimeout(() => {
      getAdminAssignment(searchText);
    }, 1000);

    return () => clearTimeout(getCourses);
  }, [searchText]);
  return (
    <Flex h='100vh'>
     <Sidebar/>
     <Flex flexDirection='column'>
     <AdminNavbar
            heading="Assignment"
            action="+ Add Assignment"
            handleSearchText={handleTextChange}
            />
      <Box backgroundColor="gray.100" h="100vh">
      <TableContainer borderRadius="8px" mt="48px" ml="48px" w="1120px" h="650px" overflowY="scroll">
      <Table variant='simple' backgroundColor="white" size="md">
    <Thead backgroundColor="gray.300" h="41px">
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
    {adminAssignment.map((assignment,key)=>{
      return (
        <Tr key={key}>
        <Td>{key+1}</Td>
        <Td>
          <Text>
            {assignment.detail}
          </Text>
        </Td>
        <Td>
        <Text>{assignment.course_name}</Text>
        </Td>
        <Td>
        <Text>
          {assignment.lesson_name}
          </Text>
        </Td>
        <Td>
          <Text>{assignment.sub_lesson_name}</Text>
        </Td>
        <Td>
        <Text>
          {assignment.created_date}
          </Text>
          <Text>
          {assignment.updated_date}
          </Text>
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
      )
    })}
    </Tbody>
  </Table>
      </TableContainer>
      </Box>
      </Flex>
    </Flex>
  );
}

export default AdminAssignmentList;
