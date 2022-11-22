import {
  Box,
  Flex,
  Stack,
  Input,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import LessonTable from "../../components/LessonsTable";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";
import { useState, useEffect } from "react";
import axios from "axios";

// Steps:
// 1. Check if the user (admin) added at least one lesson and one sub-lesson:
// >> If YES, 1. Send POST request to create a new course.
//            2. FE shows pop-up modal 'Course created successfully', and
//            3. Redirect user to admin-view-courses page.
// >> If NO,  1. Jump to lesson table section
//            2. Display message 'Must add at least one lesson and one sub-lesson to continue'

const AdminAddCoursesPage = () => {
  let courseData = [];
  const [coverImage, setCoverImage] = useState();
  const [video, setVideo] = useState();
  const [files, setFiles] = useState();
  const toast = useToast();
  let action;

  // this function will be triggered after user clicks on 'create course' button
  const addCourse = async () => {
    const result = await axios.post("", courseData);
  };

  const handleVideoChange = (event) => {
    const currentFile = event.target.files[0];
    if (currentFile) {
      if (/video/gi.test(currentFile.type)) {
        if (currentFile.size <= 1.2e9) {
          action = "change";
          setVideo(URL.createObjectURL(currentFile));
        } else {
          return toast({
            title: "Video size must be less than 1.2GB!",
            status: "error",
            isClosable: true,
          });
        }
      } else {
        return toast({
          title: "File type must be .mp4 only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  const handleCoverImageChange = (event) => {
    const currentFile = event.target.files[0];

    if (currentFile) {
      if (/jpeg|png/gi.test(currentFile.type)) {
        if (currentFile.size <= 2e6) {
          action = "change";
          setCoverImage(URL.createObjectURL(currentFile));
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
                    <Text variant="body2" mt="40px" w="fit-content">
                      Cover Image *
                    </Text>
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
                      {coverImage ? (
                        <Flex w="100%" h="100%" position="relative">
                          <Image w="100%" src={coverImage} fit="contain" />
                          <Flex
                            w="32px"
                            h="32px"
                            borderRadius="full"
                            position="absolute"
                            top="-18px"
                            right="-18px"
                            bg="purple"
                            justify="center"
                            align="center"
                            sx={{
                              "&:hover": {
                                opacity: 0.5,
                              },
                            }}
                            cursor="pointer"
                            onClick={() => {
                              setCoverImage();
                              action = "delete";
                            }}
                          >
                            <Image
                              src="/assets/misc/close-button.svg"
                              alt="close button"
                              w="11px"
                              h="11px"
                            />
                          </Flex>
                        </Flex>
                      ) : (
                        <label>
                          <Input
                            type="file"
                            hidden
                            onChange={handleCoverImageChange}
                          />
                          <Flex
                            w="358px"
                            h="358px"
                            direction="column"
                            justify="center"
                            align="center"
                            color="blue.400"
                            cursor="pointer"
                          >
                            <Text fontSize="36px">+</Text>
                            <Text variant="body2">Upload Image</Text>
                          </Flex>
                        </label>
                      )}
                    </Flex>

                    <Text variant="body2">Video Trailer *</Text>
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
                      {video ? (
                        <Flex w="100%" h="100%" position="relative">
                          <iframe w="100%" src={video} fit="contain" />
                          <Flex
                            w="32px"
                            h="32px"
                            borderRadius="full"
                            position="absolute"
                            top="-18px"
                            right="-18px"
                            bg="purple"
                            justify="center"
                            align="center"
                            sx={{
                              "&:hover": {
                                opacity: 0.5,
                              },
                            }}
                            cursor="pointer"
                            onClick={() => {
                              setVideo();
                              action = "delete";
                            }}
                          >
                            <Image
                              src="/assets/misc/close-button.svg"
                              alt="close button"
                              w="11px"
                              h="11px"
                            />
                          </Flex>
                        </Flex>
                      ) : (
                        <label>
                          <Input
                            type="file"
                            hidden
                            onChange={handleVideoChange}
                          />
                          <Flex
                            w="358px"
                            h="358px"
                            direction="column"
                            justify="center"
                            align="center"
                            color="blue.400"
                            cursor="pointer"
                          >
                            <Text fontSize="36px">+</Text>
                            <Text variant="body2">Upload Video</Text>
                          </Flex>
                        </label>
                      )}
                    </Flex>

                    <Text variant="body2">
                      Attach File (Optional)
                      <label w="250px">
                        <Input type="file" hidden />
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
