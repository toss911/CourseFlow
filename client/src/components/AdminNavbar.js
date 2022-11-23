import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  InputRightElement,
} from "@chakra-ui/react";

const AdminNavbar = (props) => {
  return (
    <Flex
      borderBottom="1px"
      borderColor="gray.400"
      alignItems="center"
      h="92px"
      w="100vw"
    >
      <Heading variant="headline3" w="596px" ml="40px">
        {props.heading}
      </Heading>
      <Flex gap="16px" alignItems="center" w="508px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={
              <Image src="../../assets/admin-page/search.svg" alt="search" />
            }
          />
          <Input
            pl="40px"
            type="text"
            w="320px"
            placeholder="Search..."
            onChange={props.handleSearchText}
          />
        </InputGroup>

        <Button>
          {props.action}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
