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

const data = [
  {
    id: 1,
    title: "aaaaaaa",
    name: "11 ",
  },
  {
    id: 2,
    title: "bbbssssvv",
    name: "12 ",
  },
  {
    id: 3,
    title: "cccvvvvvvv",
    name: "13",
  },
];

const LessonTable = () => {
  const { addLesson } = useAdmin();
  const [rows, setRows] = useState(data);

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
    const items = reorder(rows, result.source.index, result.destination.index);
    setRows(items);
  };

  return (
    <Flex direction="column" mx="40px" my="50px">
      {/* Lesson Heading & Add Lesson Button */}
      <Flex justify="space-between" align="center">
        <Heading variant="headline3" w="933.5px">
          Lesson
        </Heading>
        <Button variant="primary">+ Add Lesson</Button>
      </Flex>
      {/* Lesson Table */}
      <TableContainer bg="white" borderRadius="8px" mt="40px">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lessons_list">
            {(provided) => {
              return (
                <Table ref={provided.innerRef}>
                  <Thead py="10px" bg="gray.300" color="gray.800">
                    <Tr>
                      <Th></Th>
                      <Th></Th>
                      <Th>Lesson name</Th>
                      <Th>Sub-lesson</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {rows.map((row, index) => {
                      return (
                        <Draggable
                          key={row.id}
                          draggableId={String(row.id)}
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
                                  <DragHandleIcon />
                                </Center>
                              </Td>
                              <Td w="5%">{index + 1}</Td>
                              <Td w="40%">{row.title}</Td>
                              <Td w="40%">{row.title}</Td>
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
