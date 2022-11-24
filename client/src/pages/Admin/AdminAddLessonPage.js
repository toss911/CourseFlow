import React, { useState } from "react";
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
import { useAdmin } from "../../contexts/admin.js";
let action;

function AdminAddLesson() {
  // * ทำ context API เก็บ data
  // todo2 get data form in state lesson-name,sub-lesson-name,seq.,video_directory
  // todo3 add effect when press add sub-lesson button
  // todo4 add delete button
  // todo5 drag and drop
  const { addLesson, setAddLesson } = useAdmin();
  const [video, setVideo] = useState();

  const toast = useToast();

  const handleVideoChange = (event) => {
    const currentFile = event.target.files[0];
    if (currentFile) {
      if (/video/gi.test(currentFile.type)) {
        action = "change";
        setVideo(URL.createObjectURL(currentFile));
      } else {
        return toast({
          title: "File type must be .mp4 only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };
  let handleSubmit = (event) => {
    //event.preventDefault();
    //setAddLesson([...addLesson, dataLesson]);
    console.log(event);
  };
  let handleChange = (e) => {
    console.log("testChange");
  };
  return (
    <>
      {/* ------------- Wrap all ------------------ */}
      <Flex flexDirection="row" alignItems="start" bgColor="gray.100">
        <Sidebar />
        <Flex flexDirection="column" w="100vw">
          {/* -------------Navbar add-lesson -----------------*/}
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              lesson_name: "",
              sub_lesson_name: "",
              video_directory: "",
            }}
          >
            {(props) => (
              <Form>
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
                          'Service Design Essentials'
                        </Text>
                      </Flex>
                      <Heading variant="headline3" w="796px">
                        Add Lesson
                      </Heading>
                    </Flex>
                  </Flex>

                  <Flex gap="16px" alignItems="start">
                    <Button
                      w="119px"
                      h="60px"
                      variant="secondary"
                      shadow="shadow1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      w="117px"
                      h="60px"
                      shadow="shadow1"
                      mr="40px"
                    >
                      Create
                    </Button>
                  </Flex>
                </Flex>
                {/* -------------Form add-lesson -----------------*/}
                <Flex
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  w="1120px"
                  ml="40px"
                  mt="40px"
                  borderRadius="16px"
                  borderColor="gray.200"
                  borderWidth="1px"
                  bgColor="white"
                >
                  <Flex>
                    <Field name="lesson_name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.lesson_name && form.touched.lesson_name
                          }
                          isRequired
                        >
                          <FormLabel mt="40px" fontSize="16px" fontWeight="400">
                            Lesson name
                          </FormLabel>
                          <Input type="text" w="920px" h="48px" {...field} />
                          <Box
                            mt="40px"
                            w="920px"
                            borderBottom="1px"
                            borderColor="gray.400"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Text
                      mt="40px"
                      fontSize="20px"
                      fontWeight="600"
                      color="gray.700"
                    >
                      Sub-Lesson
                    </Text>
                    {/* ! --------------- Add Form START----------------  */}
                    <Flex
                      flexDirection="column"
                      alignItems="start"
                      justifyContent="center"
                      mt="40px"
                      pl="66px"
                      pb="24px"
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
                      <Field name="sub_lesson_name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.sub_lesson_name &&
                              form.touched.sub_lesson_name
                            }
                            isRequired
                          >
                            <FormLabel
                              fontSize="16px"
                              fontWeight="400"
                              mt="24px"
                            >
                              Sub-lesson name
                            </FormLabel>
                            <DragHandleIcon
                              left="-45px"
                              top="60px"
                              position="absolute"
                              color="gray.500"
                              fontSize="16px"
                            />
                            <Input type="text" w="530px" h="48px" {...field} />
                          </FormControl>
                        )}
                      </Field>
                      <Text fontSize="16px" fontWeight="400" mt="24px" mb="8px">
                        Video
                        <Text as="span" color="#E53E3E">
                          &nbsp;*
                        </Text>
                      </Text>
                      {video ? (
                        <Flex w="100%" h="100%" position="relative" mb="24px">
                          <iframe w="100%" src={video} fit="contain" />
                          <Flex
                            w="32px"
                            h="32px"
                            borderRadius="full"
                            position="absolute"
                            top="5%"
                            right="65.5%"
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
                            w="160px"
                            h="160px"
                            direction="column"
                            justify="center"
                            align="center"
                            color="blue.400"
                            cursor="pointer"
                            bgColor="gray.200"
                            borderRadius="8px"
                          >
                            <Text fontSize="36px" fontWeight="200">
                              +
                            </Text>
                            <Text fontSize="14px" fontWeight="500">
                              Upload Video
                            </Text>
                          </Flex>
                        </label>
                      )}
                    </Flex>
                    {/* ! --------------- Add Form END----------------  */}
                    <Button
                      mt="24px"
                      mb="60px"
                      w="208px"
                      h="60px"
                      variant="secondary"
                      shadow="shadow1"
                      onClick={() => {}}
                    >
                      + Add Sub-lesson
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </>
  );
}

export default AdminAddLesson;
