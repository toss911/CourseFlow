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
  FormHelperText,
  Textarea,
  Select,
  Button,
  Heading,
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

const AdminAddCourses = () => {
  let courseData = [];
  const toast = useToast();
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  let action;

  // this function will be triggered after user clicks on 'create course' button
  const addCourse = async () => {
    const result = await axios.post("", courseData);
  };

  const handleSubmit = (values) => {
    console.log("values: ", values);
    // check if user has added all info
    // if (true) {
    //   addCourse();
    //   // pop up modal
    //   // navigate to view courses page
    // } else {
    // }
    return;
  };

  const handleVideoChange = (currentFile, setFieldValue) => {
    if (currentFile) {
      if (/video/gi.test(currentFile.type)) {
        if (currentFile.size <= 1.2e9) {
          setFieldValue("video_trailer", currentFile);
        } else {
          return toast({
            title: "Video size must be less than 1.2GB!",
            status: "error",
            isClosable: true,
          });
        }
      } else {
        return toast({
          title: "File type must be video only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  const handleCoverImageChange = (currentFile, setFieldValue) => {
    if (currentFile) {
      if (/jpeg|png/gi.test(currentFile.type)) {
        if (currentFile.size <= 2e6) {
          setFieldValue("cover_image", currentFile);
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
      error = "Please specify course name";
    }
    return error;
  };

  const validatePrice = (value) => {
    let error;
    if (!value) {
      error = "Please specify price";
    } else if (value <= 0) {
      error = "Price can not be less than 0";
    }
    return error;
  };

  const validateLearningTime = (value) => {
    let error;
    if (!value) {
      error = "Please specify learning time ";
    } else if (value <= 0) {
      error = `Learning time can not be less than 0`;
    } else if (value % 1 !== 0) {
      error = "Learning time can not be decimal";
    }
    return error;
  };

  const validateCourseSummary = (value) => {
    let error;
    if (!value) {
      error = "Please specify course summary";
    } else if (value.length > 120) {
      error = "Character length must not be more than 120 characters";
    }
    return error;
  };

  const validateCourseDetail = (value) => {
    let error;
    if (!value) {
      error = "Please specify course detail";
    }
    return error;
  };

  const validateCategory = (value) => {
    let error;
    if (!value) {
      error = "Please specify course category";
    }
    return error;
  };

  const validateCoverImage = (value) => {
    let error;
    if (!value) {
      error = "Please upload course cover image";
    }
    return error;
  };

  const validateVideoTrailer = (value) => {
    let error;
    if (!value) {
      error = "Please upload course video trailer";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        course_name: "",
        price: "",
        learning_time: "",
        course_summary: "",
        course_detail: "",
        category: "",
        cover_image: null,
        video_trailer: null,
        files: [],
      }}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <Form>
            <Flex w="100vw">
              {/* Left Section */}
              <Sidebar />
              {/* Right Section */}
              <Flex direction="column" w="100%" h="100vh" overflowY="auto">
                {/* Right-Top Section */}
                <Flex
                  w="100%"
                  bg="white"
                  justify="space-between"
                  align="center"
                  px="40px"
                  py="16px"
                  borderBottom="1px"
                  borderColor="gray.400"
                  position="sticky"
                  top="0"
                  zIndex="sticky"
                >
                  <Heading variant="headline3">Add Course</Heading>
                  <Flex>
                    <Button
                      variant="secondary"
                      mr="16px"
                      onClick={() => props.resetForm()}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Create
                    </Button>
                  </Flex>
                </Flex>
                {/* Right-Bottom Section */}
                <Box backgroundColor="gray.100">
                  <Flex
                    m="40px"
                    px="100px"
                    pb="60px"
                    pt="40px"
                    bg="white"
                    minW="fit-content"
                    borderRadius="16px"
                  >
                    <Flex
                      className="input-fields"
                      w="920px"
                      gap="40px"
                      bg="white"
                      direction="column"
                    >
                      {/* Course name field */}
                      <Field name="course_name" validate={validateCourseName}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.course_name &&
                              form.touched.course_name
                            }
                          >
                            <FormLabel variant="body2" color="black">
                              Course name{" "}
                              <Text variant="body2" as="span" color="red">
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="text"
                              w="100%"
                              h="48px"
                              {...field}
                              placeholder="Enter course name"
                            />
                            <FormErrorMessage>
                              {form.errors.course_name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex gap="40px">
                        {/* Price field */}
                        <Field name="price" validate={validatePrice}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.price && form.touched.price
                              }
                            >
                              <FormLabel variant="body2" color="black">
                                Price (Baht){" "}
                                <Text variant="body2" as="span" color="red">
                                  *
                                </Text>
                              </FormLabel>
                              <Input
                                type="number"
                                w="100%"
                                h="48px"
                                {...field}
                                placeholder="Enter course price"
                              />
                              <FormErrorMessage>
                                {form.errors.price}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        {/* Total Learning Time field */}
                        <Field
                          name="learning_time"
                          validate={validateLearningTime}
                        >
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.learning_time &&
                                form.touched.learning_time
                              }
                            >
                              <FormLabel variant="body2" color="black">
                                Learning time (hours){" "}
                                <Text variant="body2" as="span" color="red">
                                  *
                                </Text>
                              </FormLabel>
                              <Input
                                type="number"
                                w="100%"
                                h="48px"
                                {...field}
                                placeholder="Enter course learning time"
                              />
                              <FormErrorMessage>
                                {form.errors.learning_time}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      {/* Course Summary field */}
                      <Field
                        name="course_summary"
                        validate={validateCourseSummary}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.course_summary &&
                              form.touched.course_summary
                            }
                          >
                            <FormLabel variant="body2" color="black">
                              Course summary{" "}
                              <Text variant="body2" as="span" color="red">
                                *
                              </Text>
                            </FormLabel>
                            <Textarea
                              type="text"
                              w="100%"
                              h="72px"
                              resize="none"
                              {...field}
                              placeholder="Enter course summary"
                            />
                            <FormErrorMessage>
                              {form.errors.course_summary}
                            </FormErrorMessage>
                            {form.errors.course_summary &&
                            form.touched.course_summary ? null : (
                              <FormHelperText>
                                Character length must be not more than 120
                                characters
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      </Field>
                      {/* Course Detail field */}
                      <Field
                        name="course_detail"
                        validate={validateCourseDetail}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.course_detail &&
                              form.touched.course_detail
                            }
                          >
                            <FormLabel variant="body2" color="black">
                              Course detail{" "}
                              <Text variant="body2" as="span" color="red">
                                *
                              </Text>
                            </FormLabel>
                            <Textarea
                              type="text"
                              w="100%"
                              h="192px"
                              {...field}
                              placeholder="Enter course detail"
                            />
                            <FormErrorMessage>
                              {form.errors.course_detail}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {/* Category field */}
                      <Field name="category" validate={validateCategory}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel variant="body2" color="black">
                              Category{" "}
                              <Text variant="body2" as="span" color="red">
                                *
                              </Text>
                            </FormLabel>
                            <Select
                              w="920px"
                              {...field}
                              sx={
                                Boolean(field.value)
                                  ? null
                                  : {
                                      "&": {
                                        color: "#9AA1B9",
                                      },
                                      "& > option:not(:first-of-type)": {
                                        color: "black",
                                      },
                                    }
                              }
                            >
                              <option disabled value="">
                                Select course category
                              </option>
                              <option value="science">Science</option>
                              <option value="business">Business</option>
                              <option value="technology">
                                Software development
                              </option>
                            </Select>
                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {/* Cover Image Upload */}
                      <Field name="cover_image" validate={validateCoverImage}>
                        {({ field, form }) => {
                          return (
                            <Flex
                              className="cover-image-upload"
                              direction="column"
                              gap="8px"
                            >
                              <Text variant="body2" color="black">
                                Cover Image{" "}
                                <Text variant="body2" as="span" color="red">
                                  *
                                </Text>
                              </Text>
                              <Flex
                                w="240px"
                                h="240px"
                                direction="column"
                                justify="center"
                                align="center"
                                color="blue.400"
                                bg="gray.100"
                                borderRadius="8px"
                              >
                                {field.value ? (
                                  <Flex w="100%" h="100%" position="relative">
                                    <Image
                                      w="100%"
                                      src={URL.createObjectURL(field.value)}
                                      fit="contain"
                                      borderRadius="8px"
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
                                        form.setFieldValue("cover_image", "");
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
                                  <FormControl
                                    isInvalid={
                                      form.errors.cover_image &&
                                      form.touched.cover_image
                                    }
                                    w="100%"
                                    h="100%"
                                  >
                                    <label>
                                      <Input
                                        type="file"
                                        display="none"
                                        onChange={(event) => {
                                          handleCoverImageChange(
                                            event.currentTarget.files[0],
                                            form.setFieldValue
                                          );
                                        }}
                                      />
                                      <Flex
                                        direction="column"
                                        justify="center"
                                        align="center"
                                        color="blue.400"
                                        cursor="pointer"
                                        w="100%"
                                        h="100%"
                                      >
                                        <Text fontSize="36px">+</Text>
                                        <Text variant="body2">
                                          Upload Image
                                        </Text>
                                      </Flex>
                                    </label>
                                    <FormErrorMessage>
                                      {form.errors.cover_image}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Flex>
                            </Flex>
                          );
                        }}
                      </Field>
                      {/* Video Trailer Upload */}
                      <Field
                        name="video_trailer"
                        validate={validateVideoTrailer}
                      >
                        {({ field, form }) => {
                          return (
                            <Flex
                              className="video-trailer-upload"
                              direction="column"
                              gap="8px"
                            >
                              <Text variant="body2" color="black">
                                Video Trailer{" "}
                                <Text variant="body2" as="span" color="red">
                                  *
                                </Text>
                              </Text>
                              <Flex
                                w="240px"
                                h="240px"
                                direction="column"
                                justify="center"
                                align="center"
                                color="blue.400"
                                bg="gray.100"
                                borderRadius="8px"
                              >
                                {field.value ? (
                                  <Flex w="100%" h="100%" position="relative">
                                    <video controls w="100%" h="100%">
                                      <source
                                        src={URL.createObjectURL(field.value)}
                                      />
                                    </video>
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
                                        form.setFieldValue("video_trailer", "");
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
                                  <FormControl
                                    isInvalid={
                                      form.errors.video_trailer &&
                                      form.touched.video_trailer
                                    }
                                    w="100%"
                                    h="100%"
                                  >
                                    <label>
                                      <Input
                                        type="file"
                                        display="none"
                                        onChange={(event) => {
                                          handleVideoChange(
                                            event.currentTarget.files[0],
                                            form.setFieldValue
                                          );
                                        }}
                                      />
                                      <Flex
                                        direction="column"
                                        justify="center"
                                        align="center"
                                        color="blue.400"
                                        cursor="pointer"
                                        w="100%"
                                        h="100%"
                                      >
                                        <Text fontSize="36px">+</Text>
                                        <Text variant="body2">
                                          Upload Video
                                        </Text>
                                      </Flex>
                                    </label>
                                    <FormErrorMessage>
                                      {form.errors.video_trailer}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Flex>
                            </Flex>
                          );
                        }}
                      </Field>
                      {/* File(s) Upload */}
                      <Field name="files">
                        {({ field, form }) => {
                          return (
                            <Flex
                              className="files-upload"
                              direction="column"
                              gap="8px"
                            >
                              <Text variant="body2" color="black">
                                Attach File (Optional)
                              </Text>
                              {field.value.length > 0 ? (
                                <>
                                  <Flex wrap="wrap" w="100%" gap="20px 30px">
                                    {field.value.map((file, key) => {
                                      return (
                                        <Flex
                                          key={key}
                                          position="relative"
                                          display="flex"
                                          alignItems="center"
                                          h="82px"
                                          w="240px"
                                          bg="blue.100"
                                          borderRadius="8px"
                                          sx={{
                                            "&:hover": {
                                              bg: "blue.200",
                                            },
                                          }}
                                        >
                                          <Flex
                                            align="center"
                                            gap="29px"
                                            p="16px"
                                            w="100%"
                                            h="100%"
                                          >
                                            <Flex
                                              w="50px"
                                              h="50px"
                                              bg="white"
                                              borderRadius="4px"
                                              justify="center"
                                              align="center"
                                            >
                                              <Box w="20px">
                                                {/^image/i.test(file.type) ? (
                                                  <Image
                                                    src="../../../assets/course-detail-page/image-icon.svg"
                                                    alt="image icon"
                                                  />
                                                ) : /^audio/i.test(
                                                    file.type
                                                  ) ? (
                                                  <Image
                                                    src="../../../assets/course-detail-page/audio-icon.svg"
                                                    alt="audio icon"
                                                  />
                                                ) : /^video/i.test(
                                                    file.type
                                                  ) ? (
                                                  <Image
                                                    src="../../../assets/course-detail-page/video-icon.svg"
                                                    alt="video icon"
                                                  />
                                                ) : (
                                                  <Image
                                                    src="/assets/course-detail-page/file-icon.svg"
                                                    alt="file icon"
                                                  />
                                                )}
                                              </Box>
                                            </Flex>
                                            <Text
                                              variant="body3"
                                              w="60%"
                                              noOfLines={1}
                                            >
                                              {file.name}
                                            </Text>
                                          </Flex>
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
                                              const newFieldValue = [
                                                ...field.value,
                                              ];
                                              newFieldValue.splice(key, 1);
                                              form.setFieldValue(
                                                "files",
                                                newFieldValue
                                              );
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
                                      );
                                    })}
                                  </Flex>
                                  {/* Add more file */}
                                  <Flex>
                                    <label>
                                      <Input
                                        type="file"
                                        display="none"
                                        multiple
                                        onChange={(event) => {
                                          const newFieldValue = [
                                            ...field.value,
                                            ...Object.values(
                                              event.currentTarget.files
                                            ),
                                          ];
                                          form.setFieldValue(
                                            "files",
                                            newFieldValue
                                          );
                                        }}
                                      />
                                      <Text
                                        variant="add-more-files"
                                        cursor="pointer"
                                      >
                                        Add more files
                                      </Text>
                                    </label>
                                  </Flex>
                                </>
                              ) : (
                                <Flex
                                  w="160px"
                                  h="160px"
                                  direction="column"
                                  justify="center"
                                  align="center"
                                  color="blue.400"
                                  bg="gray.100"
                                  borderRadius="8px"
                                >
                                  <label>
                                    <Input
                                      type="file"
                                      display="none"
                                      multiple
                                      onChange={(event) => {
                                        form.setFieldValue(
                                          "files",
                                          Object.values(event.target.files)
                                        );
                                      }}
                                    />
                                    <Flex
                                      direction="column"
                                      justify="center"
                                      align="center"
                                      color="blue.400"
                                      cursor="pointer"
                                      w="160px"
                                      h="160px"
                                    >
                                      <Text fontSize="36px">+</Text>
                                      <Text variant="body2">Upload file</Text>
                                    </Flex>
                                  </label>
                                </Flex>
                              )}
                            </Flex>
                          );
                        }}
                      </Field>
                    </Flex>
                  </Flex>
                  {/* <LessonTable /> */}
                </Box>
              </Flex>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminAddCourses;
