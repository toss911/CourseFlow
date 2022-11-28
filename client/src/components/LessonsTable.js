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
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";

const LessonTable = () => {
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

  // list telling Dnd which items index
  const [list, setList] = React.useState(data);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // function that let Dnd reorder after drag
  const onEnd = (result) => {
    console.log(result);
    setList(reorder(list, result.source.index, result.destination.index));
  };
  return (
    <>
      <Flex flexDirection="column" mt="29px" ml="39px">
        <Flex gap="16px" alignItems="center">
          <Heading variant="headline3" w="933.5px">
            Lesson
          </Heading>
          <Button variant="primary">+ Add Lesson</Button>
        </Flex>

        <TableContainer borderRadius="8px" w="1120px" mt="43px" mb="58px">
          <Table variant="simple" backgroundColor="white">
            <Thead backgroundColor="gray.300">
              <Grid templateColumns="repeat(13, 1fr)" gap={20}>
                <GridItem colSpan={2} h="10"></GridItem>
                <GridItem
                  colSpan={1}
                  // bg="red.100"
                  alignSelf="center"
                  justifySelf="start"
                  ml="10px"
                  variant="body3"
                >
                  Lesson name
                </GridItem>

                <GridItem
                  colSpan={5}
                  alignSelf="center"
                  justifySelf="end"
                  variant="body3"
                >
                  Sub-lesson
                </GridItem>

                <GridItem
                  colSpan={5}
                  justifySelf="end"
                  alignSelf="center"
                  mr="50px"
                  variant="body3"
                >
                  Action
                </GridItem>
              </Grid>
            </Thead>

            {/* // dnd start here onEnd to tell Dnd to stop after </DragDropContext> */}
            <Flex>
              <DragDropContext onDragEnd={onEnd}>
                <Droppable droppableId="1234" type="PERSON">
                  {(provided, snapshot) => (
                    <Box
                      flexWrap="wrap"
                      colSpan="3"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {list.map((item, index) => (
                        <Draggable
                          colSpan="3"
                          draggableId={item.id.toString()}
                          index={index}
                          key={item.id}
                        >
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              display="flex"
                              colSpan="3"
                              flexDirection="row"
                            >
                              <Tbody colSpan={3}>
                                <Tr>
                                  <Td>
                                    <DragHandleIcon></DragHandleIcon>
                                  </Td>

                                  <Td>{item.id}</Td>
                                  <Grid
                                    templateColumns="repeat(16, 6fr)"
                                    gap={10}
                                  >
                                    <GridItem colSpan={1} h="10"></GridItem>
                                    <GridItem alignSelf="center" colSpan={4}>
                                      {item.title}
                                    </GridItem>
                                    <GridItem colSpan={3}></GridItem>
                                    <GridItem
                                      alignSelf="center"
                                      justifySelf="start"
                                      colSpan={1}
                                      mr="40px"
                                    >
                                      {item.name}
                                    </GridItem>
                                    <GridItem colSpan={5}></GridItem>
                                    <GridItem
                                      display="flex"
                                      alignSelf="center"
                                      gap="15px"
                                    >
                                      <Image
                                        src="../../../assets/admin-page/bin.svg"
                                        alt="bin"
                                      ></Image>

                                      <Image
                                        src="../../../assets/admin-page/edit.svg"
                                        alt="edit"
                                      ></Image>
                                    </GridItem>
                                  </Grid>
                                </Tr>
                              </Tbody>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {/* placeholder is the container let Dnd know where the end of drag is */}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Flex>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default LessonTable;
