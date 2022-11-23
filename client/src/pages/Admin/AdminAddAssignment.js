import { Sidebar } from "../../components/SidebarAdmin.js";
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Heading,
  Button,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

function AdminAddAssignment() {
  return (
    <Formik
      initialValues={{
        course: "",
        lesson: "",
        subLesson: "",
        assignment: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {(props) => (
        <Form>
          <Flex>
            {/* Left Section */}
            <Sidebar />
            {/* Right Section */}
            <Flex direction="column" w="100%">
              {/* Right-Top Section */}
              <Flex
                w="100%"
                h="92px"
                bg="white"
                justify="space-between"
                align="center"
                px="40px"
                borderBottom="1px"
                borderColor="gray.400"
              >
                <Heading variant="headline3">Add Assignment</Heading>
                <Flex>
                  <Button variant="secondary" mr="16px">
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Add
                  </Button>
                </Flex>
              </Flex>
              {/* Right-Bottom Section */}
              <Flex h="100%" bg="gray.100">
                <Flex
                  w="100%"
                  h="fit-content"
                  bg="white"
                  p="40px 100px 60px"
                  mx="40px"
                  mt="40px"
                  border="1px solid #E6E7EB"
                  borderRadius="16px"
                >
                  {/* Right-Bottom-Input Section */}
                  <Flex direction="column" w="100%">
                    {/* Input Top Section */}
                    <Flex
                      direction="column"
                      w="100%"
                      className="input-top-section"
                      borderBottom="1px solid #D6D9E4"
                    >
                      {/*-- Course Input --*/}
                      <Field
                        name="course"
                        validate={(value) => {
                          let error;
                          if (!Boolean(value)) {
                            error = "Please select the course";
                          }
                          return error;
                        }}
                      >
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={
                                form.errors.course && form.touched.course
                              }
                              isRequired
                            >
                              <FormLabel color="black">Course</FormLabel>
                              <Select
                                w="440px"
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
                                  Select course
                                </option>
                                <option>test1</option>
                                <option>test2</option>
                              </Select>
                              <FormErrorMessage>
                                {form.errors.course}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                      <Flex
                        className="lesson-and-sub_lesson-input"
                        w="100%"
                        my="40px"
                      >
                        {/*-- Lesson Input --*/}
                        <Flex>
                          <Field
                            name="lesson"
                            validate={(value) => {
                              let error;
                              if (!Boolean(value)) {
                                error = "Please select the lesson";
                              }
                              return error;
                            }}
                          >
                            {({ field, form }) => {
                              return (
                                <FormControl
                                  isInvalid={
                                    form.errors.lesson && form.touched.lesson
                                  }
                                  isRequired
                                >
                                  <FormLabel color="black">Lesson</FormLabel>
                                  <Select
                                    w="440px"
                                    {...field}
                                    // isDisabled
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
                                      Select lesson
                                    </option>
                                    <option>lesson test1</option>
                                    <option>lesson test2</option>
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.lesson}
                                  </FormErrorMessage>
                                </FormControl>
                              );
                            }}
                          </Field>
                        </Flex>
                        {/*-- Sub Lesson Input --*/}
                        <Flex ml="40px">
                          <Field
                            name="subLesson"
                            validate={(value) => {
                              let error;
                              if (!Boolean(value)) {
                                error = "Please select the sub-lesson";
                              }
                              return error;
                            }}
                          >
                            {({ field, form }) => {
                              return (
                                <FormControl
                                  isInvalid={
                                    form.errors.subLesson &&
                                    form.touched.subLesson
                                  }
                                  isRequired
                                >
                                  <FormLabel color="black">
                                    Sub-lesson
                                  </FormLabel>
                                  <Select
                                    w="440px"
                                    {...field}
                                    // isDisabled
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
                                      Select sub-lesson
                                    </option>
                                    <option>Sub-lesson test1</option>
                                    <option>Sub-lesson test2</option>
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.subLesson}
                                  </FormErrorMessage>
                                </FormControl>
                              );
                            }}
                          </Field>
                        </Flex>
                      </Flex>
                    </Flex>
                    {/* Input Bottom Section */}
                    <Flex
                      className="input-bottom-section"
                      w="100%"
                      direction="column"
                    >
                      <Text
                        variant="body1"
                        color="gray.700"
                        fontWeight="600"
                        my="40px"
                      >
                        Assignment detail
                      </Text>
                      {/* Assignment Input */}
                      <Flex>
                        <Field
                          name="assignment"
                          validate={(value) => {
                            let error;
                            if (!Boolean(value)) {
                              error = "Please enter the assignment";
                            }
                            return error;
                          }}
                        >
                          {({ field, form }) => {
                            return (
                              <FormControl
                                isInvalid={
                                  form.errors.assignment &&
                                  form.touched.assignment
                                }
                                isRequired
                              >
                                <FormLabel color="black">Assignment</FormLabel>
                                <Textarea
                                  {...field}
                                  placeholder="Enter assignment"
                                />
                                <FormErrorMessage>
                                  {form.errors.assignment}
                                </FormErrorMessage>
                              </FormControl>
                            );
                          }}
                        </Field>
                      </Flex>
                      {/* Assignment Duration Input */}
                      <Flex w="440px" mt="40px">
                        <Field
                          name="duration"
                          validate={(value) => {
                            let error;
                            if (!value >= 1 || !Boolean(value)) {
                              error =
                                "Please enter the duration of assignment 1 day at least";
                            }
                            return error;
                          }}
                        >
                          {({ field, form }) => {
                            return (
                              <FormControl
                                isInvalid={
                                  form.errors.duration && form.touched.duration
                                }
                                isRequired
                              >
                                <FormLabel color="black">
                                  Duration of assignment (days)
                                </FormLabel>
                                <NumberInput
                                  min={1}
                                  {...field}
                                  onChange={(val) => {
                                    form.setFieldValue("duration", Number(val));
                                  }}
                                >
                                  <NumberInputField />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage w="max-content">
                                  {form.errors.duration}
                                </FormErrorMessage>
                                <FormHelperText w="max-content">
                                  Note: The duration of an assignment will be
                                  the same as the other assignments in the same
                                  sub-lesson
                                </FormHelperText>
                              </FormControl>
                            );
                          }}
                        </Field>
                      </Flex>
                    </Flex>
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

export default AdminAddAssignment;
