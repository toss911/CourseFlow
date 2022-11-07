import React from "react";
import { Flex, List, ListItem } from "@chakra-ui/react";
const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination">
      
        <List display="flex" gap="4px">
        {pageNumber.map((number) => (
          <ListItem key={number} border="solid" borderRadius="full" borderColor="blue.200" p="1.5" pt="0" pb="0" textAlign="center" _hover={{
            background: "blue.200",
            border: "solid 1px",
            borderColor: "blue.300",
          }}>
            <a onClick={()=> paginate(number)}  className="page-link">
              {number}
            </a>
          </ListItem>
        ))}
        </List>
      
    </div>
  );
};

export default Pagination;
