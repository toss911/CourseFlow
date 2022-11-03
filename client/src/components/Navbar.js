import { Link, Flex, Image, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      position="relative"
      wrap="wrap"
      width="full"
      h="88px"
      bg="white"
      boxShadow="shadow2"
      paddingLeft="160px"
      paddingRight="160px"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        w="100%"
      >
        <Image
          src="/assets/landing-page/bg/CourseFlow.svg"
          alt="logo"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
        <HStack spacing="60px">
          <Link color="#191C77" onClick={() => navigate("/courses")}>
            Our Courses
          </Link>

          <Button
            variant="primary"
            ml="20px"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
