import React from "react";
import { Flex, List, ListItem, Box, Button } from "@chakra-ui/react";
const Pagination = ({ coursesPerPage, totalCourses, paginate, page }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination">
      <List display="flex" gap="4px">
        <Box
          border="solid"
          borderColor="blue.200"
          p="1.5"
          _hover={{
            background: "blue.200",
            border: "solid 1px",
            borderColor: "blue.200",
          }}
          _active={{ borderColor: "blue.400" }}
          _focus={{ borderColor: "blue.200", background: "blue.400" }}
          onClick={() => paginate(page - 1)}
        >
          Previous{" "}
        </Box>
        {pageNumber.map((number) => (
          <ListItem
            key={number}
            border="solid"
            borderColor="blue.200"
            p="1.5"
            textAlign="center"
            background="white"
            _hover={{
              background: "blue.200",
              border: "solid 1px",
              borderColor: "blue.200",
            }}
            _active={{ borderColor: "blue.400" }}
            _focus={{ borderColor: "blue.200", background: "blue.400" }}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </ListItem>
        ))}
        <Box
          border="solid"
          borderColor="blue.200"
          p="1.5"
          _hover={{
            background: "blue.200",
            border: "solid 1px",
            borderColor: "blue.200",
          }}
          _active={{ borderColor: "blue.400" }}
          _focus={{ borderColor: "blue.200", background: "blue.400" }}
          onClick={() => paginate(page + 1)}
        >
          Next
        </Box>
      </List>
    </div>
  );
};

export default Pagination;
