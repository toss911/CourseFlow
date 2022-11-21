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
import { SearchIcon } from "@chakra-ui/icons";

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
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={
              <Image src="../../assets/admin-page/search.svg" alt="search" />
            }
          />
          <Input
            type="text"
            w="320px"
            placeholder="Search..."
            onChange={props.handleSearchText}
          />
        </InputGroup>

        <Button w="172px" h="60px">
          {props.action}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
