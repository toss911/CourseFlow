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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Sidebar } from "../../components/SidebarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authentication";

function AdminEditCourses() {
  const [courseData, setCourseData] = useState({});
  let action;
  const [video, setVideo] = useState();
  const [coverImage, setCoverImage] = useState();
  const [files, setFiles] = useState([]);
  const [filesObj, setFilesObj] = useState([]);
  const props = " Add more files";

  const toast = useToast();
  //   const { contextAdminState } = useAuth();
  //   const adminId = contextAdminState.user.admin_id;
  const adminId = 2;
  const courseId = 70;

  const getCourseData = async () => {
    const result = await axios.get(
      `http://localhost:4000/admin/get-course/${courseId}?adminId=${adminId}`
    );
    setCourseData(result.data.data);
    const results = await convertToFileObj(
      result.data.filesMetaData,
      result.data.allMediaUrls
    );
    setFilesObj(results);
    setCoverImage(results[0].fileUrl.url);
    setVideo(results[1].fileUrl.url);
    setFiles(results.slice(3));
  };

  // Convert media urls into file objects:
  const convertToFileObj = async (filesMetaData, allMediaUrls) => {
    const filesObjects = [];
    const filesMetaDataFromCloudinary = [];

    for (let i = 0; i < allMediaUrls.length; i++) {
      filesMetaDataFromCloudinary.push(JSON.parse(allMediaUrls[i]));
      await fetch(filesMetaDataFromCloudinary[i].url).then(async (response) => {
        const blob = await response.blob();
        const file = new File([blob], filesMetaData[i].file_name, {
          type: blob.type,
        });
        filesObjects.push({
          fileData: file,
          fileUrl: filesMetaDataFromCloudinary[i],
        });
      });
    }

    return filesObjects;
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const handleSubmit = async (values) => {
    // check if user has added all info
    // if (true) {
    //   //   addCourse();
    //   // pop up modal
    //   // navigate to view courses page
    // } else {
    // }
    const formData = new FormData();
    formData.append("course_name", values.course_name);
    formData.append("price", values.price);
    formData.append("learning_time", values.total_learning_time);
    formData.append("summary", values.course_summary);
    formData.append("detail", values.course_detail);
    formData.append("category", values.category);
    if (/change/i.test(action)) {
      formData.append("action", action);
      formData.append("cover_image_directory", values.cover_image);
    }
    const result = await axios.put(
      `http://localhost:4000/admin/edit-courses/${courseId}?${adminId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
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
          console.log(coverImage);
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

  const handleFilesChange = (event) => {
    const newFiles = event.target.files;
    action = "change";
    console.log(event.target.files);
    if (files) {
      setFiles([...files, ...newFiles]);
    } else {
      setFiles([...newFiles]);
    }
  };

  const handleDeleteFiles = (uniqueIdentifier) => {
    let filesLeftAfterDelete = files.filter((file) => {
      return file.size != uniqueIdentifier;
    });

    setFiles([...filesLeftAfterDelete]);
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

  const validateCategory = (value) => {
    let error;
    if (!value) {
      error = "Category cannot be empty";
    }
    return error;
  };

  return (
    <>
      <Formik
        initialValues={{
          course_name: courseData.course_name,
          price: courseData.price || "",
          total_learning_time: courseData.learning_time,
          course_summary: courseData.summary,
          course_detail: courseData.detail,
          cover_image: "", // change to current cover_image
          video_trailer: "",
          files_upload: "",
          category: courseData.category,
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Flex>
              <Sidebar />
              <Flex flexDirection="column" w="100vw">
                {/* navbar */}
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  px="30px"
                  h="92px"
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
                    />
                    <Flex gap="8px">
                      <Heading variant="headline3" color="gray.600">
                        Course
                      </Heading>
                      <Heading variant="headline3">
                        'Service Design Essentials'
                      </Heading>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" gap="16px">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Save edits
                    </Button>
                  </Flex>
                </Flex>
                {/* navbar */}
                <Box bgColor="gray.200">
                  <Flex
                    className="Input-fields"
                    w="1120px"
                    bg="white"
                    flexDirection="column"
                    borderRadius="16px"
                    p="40px 100px 60px 100px"
                    m="40px"
                    borderColor="gray.200"
                  >
                    {/* Course name field */}
                    <Field name="course_name" validate={validateCourseName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.course_name && form.touched.course_name
                          }
                          isRequired
                        >
                          <FormLabel variant="body2" color="black">
                            Course name
                          </FormLabel>
                          <Input type="text" w="920px" h="48px" {...field} />
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
                            isInvalid={form.errors.price && form.touched.price}
                            isRequired
                          >
                            <FormLabel variant="body2" color="black" mt="40px">
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
                      <Field
                        name="total_learning_time"
                        validate={validateLearningTime}
                      >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.learning_time &&
                              form.touched.learning_time
                            }
                            isRequired
                          >
                            <FormLabel variant="body2" color="black" mt="40px">
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
                          isRequired
                        >
                          <FormLabel variant="body2" color="black" mt="40px">
                            Course summary
                          </FormLabel>
                          <Textarea type="text" w="920px" h="72px" {...field} />
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
                          <FormLabel variant="body2" color="black" mt="40px">
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
                    <Field name="category" validate={validateCategory}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.category && form.touched.category
                          }
                          isRequired
                        >
                          <FormLabel variant="body2" color="black" mt="40px">
                            Category
                          </FormLabel>
                          <Select w="920px" {...field}>
                            <option value="category1">Science</option>
                            <option value="category2">Business</option>
                            <option value="category3">
                              Software development
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.category}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* File Uploads */}

                    <Flex display="column" flexWrap="wrap" w="920px">
                      {/* Cover Image Upload */}
                      <Field name="cover_image">
                        {({ field, form }) => (
                          <FormControl isRequired>
                            <FormLabel variant="body2" color="black" mt="40px">
                              Cover Image
                            </FormLabel>
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
                                    isRequired
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
                          </FormControl>
                        )}
                      </Field>

                      {/* Video Upload */}

                      <Field name="video_trailer">
                        {({ field, form }) => (
                          <FormControl isRequired>
                            <FormLabel variant="body2" color="black" mt="40px">
                              Video Trailer
                            </FormLabel>
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
                                    isRequired
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
                          </FormControl>
                        )}
                      </Field>

                      {/* Attach Files Upload */}

                      <Field name="files_upload">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel variant="body2" color="black" mt="40px">
                              Attach Files (Optional)
                            </FormLabel>
                            {files.length > 0 ? (
                              files.map((file, key) => {
                                return (
                                  <>
                                    <Flex
                                      key={key}
                                      position="relative"
                                      display="flex"
                                      alignItems="center"
                                      w="45%"
                                      h="82px"
                                      bg="blue.100"
                                      mt={3}
                                      borderRadius="8px"
                                      sx={{
                                        "&:hover": {
                                          bg: "blue.200",
                                        },
                                      }}
                                    >
                                      <Flex
                                        w="50px"
                                        h="50px"
                                        m="16px 29px 16px 16px"
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
                                          ) : /^audio/i.test(file.type) ? (
                                            <Image
                                              src="../../../assets/course-detail-page/audio-icon.svg"
                                              alt="audio icon"
                                            />
                                          ) : /^video/i.test(file.type) ? (
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
                                      <Text variant="body3" fontSize="xl">
                                        {file.name}
                                      </Text>

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
                                          // setFiles();
                                          handleDeleteFiles(file.size);
                                          action = "delete";
                                        }}
                                      >
                                        <Image
                                          src="../../../assets/misc/close-button.svg"
                                          alt="close button"
                                          w="11px"
                                          h="11px"
                                        />
                                      </Flex>
                                    </Flex>
                                    {/* Add more files */}
                                    {key === files.length - 1 ? (
                                      <label w="250px">
                                        <Input
                                          type="file"
                                          hidden
                                          onChange={handleFilesChange}
                                          multiple
                                        />
                                        <Box
                                          border="1px"
                                          textAlign="center"
                                          w="110px"
                                          mt="10px"
                                          borderRadius="12px"
                                          borderColor="blue.300"
                                          sx={{
                                            "&:hover": {
                                              bgColor: "blue.200",
                                              border: "solid 1px white",
                                            },
                                          }}
                                          cursor="pointer"
                                        >
                                          <Text variant="body3">
                                            Add more files
                                          </Text>
                                        </Box>
                                      </label>
                                    ) : null}
                                    {/* End of Add more files */}
                                  </>
                                );
                              })
                            ) : (
                              <label w="250px">
                                <Input
                                  type="file"
                                  hidden
                                  onChange={handleFilesChange}
                                  multiple
                                />
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
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  </Flex>
                  {/* Lesson Table here */}
                </Box>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AdminEditCourses;
