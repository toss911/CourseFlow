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
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authentication";

function AdminAssignmentList() {
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  const [adminAssignment, setAdminAssignment] = useState([]);
  const [isLoading, setIsLoadeing] = useState();
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

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
    console.log(contextAdminState);
  };
  return (
    <Flex backgroundColor="gray.100">
      <Sidebar index="1" />
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <Flex
            w="100vw"
            h="92px"
            border="1px"
            borderColor="gray.400"
            alignItems="center"
            justifyContent="flex-start"
            bg="white"
          >
            <Heading variant="headline3" ml="40px" w="559px">
              Assignment
            </Heading>
            <Flex mr="16px" w="360px">
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

        {/* ถ้าวางตรงนี้มันจะกระพริบทั้งหน้า */}
        <Skeleton isLoaded={!isLoading}  startColor='gray.400' endColor='gray.500' >
          <TableContainer
            borderRadius="8px"
            mt="48px"
            ml="48px"
            w="1120px"
            h="80vh"
            overflowY="scroll"
          >
            {/* ถ้าวางตรงนี้มันจะกระพริบทั้งตาราง */}
            
            <Table variant="simple" backgroundColor="white">
              <Thead
                backgroundColor="gray.300"
                h="41px"
                sx={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: "0",
                }}
              >
                <Tr>
                
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
              {/* กระพริบส่วนบอดี้แต่โพสิชั่นแปลกๆ */}
              <Tbody>
              {/* เหมียนกับอีอันบน!!!!!!!! */}
            
                  <Tr hidden={adminAssignment.length > 0 }>
                    <Td colSpan="7">
                      
                      <Text textAlign="center">Not Found !!</Text>

                    </Td>
                  </Tr>
                  {/* ถ้าวางตรงนี้มันจะกระพริบส่วนบอดี้แต่ข้อมูลข้างในจะเรียงแบบพิลึก */}
                  {adminAssignment.map((assignment) => {
                    return (
                     
                      <Tr>
                        <Td w="200px">
                          <Text
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="200px"
                          >
                            {assignment.detail}
                          </Text>
                        </Td>
                        <Td w="200px">
                          <Text
                          
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="200px"
                          >
                            {assignment.course_name}
                          </Text>
                        </Td>
                        <Td w="200px">
                          <Text
                           
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="200px"
                          >
                            {assignment.lesson_name}
                          </Text>
                        </Td>
                        <Td w="200px">
                          <Text
                        
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxWidth="200px"
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
                        <Td w="120px">
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
          </Skeleton>
      </Flex>
    </Flex>
  );
}

export default AdminAssignmentList;
