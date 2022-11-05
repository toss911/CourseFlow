import {
  Link,
  Flex,
  Image,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, state } = useAuth();

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
        <HStack spacing="75px">
          <Link color="#191C77" onClick={() => navigate("/courses")}>
            Our Courses
          </Link>
          {isAuthenticated ? (
            <Menu>
              <MenuButton bg="white" color="gray.800">
                <HStack spacing="12px">
                  <Image
                    src="/assets/landing-page/Icon/Parn.png"
                    alt="profile picture"
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <Text variant="body2">{state.user.full_name}</Text>
                  <TriangleDownIcon />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Image
                    borderRadius="full"
                    src="/assets/landing-page/Icon/Profile.svg"
                    alt="profile icon"
                    mr="12px"
                    w="15px"
                    h="15px"
                  />
                  Profile
                </MenuItem>
                <MenuItem>
                  <Image
                    borderRadius="full"
                    src="/assets/landing-page/Icon/My course.svg"
                    alt="book icon"
                    mr="13px"
                    w="15px"
                    h="15px"
                  />
                  My courses
                </MenuItem>
                <MenuItem>
                  <Image
                    borderRadius="full"
                    src="/assets/landing-page/Icon/Hw.svg"
                    alt="clipboard icon"
                    mr="13px"
                    w="15px"
                    h="15px"
                  />
                  My Homework
                </MenuItem>
                <MenuItem>
                  <Image
                    borderRadius="full"
                    src="/assets/landing-page/Icon/Desire course.svg"
                    alt="star icon"
                    mr="13px"
                    w="15px"
                    h="15px"
                  />
                  My Desire Courses
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <Image
                    borderRadius="full"
                    src="/assets/landing-page/Icon/Logout.svg"
                    alt="logout icon"
                    mr="13px"
                    w="15px"
                    h="15px"
                  />
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="primary"
              ml="20px"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};
