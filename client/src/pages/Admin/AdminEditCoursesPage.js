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
  Select,
  Button,
  Heading,
  FormHelperText,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useAuth } from "../../contexts/authentication";
let action = "no files";

function AdminEditCourses() {
  const [courseData, setCourseData] = useState({});
  const [coverImageFile, setCoverImageFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [files, setFiles] = useState([]);
  const [filesObj, setFilesObj] = useState([]);
  // const props = " Add more files";
  const toast = useToast();
  const { contextAdminState } = useAuth();
  const adminId = contextAdminState.user.admin_id;
  const params = useParams();
  const courseId = params.courseId;

  const getCourseData = async () => {
    const result = await axios.get(
      `http://localhost:4000/admin/get-course/${courseId}?adminId=${adminId}`
    );
    setCourseData(result.data.data);
    const results = await convertToFileObj(
      result.data.filesMetaData,
      result.data.allMediaUrls
    );

    // setFilesObj(results); // this is an array of all file objects
    // console.log(results);

    console.log(result.data.subLessonsPerLesson);
    setCoverImageFile(results[0]);
    setVideoFile(results[1]);
    setFiles(results.slice(2));
  };

  // Convert media urls into file objects:
  const convertToFileObj = async (filesMetaData, allMediaUrls) => {
    const filesObjects = [];
    const filesMetaDataFromCloudinary = [];

    for (let i = 0; i < allMediaUrls.length; i++) {
      filesMetaDataFromCloudinary.push(JSON.parse(allMediaUrls[i]));
      console.log(filesMetaDataFromCloudinary[i]);
      await fetch(filesMetaDataFromCloudinary[i].url).then(async (response) => {
        const blob = await response.blob();
        const file = new File([blob], filesMetaData[i].file_name, {
          type: blob.type,
        });
        filesObjects.push(file);
      });
    }

    return filesObjects;
  };

  console.log(courseData);

  useEffect(() => {
    getCourseData();
  }, []);

  const handleSubmit = async (values) => {
    console.log(action);
    const formData = new FormData();
    formData.append("course_name", values.course_name);
    formData.append("price", values.price);
    formData.append("learning_time", values.learning_time);
    formData.append("course_summary", values.course_summary);
    formData.append("course_detail", values.course_detail);
    formData.append("category", values.category);
    formData.append("lesson_name", "test lesson name");
    formData.append("lesson_sequence", 3);
    formData.append("action", action);
    if (/change/i.test(action)) {
      formData.append("course_cover_images", coverImageFile);
      formData.append("course_video_trailers", videoFile);
      files.forEach((file) => {
        formData.append("course_attached_files", file);
      });
    }
    for (let i of formData) {
      console.log(i);
    }
    const result = await axios.put(
      `http://localhost:4000/admin/edit-course/${courseId}?adminId=${adminId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const handleVideoChange = (currentFile, setFieldValue) => {
    action = "change";
    if (currentFile) {
      if (/video/gi.test(currentFile.type)) {
        if (currentFile.size <= 1.2e9) {
          setFieldValue("video_trailer", currentFile);
          setVideoFile(currentFile);
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
    action = "change";
    if (currentFile) {
      if (/jpeg|png/gi.test(currentFile.type)) {
        if (currentFile.size <= 2e6) {
          setFieldValue("cover_image", currentFile);
          setCoverImageFile(currentFile);
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
    <>
      <Formik
        initialValues={{
          course_name: courseData.course_name || "",
          price: courseData.price || "",
          learning_time: courseData.learning_time || "",
          course_summary: courseData.summary || "",
          course_detail: courseData.detail || "",
          category: courseData.category || "",
          cover_image: coverImageFile || null,
          video_trailer: videoFile || null,
          files: files || "",
        }}
        onSubmit={handleSubmit}
        enableReinitialize
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
                  {/* navbar */}
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    px="30px"
                    h="92px"
                    py="16px"
                    w="100%"
                    borderBottom="1px"
                    borderColor="gray.400"
                  >
                    <Flex alignItems="center" gap="20px">
                      <Image
                        src="../../../assets/admin-page/back.svg"
                        alt="back"
                        sx={{
                          "&:hover": {
                            opacity: 0.5,
                          },
                        }}
                        onClick={console.log("navigate to view courses")}
                      />
                      <Flex gap="8px">
                        <Heading variant="headline3" color="gray.600">
                          Course
                        </Heading>
                        <Heading variant="headline3">
                          {courseData.course_name}
                        </Heading>
                      </Flex>
                    </Flex>
                    <Flex alignItems="center" gap="16px">
                      <Button
                        variant="secondary"
                        onClick={() => props.resetForm()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        isLoading={props.isSubmitting}
                      >
                        Save edits
                      </Button>
                    </Flex>
                  </Flex>
                  {/* navbar */}

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
                                          form.setFieldValue(
                                            "video_trailer",
                                            ""
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
                                                action = "change";
                                                const newFieldValue = [
                                                  ...field.value,
                                                ];
                                                newFieldValue.splice(key, 1);
                                                console.log(newFieldValue);
                                                setFiles(newFieldValue);
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
                                            action = "change";
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
                                            setFiles(newFieldValue);
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
                                          action = "change";
                                          form.setFieldValue(
                                            "files",
                                            Object.values(event.target.files)
                                          );
                                          setFiles(
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
    </>
  );
}

export default AdminEditCourses;
