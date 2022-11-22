import {
  Box,
  Flex,
  Stack,
  Input,
  Text,
  Container,
  Image,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import LessonTable from "../../components/LessonsTable";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";
let action;

const AdminAddCoursesPage = () => {
  const toast = useToast();
  const handleFileChange = (event) => {
    const currentFile = event.target.files[0];
    if (currentFile) {
      if (/jpeg|png/gi.test(currentFile.type)) {
        if (currentFile.size <= 2e6) {
          action = "change";
        } else {
          return toast({
            title: "File size must be less than 2MB!",
            status: "error",
            isClosable: true,
          });
        }
      } else {
        return toast({
          title: "File type must be JPG/PNG only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };
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
          <Box backgroundColor="gray.100">
            <Box
              m="40px 40px 40px 40px"
              px="100px"
              pb="60px"
              pt="40px"
              h="vh"
              bg="white"
              borderRadius="16px"
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
                  <Flex display="column" flexWrap="wrap" w="920px">
                    <Text variant="body2" mt="40px">
                      Cover Image *
                      <label>
                        <Input type="file" hidden onChange={handleFileChange} />
                        <Flex
                          w="240px"
                          h="240px"
                          direction="column"
                          justify="center"
                          align="center"
                          color="blue.400"
                          cursor="pointer"
                          bg="gray.100"
                          mb="40px"
                          mt="8px"
                        >
                          <Text fontSize="36px">+</Text>
                          <Text variant="body2">Upload Image</Text>
                        </Flex>
                      </label>
                    </Text>
                    <Text variant="body2">
                      Video Trailer *
                      <label w="250px">
                        <Input type="file" hidden onChange={handleFileChange} />
                        <Flex
                          w="240px"
                          h="240px"
                          direction="column"
                          justify="center"
                          align="center"
                          color="blue.400"
                          cursor="pointer"
                          bg="gray.100"
                          mb="40px"
                          mt="8px"
                        >
                          <Text fontSize="36px">+</Text>
                          <Text variant="body2">Upload Image</Text>
                        </Flex>
                      </label>
                    </Text>
                    <Text variant="body2">
                      Attach File (Optional)
                      <label w="250px">
                        <Input type="file" hidden onChange={handleFileChange} />
                        <Flex
                          w="160px"
                          h="160px"
                          direction="column"
                          justify="center"
                          align="center"
                          color="blue.400"
                          cursor="pointer"
                          bg="gray.100"
                          mb="40px"
                          mt="8px"
                        >
                          <Text fontSize="36px">+</Text>
                          <Text variant="body2">Upload Image</Text>
                        </Flex>
                      </label>
                    </Text>
                  </Flex>
                </Stack>
              </Flex>
            </Box>
            <LessonTable />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminAddCoursesPage;
