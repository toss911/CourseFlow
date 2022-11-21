import { Flex, Heading, Input, Button } from "@chakra-ui/react";

const AdminNavbar = (props) => {
  return (
    <Flex
      gap="16px"
      borderBottom="1px"
      borderColor="gray.400"
      alignItems="center"
      h="92px"
      w="100vw"
    >
      <Heading variant="headline3" w="596px" ml="40px">
        {props.heading}
      </Heading>
      <Flex gap="16px" alignItems="center">
        {/* Dont forget to add the icon */}
        <Input w="320px" placeholder="Search..." onChange={props.handleSearchText}/>
        <Button w="172px" h="60px">
          {props.action}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
