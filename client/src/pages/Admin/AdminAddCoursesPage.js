import {
  Box,
  Flex,
  Input,
  Text,
  useToast,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import LessonTable from "../../components/LessonsTable";
import AdminNavbarAdd from "../../components/AdminNavbarAdd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authentication";

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
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  let action;

  // this function will be triggered after user clicks on 'create course' button
  const addCourse = async () => {
    const result = await axios.post("", courseData);
  };

  const handleSubmit = () => {
    // check if user has added all info
    if (true) {
      addCourse();
      // pop up modal
      // navigate to view courses page
    } else {
      
    }
  }

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

  // *- input validation -* //
  const validateCourseName = (value) => {
    let error;
    if (!value) {
      error = "Course name cannot be empty";
    } 
    return error;
  };

  const validatePrice = (value) => {
    let error;
    if (!value) {
      error = "Please specify price";
    } else if (!/^(?:[1-9]\d*|\d)$/i.test(value)) {
      error = `Price cannot be below 0`;
    }
    return error;
  };

  const validateLearningTime = (value) => {
    let error;
    if (!value) {
      error = "Please specify learning time";
    } else if (!/^(?:[1-9]\d*|\d)$/i.test(value)) {
      error = `Learning time cannot be less than 0`;
    }
    return error;
  };

  const validateCourseSummary = (value) => {
    let error;
    if (!value) {
      error = "Course summary cannot be empty";
    } 
    return error;
  };

  const validateCourseDetail = (value) => {
    let error;
    if (!value) {
      error = "Course detail cannot be empty";
    } 
    return error;
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
              <Formik
                initialValues={{
                  course_name: "",
                  price: null,
                  total_learning_time: 0,
                  course_summary: "",
                  course_detail: "",
                }}
                enableReinitialize
                // onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <Flex>
                      <Flex
                        className="Input-fields"
                        w="920px"
                        bg="white"
                        flexDirection="column"
                      >
                        {/* Course name field */}
                        <Field name="course_name" validate={validateCourseName}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.course_name &&
                                form.touched.course_name
                              }
                              isRequired
                            >
                              <FormLabel variant="body2" color="black">
                                Course name
                              </FormLabel>
                              <Input
                                type="text"
                                w="920px"
                                h="48px"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.course_name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Flex>
                          {/* Price field */}
                          <Field name="price" validate={validatePrice}>
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.price && form.touched.price
                                }
                                isRequired
                              >
                                <FormLabel
                                  variant="body2"
                                  color="black"
                                  mt="40px"
                                >
                                  Price
                                </FormLabel>
                                <Input
                                  type="number"
                                  min="0"
                                  w="420px"
                                  h="48px"
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.price}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          {/* Total Learning Time field */}
                          <Field name="learning_time" validate={validateLearningTime}>
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.learning_time &&
                                  form.touched.learning_time
                                }
                                isRequired
                              >
                                <FormLabel
                                  variant="body2"
                                  color="black"
                                  mt="40px"
                                >
                                  Learning time
                                </FormLabel>
                                <Input
                                  type="number"
                                  w="420px"
                                  h="48px"
                                  {...field}
                                />
                                <FormErrorMessage>
                                  {form.errors.learning_time}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                        <Field name="course_summary" validate={validateCourseSummary}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.course_summary &&
                                form.touched.course_summary
                              }
                              isRequired
                            >
                              <FormLabel
                                variant="body2"
                                color="black"
                                mt="40px"
                              >
                                Course summary
                              </FormLabel>
                              <Textarea
                                type="text"
                                w="920px"
                                h="72px"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.course_summary}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="course_detail" validate={validateCourseDetail}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.course_detail &&
                                form.touched.course_detail
                              }
                              isRequired
                            >
                              <FormLabel
                                variant="body2"
                                color="black"
                                mt="40px"
                              >
                                Course detail
                              </FormLabel>
                              <Textarea
                                type="text"
                                w="920px"
                                h="192px"
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.course_detail}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        {/* File Uploads */}
                        <Flex display="column" flexWrap="wrap" w="920px">
                          {/* Cover Image Upload */}
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
                                <Image
                                  w="100%"
                                  src={coverImage}
                                  fit="contain"
                                />
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
                          {/* Video Upload */}
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
                          {/* Attach File Upload */}
                          <Text variant="body2">Attach File (Optional)</Text>
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
                              <Text variant="body2">Upload File</Text>
                            </Flex>
                          </label>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
            <LessonTable />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminAddCoursesPage;
