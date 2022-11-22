import {
  Box,
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
} from "@chakra-ui/react";

const LessonTable = () => {
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
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Text
                    variant="body3"
                    textTransform="capitalize"
                    textColor="gray.800"
                    w="468px"
                  >
                    Lesson name
                  </Text>
                </Th>
                <Th>
                  <Text
                    variant="body3"
                    textTransform="capitalize"
                    textColor="gray.800"
                    w="300px"
                  >
                    Sub-lesson
                  </Text>
                </Th>
                <Th>
                  <Text
                    variant="body3"
                    textTransform="capitalize"
                    textColor="gray.800"
                  >
                    Action
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Image
                    src="../../../assets/admin-page/drag.svg"
                    alt="drag"
                  ></Image>
                </Td>
                <Td>1</Td>
                <Td>Blah blah blah</Td>
                <Td>Blah blah blah</Td>
                <Td>
                  <Flex gap="20px" w="120px">
                    <Image
                      src="../../../assets/admin-page/bin.svg"
                      alt="bin"
                    ></Image>
                    <Image
                      src="../../../assets/admin-page/edit.svg"
                      alt="edit"
                    ></Image>
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default LessonTable;
