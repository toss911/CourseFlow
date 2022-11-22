import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
let action;

function AdminAddLesson() {
  const [avatar, setAvatar] = useState();
  const [avatarFile, setAvatarFile] = useState();
  const toast = useToast();

  const handleFileChange = (event) => {
    const currentFile = event.target.files[0];
    if (currentFile) {
      if (/jpeg|png/gi.test(currentFile.type)) {
        if (currentFile.size <= 2e6) {
          action = "change";
          setAvatarFile(currentFile);
          setAvatar(URL.createObjectURL(currentFile));
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
      {/* ------------- Wrap all ------------------ */}
      <Flex flexDirection="row" alignItems="start" bgColor="gray.100">
        <Sidebar />
        <Flex flexDirection="column" w="100vw">
          {/* -------------Navbar add-lesson -----------------*/}
          <Flex
            flexDirection="row"
            borderBottom="1px"
            borderColor="gray.400"
            alignItems="center"
            h="92px"
            bgColor="white"
          >
            <Flex flexDirection="row">
              <Image
                src="/assets/admin-lesson-page/arrow.svg"
                arc="arrow"
                ml="44px"
              />
              <Flex
                flexDirection="column"
                alignItems="start"
                justifyContent="start"
                ml="20px"
              >
                <Flex
                  flexDirection="row"
                  alignItems="start"
                  justifyContent="start"
                >
                  <Text variant="body3" color="gray.600">
                    Course
                  </Text>
                  <Text ml="8px" variant="body3" color="black">
                    'Service Design Essentials'Introduction
                  </Text>
                </Flex>
                <Heading variant="headline3" w="796px">
                  Add Lesson
                </Heading>
              </Flex>
            </Flex>
            <Flex gap="16px" alignItems="start">
              <Button w="119px" h="60px" variant="secondary" shadow="shadow1">
                Cancel
              </Button>
              <Button w="117px" h="60px" shadow="shadow1" mr="40px">
                Create
              </Button>
            </Flex>
          </Flex>
          {/* -------------Form add-lesson -----------------*/}
          <Flex
            flexDirection="column"
            alignItems="center"
            w="1120px"
            ml="40px"
            mt="40px"
            borderRadius="16px"
            borderColor="gray.200"
            borderWidth="1px"
            bgColor="white"
          >
            <Formik>
              <Form>
                <FormControl>
                  <FormLabel mt="40px" fontSize="16px" fontWeight="400">
                    Lesson name *
                  </FormLabel>
                  <Input type="text" w="920px" h="48px" />
                  <Box
                    mt="40px"
                    w="920px"
                    borderBottom="1px"
                    borderColor="gray.400"
                  />
                </FormControl>
                <Text
                  mt="40px"
                  fontSize="20px"
                  fontWeight="600"
                  color="gray.700"
                >
                  Sub-Lesson
                </Text>
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  mt="40px"
                  pl="66px"
                  w="920px"
                  bgColor="gray.100"
                  borderRadius="16px"
                  borderColor="gray.300"
                  borderWidth="1px"
                  position="relative"
                >
                  <Text
                    cursor="pointer"
                    color="gray.500"
                    fontWeight="700"
                    fontSize="16px"
                    position="absolute"
                    right="24px"
                    top="28px"
                    zIndex="1"
                  >
                    Delete
                  </Text>
                  <FormControl>
                    <FormLabel fontSize="16px" fontWeight="400" mt="24px">
                      Sub-lesson name *
                    </FormLabel>
                    <DragHandleIcon
                      left="-45px"
                      top="60px"
                      position="absolute"
                      color="gray.500"
                      fontSize="16px"
                    />
                    <Input type="text" w="530px" h="48px" />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="16px" fontWeight="400" mt="24px">
                      Video *
                    </FormLabel>
                    <label>
                      <Input type="file" hidden onChange={handleFileChange} />
                      <Flex
                        w="160px"
                        h="160px"
                        direction="column"
                        justify="center"
                        align="center"
                        color="blue.400"
                        cursor="pointer"
                        bgColor="gray.200"
                        borderRadius="8px"
                        mb="24px"
                      >
                        <Text fontSize="36px" fontWeight="200">
                          +
                        </Text>
                        <Text fontSize="14px" fontWeight="500">
                          Upload Video
                        </Text>
                      </Flex>
                    </label>
                  </FormControl>
                </Flex>
                <Button
                  mt="24px"
                  mb="60px"
                  w="208px"
                  h="60px"
                  variant="secondary"
                  shadow="shadow1"
                >
                  + Add Sub-lesson
                </Button>
              </Form>
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default AdminAddLesson;
