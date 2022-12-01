import {
  Heading,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Box,
  List,
  UnorderedList,
  ListItem,
  Container,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { useAdmin } from "../contexts/admin.js";
import { useNavigate, useParams } from "react-router-dom";

const LessonTable = () => {
  const { addLesson, setAddLesson } = useAdmin();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "#F6F7FC" : null,
    display: isDragging ? "table" : null,
    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      addLesson,
      result.source.index,
      result.destination.index
    );
    setAddLesson(items);
  };

  return (
    <Flex direction="column" mx="40px" my="50px">
      {/* Lesson Heading & Add Lesson Button */}
      <Flex justify="space-between" align="center">
        <Heading variant="headline3" w="933.5px">
          Lesson
        </Heading>
        <Button
          variant="primary"
          onClick={() => {
            navigate("./add-lesson");
          }}
        >
          + Add Lesson
        </Button>
      </Flex>
      {/* Lesson Table */}
      <TableContainer bg="white" borderRadius="8px" mt="40px">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lessons_list">
            {(provided) => {
              return (
                <Table ref={provided.innerRef}>
                  <Thead py="10px" bg="gray.300">
                    <Tr>
                      <Th></Th>
                      <Th></Th>
                      <Th color="gray.800">Lesson name</Th>
                      <Th color="gray.800">Sub-lesson</Th>
                      <Th color="gray.800">Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {addLesson.map((row, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={String(index)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Td w="5%">
                                <Center>
                                  <DragHandleIcon color="#D6D9E4" />
                                </Center>
                              </Td>
                              <Td w="5%" color="black">
                                {index + 1}
                              </Td>
                              <Td w="40%" color="black">
                                {row.lesson_name}
                              </Td>
                              <Td w="40%" color="black">
                                {row.sub_lessons.length}
                              </Td>
                              <Td w="10%">
                                <Flex gap="20%">
                                  <Image
                                    src="../../../assets/admin-page/bin.svg"
                                    alt="bin"
                                    w="24px"
                                    h="24px"
                                    cursor="pointer"
                                    _hover={{ opacity: 0.5 }}
                                    // onClick={() => {
                                    //   course_id = course.course_id;
                                    //   onConfirmModalOpen();
                                    // }}
                                  />
                                  <Image
                                    src="../../../assets/admin-page/edit.svg"
                                    alt="edit"
                                    w="24px"
                                    h="24px"
                                    cursor="pointer"
                                    _hover={{ opacity: 0.5 }}
                                    // onClick={() =>
                                    //   navigate(`/admin/edit-course/${course.course_id}`)
                                    // }
                                  />
                                </Flex>
                              </Td>
                            </Tr>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Tbody>
                </Table>
              );
            }}
          </Droppable>
        </DragDropContext>
      </TableContainer>
    </Flex>
  );
};

export default LessonTable;
