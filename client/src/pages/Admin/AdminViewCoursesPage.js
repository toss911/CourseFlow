import { Sidebar } from "../../components/SidebarAdmin";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
} from "@chakra-ui/react";
import AdminNavbar from "../../components/AdminNavbar";
import axios from "axios";
import { useState, useEffect } from "react";

function AdminViewCourses() {
  const adminId = 3; // Get the ID from the context
  const [adminCourses, setAdminCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const columnNames = [
    "Image",
    "Course name",
    "Lesson",
    "Price",
    "Created date",
    "Updated date",
    "Action",
  ];

  const getAdminCourses = async () => {
    const query = new URLSearchParams();
    query.append("searchText", searchText);
    query.append("adminId", adminId);
    const results = await axios.get(
      `http://localhost:4000/courses/admin?${query.toString()}`
    );
    setAdminCourses(results.data.data);
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const getCourses = setTimeout(() => {
      getAdminCourses(searchText);
    }, 1000);

    return () => clearTimeout(getCourses);
  }, [searchText]);

  return (
    <Box>
      <Flex>
        <Sidebar />
        <Flex flexDirection="column">
          <AdminNavbar
            heading="Courses"
            action="+ Add Course"
            handleSearchText={handleTextChange}
          />
          <Box backgroundColor="gray.100" h="100vh">
            <TableContainer borderRadius="8px" mt="48px" ml="48px" w="1120px">
              <Table variant="simple" backgroundColor="white">
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
                  {adminCourses.map((course, key) => {
                    return (
                      <Tr key={key}>
                        <Td>{key + 1}</Td>
                        <Td>
                          <Image src={course.cover_image_directory} />
                        </Td>
                        <Td>
                          <Text variant="body2" textColor="black">
                            {course.course_name}
                          </Text>
                        </Td>
                        <Td>
                          <Text variant="body2" textColor="black">
                            {course.lessons_count} Lessons
                          </Text>
                        </Td>
                        <Td>
                          <Text variant="body2" textColor="black">
                            {course.price.toLocaleString("en", {
                              minimumFractionDigits: 2,
                            })}
                          </Text>
                        </Td>
                        <Td>
                          <Text variant="body2" textColor="black">
                            {course.created_date}
                          </Text>
                        </Td>
                        <Td>
                          <Text variant="body2" textColor="black">
                            {course.updated_date}
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
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default AdminViewCourses;
