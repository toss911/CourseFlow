import {
  Box,
  Flex,
  Stack,
  Input,
  Text,
  Container,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";

const AdminAddCoursesPage = () => {
  return (
    <>
      <Flex>
        <Sidebar />
        <Flex flexDirection="column" w="vw" backgroundColor="gray.100">
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
          </Box>
          {/* Lesson Section */}
          <Flex flexDirection="column" mt="29px" ml="39px">
            <Flex gap="16px" alignItems="center">
              <Heading variant="headline3" w="933.5px">
                Lesson
              </Heading>
              <Button variant="primary">+ Add Lesson</Button>
            </Flex>

            <TableContainer borderRadius="8px" w="1120px" mt="43px" mb="58px">
              <Table variant="simple" backgroundColor="white">
                <Thead backgroundColor="gray.300">
                  <Tr>
                    <Th></Th>
                    <Th></Th>
                    <Th>
                      <Text
                        variant="body3"
                        textTransform="capitalize"
                        textColor="gray.800"
                        w="468px"
                      >
                        Lesson name
                      </Text>
                    </Th>
                    <Th>
                      <Text
                        variant="body3"
                        textTransform="capitalize"
                        textColor="gray.800"
                        w="300px"
                      >
                        Sub-lesson
                      </Text>
                    </Th>
                    <Th>
                      <Text
                        variant="body3"
                        textTransform="capitalize"
                        textColor="gray.800"
                      >
                        Action
                      </Text>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Image
                        src="../../../assets/admin-page/drag.svg"
                        alt="drag"
                      ></Image>
                    </Td>
                    <Td>1</Td>
                    <Td>Blah blah blah</Td>
                    <Td>Blah blah blah</Td>
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
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          {/* End of Lesson Section */}
        </Flex>
      </Flex>
    </>
  );
};

export default AdminAddCoursesPage;
