import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = (props) => {
  const navigate = useNavigate();

  return (
    <Flex
      w="100%"
      h="92px"
      bg="white"
      justify="space-between"
      align="center"
      px="40px"
      borderBottom="1px"
      borderColor="gray.400"
    >
      <Heading variant="headline3">{props.heading}</Heading>
      <Flex align="center">
        <Flex mr="16px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <Image src="../../assets/admin-page/search.svg" alt="search" />
              }
            />
            <Input
              pl="40px"
              w="320px"
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                props.setSearchText(event.target.value);
              }}
              value={props.searchText}
            />
          </InputGroup>
        </Flex>
        <Button onClick={() => navigate(`./${props.url}`)}>
          {props.action}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminNavbar;
