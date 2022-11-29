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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

let action;

function AdminAddLesson() {
  // *Add sub lesson ได้แล้ว
  // *delete ได้แล้ว
  // !ปัญหาคือ video เหลือ validate video
  // ? สงสัยว่า <- กับ back ต่างยังไง
  // todo จะทำ query course , drag and drop และแก้ปัญหาที่เหลือ

  const { addLesson, setAddLesson } = useAdmin();
  const [video, setVideo] = useState([]);
  const [fileVideo, setFileVideo] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialValues = {
    lesson_name: "",
    sub_lessons_count: "",
    sub_lessons: [
      {
        sequence: "",
        sub_lesson_name: "",
      },
    ],
  };

  const handleVideoChange = (event, index) => {
    const currentFile = event.target.files[0];

    if (currentFile) {
      if (/video/gi.test(currentFile.type)) {
        action = "change";
        // get data file video to contextAPI
        const dataVideo = [...fileVideo];
        dataVideo[index] = currentFile;
        setFileVideo([...dataVideo]);
        // display upload video by index
        const updateVideo = [...video];
        updateVideo[index] = URL.createObjectURL(currentFile);
        setVideo([...updateVideo]);
      } else {
        return toast({
          title: "File type must be .mp4 only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };
  const handleRemoveVideo = (index) => {
    const newFileVideo = [...fileVideo];
    newFileVideo[index] = null;
    setFileVideo(newFileVideo);
    // delete video by index
    const newVideo = [...video];
    newVideo[index] = null;
    setVideo(newVideo);
  };
  const handleSubmit = (event) => {
    // event.video_directory = fileVideo;
    event.sub_lessons_count = event.sub_lessons.length;
    setAddLesson(event);
    console.log(fileVideo);
  };

  return (
    <>
      {/* ------------- Wrap all ------------------ */}
      <Flex flexDirection="row" alignItems="start" bgColor="gray.100">
        <Sidebar />
        <Flex flexDirection="column" w="100vw">
          {/* -------------Navbar add-lesson -----------------*/}
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
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
                    {fileVideo[fileVideo.length] !== null ? (
                      <Button
                        type="submit"
                        w="117px"
                        h="60px"
                        shadow="shadow1"
                        mr="40px"
                      >
                        Create
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={onOpen}
                          w="117px"
                          h="60px"
                          shadow="shadow1"
                          mr="40px"
                        >
                          Create
                        </Button>
                        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent borderRadius="24px">
                            <ModalHeader
                              bg="#E53E3E"
                              color="white"
                              textAlign="center"
                              borderRadius="24px 24px 0px 0px"
                              fontSize="1.5rem"
                            >
                              <WarningIcon mr="0.5em" />
                              Warning
                            </ModalHeader>
                            <ModalBody
                              textAlign="center"
                              my="2em"
                              color="#E53E3E"
                              fontSize="1rem"
                            >
                              Upload video on your lesson !!
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </>
                    )}
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

                    <FieldArray name="sub_lessons">
                      {({ insert, remove, push }) => (
                        <>
                          {values.sub_lessons.length > 0 &&
                            values.sub_lessons.map((sub_lesson, index) => {
                              sub_lesson.sequence = index + 1;

                              const reorder = (
                                sub_lesson,
                                startIndex,
                                endIndex
                              ) => {
                                const result = Array.from(sub_lesson);
                                console.log(result);
                                const removed = result.splice(startIndex, 1);
                                console.log(removed);
                                result.splice(endIndex, 0, removed);
                                console.log(result);
                                return result;
                              };

                              const onEnd = (result) => {
                                console.log(result);
                                sub_lesson = reorder(
                                  sub_lesson,
                                  result.source.index,
                                  result.destination.index
                                );
                              };
                              return (
                                <DragDropContext onDragEnd={onEnd}>
                                  <Droppable droppableId="1" type="PERSON">
                                    {(provided) => (
                                      <div
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                      >
                                        <Draggable
                                          // key={index}
                                          draggableId={index.toString()}
                                          // index={index}
                                          key={1}
                                          index={0}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <Flex
                                                // key={index}
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
                                                {index === 0 ? (
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
                                                ) : (
                                                  <Text
                                                    cursor="pointer"
                                                    color="blue.500"
                                                    fontWeight="700"
                                                    fontSize="16px"
                                                    position="absolute"
                                                    right="24px"
                                                    top="28px"
                                                    zIndex="1"
                                                    type="button"
                                                    onClick={() => {
                                                      remove(index);
                                                      handleRemoveVideo(index);
                                                    }}
                                                  >
                                                    Delete
                                                  </Text>
                                                )}
                                                <Field
                                                  name={`sub_lessons.${index}.sub_lesson_name`}
                                                >
                                                  {({ field, form }) => {
                                                    return (
                                                      <FormControl
                                                        isInvalid={
                                                          form.errors
                                                            .sub_lesson_name &&
                                                          form.touched
                                                            .sub_lesson_name
                                                        }
                                                        isRequired
                                                      >
                                                        <FormLabel
                                                          //htmlFor={`sub_lessons.${index}.sub_lesson_name`}
                                                          fontSize="16px"
                                                          fontWeight="400"
                                                          mt="24px"
                                                        >
                                                          Sub-lesson name
                                                        </FormLabel>
                                                        {/* //!Allow to Drag drop start here */}

                                                        <DragHandleIcon
                                                          left="-45px"
                                                          top="60px"
                                                          position="absolute"
                                                          color="gray.500"
                                                          fontSize="16px"
                                                        />
                                                        <Input
                                                          type="text"
                                                          w="530px"
                                                          h="48px"
                                                          {...field}
                                                        />
                                                      </FormControl>
                                                    );
                                                  }}
                                                </Field>
                                                <Text
                                                  fontSize="16px"
                                                  fontWeight="400"
                                                  mt="24px"
                                                  mb="8px"
                                                >
                                                  Video
                                                  <Text
                                                    as="span"
                                                    color="#E53E3E"
                                                  >
                                                    &nbsp;*
                                                  </Text>
                                                </Text>
                                                {Boolean(video[index]) ? (
                                                  <Flex
                                                    w="100%"
                                                    h="100%"
                                                    position="relative"
                                                    mb="24px"
                                                  >
                                                    <iframe
                                                      w="100%"
                                                      src={video[index]}
                                                      fit="contain"
                                                    />
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
                                                        handleRemoveVideo(
                                                          index
                                                        );
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
                                                      //onChange={handleVideoChange}
                                                      // onChange={(event) => {
                                                      //   form.setFieldValue(
                                                      //     `sub_lessons.${index}.video_directory`,
                                                      //     event.target.files[0]
                                                      //   );
                                                      // }}
                                                      onChange={(event) => {
                                                        handleVideoChange(
                                                          event,
                                                          index
                                                        );
                                                      }}
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
                                                )}
                                              </Flex>
                                            </div>
                                          )}
                                        </Draggable>
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              );
                            })}
                          {/* ! --------------- Add Form END----------------  */}
                          <Button
                            mt="24px"
                            mb="60px"
                            w="208px"
                            h="60px"
                            variant="secondary"
                            shadow="shadow1"
                            type="button"
                            onClick={() =>
                              push({
                                sequence: "",
                                sub_lesson_name: "",
                              })
                            }
                          >
                            + Add Sub-lesson
                          </Button>
                        </>
                      )}
                    </FieldArray>
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
