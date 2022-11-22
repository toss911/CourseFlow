import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
} from "@chakra-ui/react";

const AdminNavbarAdd = (props) => {
  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.400"
      alignItems="center"
      h="92px"
      w="vw"
    >
      <Heading variant="headline3" w="852px" ml="40px">
        {props.heading}
      </Heading>

      <Flex gap="16px" w="252px">
        <Button variant="secondary" w="172px" h="60px">
          {props.action}
        </Button>
        <Button w="172px" h="60px">
          {props.action2}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminNavbarAdd;
