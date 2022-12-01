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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { DragHandleIcon, WarningIcon } from "@chakra-ui/icons";
import { Field, Form, Formik, FieldArray } from "formik";
import { useAdmin } from "../../contexts/admin.js";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function AdminAddLesson() {
  // * validate multi video
  // * cancel button
  // ! todo back button
  // todo drag and drop

  const { addLesson, setAddLesson } = useAdmin();
  const toast = useToast();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleVideoChange = (currentFile, index, setFieldValue) => {
    if (currentFile) {
      if (/video/gi.test(currentFile.type)) {
        setFieldValue(`sub_lessons.${index}.video`, currentFile);
      } else {
        return toast({
          title: "File type must be video only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = (values) => {
    setAddLesson([...addLesson, values]);
    if (Boolean(courseId)) {
      navigate(`/admin/edit-course/${courseId}`);
    } else {
      navigate(`/admin/add-course`);
    }
  };

  /* Input Validation */
  const validateLessonName = (value) => {
    let error;
    if (!value) {
      error = "Please specify lesson name";
    }
    return error;
  };

  const validateSubLessonName = (value) => {
    let error;
    if (!value) {
      error = "Please specify sub-lesson name";
    }
    return error;
  };

  const validateVideo = (value) => {
    let error;
    if (!value) {
      error = "Please upload sub-lesson video";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        lesson_name: "",
        sub_lessons: [
          {
            sub_lesson_name: "",
            video: null,
          },
        ],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, resetForm, isSubmitting }) => (
        <Form>
          <Flex w="100vw">
            {/* Left Section */}
            <Sidebar />
            {/* Right Section */}
            <Flex direction="column" w="100%" h="100vh" overflow="auto">
              {/* Right-Top Section */}
              <Flex
                w="100%"
                minW="1200px"
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
                {/* Heading */}
                <Flex gap="20px" w="70%">
                  <Image
                    src="/assets/admin-lesson-page/arrow.svg"
                    arc="arrow"
                    cursor="pointer"
                    _hover={{ opacity: 0.5 }}
                    onClick={() => {
                      if (Boolean(courseId)) {
                        navigate(`/admin/edit-course/${courseId}`);
                      } else {
                        navigate(`/admin/add-course`);
                      }
                    }}
                  />
                  <Flex direction="column">
                    {Boolean(courseId) ? (
                      <Flex gap="8px">
                        <Text variant="body3" color="gray.600">
                          Course
                        </Text>
                        <Text variant="body3" color="black">
                          'Service Design Essentials'
                        </Text>
                      </Flex>
                    ) : null}
                    <Heading variant="headline3">Add Lesson</Heading>
                  </Flex>
                </Flex>
                {/* Button */}
                <Flex gap="16px">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSubmitting}>
                    Create
                  </Button>
                </Flex>
              </Flex>
              {/* Form Section */}
              <Flex w="100%" minW="1200px" bg="gray.100" p="40px">
                <Flex
                  w="100%"
                  direction="column"
                  borderRadius="16px"
                  border="1px solid #E6E7EB"
                  bg="white"
                  p="40px 100px"
                >
                  {/* Lesson name field */}
                  <Flex
                    w="920px"
                    borderBottom="1px"
                    borderColor="gray.400"
                    pb="40px"
                  >
                    <Field name="lesson_name" validate={validateLessonName}>
                      {({ field, form }) => {
                        return (
                          <FormControl
                            isInvalid={
                              form.errors.lesson_name &&
                              form.touched.lesson_name
                            }
                          >
                            <FormLabel variant="body2" color="black">
                              Lesson name{" "}
                              <Text variant="body2" as="span" color="red">
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="text"
                              h="48px"
                              placeholder="Enter lesson name"
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.lesson_name}
                            </FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    </Field>
                  </Flex>

                  <Flex direction="column">
                    <Text
                      my="40px"
                      fontSize="20px"
                      fontWeight="600"
                      color="gray.700"
                    >
                      Sub-Lesson
                    </Text>
                    <FieldArray name="sub_lessons">
                      {(forms) => {
                        return (
                          <>
                            {values.sub_lessons.map((sub_lesson, index) => {
                              return (
                                <Flex
                                  key={index}
                                  direction="column"
                                  align="start"
                                  justify="center"
                                  pl="66px"
                                  pt="24px"
                                  pb="36px"
                                  w="920px"
                                  bg="gray.100"
                                  borderRadius="16px"
                                  borderColor="gray.300"
                                  borderWidth="1px"
                                  position="relative"
                                  gap="24px"
                                  mb="24px"
                                >
                                  <Text
                                    cursor={
                                      index === 0 ? "not-allowed" : "pointer"
                                    }
                                    color={
                                      index === 0 ? "gray.500" : "blue.500"
                                    }
                                    fontWeight="700"
                                    fontSize="16px"
                                    position="absolute"
                                    right="24px"
                                    top="28px"
                                    zIndex="1"
                                    onClick={() => {
                                      if (index !== 0) {
                                        forms.remove(index);
                                      }
                                    }}
                                  >
                                    Delete
                                  </Text>
                                  <DragHandleIcon
                                    position="absolute"
                                    left="24px"
                                    top="54px"
                                    color="gray.500"
                                    fontSize="16px"
                                  />
                                  {/* Sub-lesson name field */}
                                  <Field
                                    name={`sub_lessons.${index}.sub_lesson_name`}
                                    validate={validateSubLessonName}
                                  >
                                    {({ field, form }) => {
                                      let isFormInValid = false;
                                      if (
                                        form.errors.sub_lessons &&
                                        form.touched.sub_lessons
                                      ) {
                                        if (
                                          form.errors.sub_lessons[index] &&
                                          form.touched.sub_lessons[index]
                                        ) {
                                          isFormInValid =
                                            form.errors.sub_lessons[index]
                                              .sub_lesson_name &&
                                            form.touched.sub_lessons[index]
                                              .sub_lesson_name;
                                        }
                                      }
                                      return (
                                        <FormControl isInvalid={isFormInValid}>
                                          <FormLabel
                                            variant="body2"
                                            color="black"
                                          >
                                            Sub-lesson name{" "}
                                            <Text
                                              variant="body2"
                                              as="span"
                                              color="red"
                                            >
                                              *
                                            </Text>
                                          </FormLabel>
                                          <Input
                                            type="text"
                                            w="530px"
                                            h="48px"
                                            {...field}
                                            placeholder="Enter sub-lesson name"
                                          />
                                          <FormErrorMessage>
                                            {isFormInValid
                                              ? form.errors.sub_lessons[index]
                                                  .sub_lesson_name
                                              : null}
                                          </FormErrorMessage>
                                        </FormControl>
                                      );
                                    }}
                                  </Field>
                                  {/* Sub-lesson video upload field */}
                                  <Field
                                    name={`sub_lessons.${index}.video`}
                                    validate={validateVideo}
                                  >
                                    {({ field, form }) => {
                                      let isFormInValid = false;
                                      if (
                                        form.errors.sub_lessons &&
                                        form.touched.sub_lessons
                                      ) {
                                        if (
                                          form.errors.sub_lessons[index] &&
                                          form.touched.sub_lessons[index]
                                        ) {
                                          isFormInValid =
                                            form.errors.sub_lessons[index]
                                              .video &&
                                            form.touched.sub_lessons[index]
                                              .video;
                                        }
                                      }
                                      return (
                                        <Flex direction="column" gap="8px">
                                          <Text
                                            fontSize="16px"
                                            fontWeight="400"
                                            color="black"
                                          >
                                            Video{" "}
                                            <Text as="span" color="red">
                                              *
                                            </Text>
                                          </Text>
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
                                            {field.value ? (
                                              <Flex
                                                w="100%"
                                                h="100%"
                                                position="relative"
                                                bg="gray.200"
                                                borderRadius="8px"
                                              >
                                                <video
                                                  controls
                                                  w="100%"
                                                  h="100%"
                                                >
                                                  <source
                                                    src={URL.createObjectURL(
                                                      field.value
                                                    )}
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
                                                    form.setFieldValue(
                                                      `sub_lessons.${index}.video`,
                                                      null
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
                                            ) : (
                                              <FormControl
                                                isInvalid={isFormInValid}
                                                w="100%"
                                                h="100%"
                                              >
                                                <label>
                                                  <Input
                                                    type="file"
                                                    hidden
                                                    onChange={(event) => {
                                                      handleVideoChange(
                                                        event.currentTarget
                                                          .files[0],
                                                        index,
                                                        form.setFieldValue
                                                      );
                                                    }}
                                                  />
                                                  <Flex
                                                    w="100%"
                                                    h="100%"
                                                    direction="column"
                                                    justify="center"
                                                    align="center"
                                                    color="blue.400"
                                                    cursor="pointer"
                                                    bg="gray.200"
                                                    borderRadius="8px"
                                                  >
                                                    <Text
                                                      fontSize="36px"
                                                      fontWeight="200"
                                                    >
                                                      +
                                                    </Text>
                                                    <Text
                                                      fontSize="14px"
                                                      fontWeight="500"
                                                    >
                                                      Upload Video
                                                    </Text>
                                                  </Flex>
                                                </label>
                                                <FormErrorMessage w="max-content">
                                                  {isFormInValid
                                                    ? form.errors.sub_lessons[
                                                        index
                                                      ].video
                                                    : null}
                                                </FormErrorMessage>
                                              </FormControl>
                                            )}
                                          </Flex>
                                        </Flex>
                                      );
                                    }}
                                  </Field>
                                </Flex>
                              );
                            })}
                            {/* ! --------------- Add Form END----------------  */}
                            <Button
                              w="208px"
                              h="60px"
                              variant="secondary"
                              onClick={() => {
                                forms.push({
                                  sub_lesson_name: "",
                                  video: null,
                                });
                              }}
                            >
                              + Add Sub-lesson
                            </Button>
                          </>
                        );
                      }}
                    </FieldArray>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default AdminAddLesson;
