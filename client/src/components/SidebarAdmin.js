import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Tabs,
  TabList,
  Tab,
  Button,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

export function Sidebar() {
  const navigate = useNavigate();
  const {logoutAdmin } = useAuth();
  return (
    <Box>
      <Flex
        w="240px"
        h="100vh"
        bgColor="white"
        flexDirection="column"
        borderRight="1px"
        borderColor="gray.400"
        position="sticky"
      >
        <Flex flexDirection="column" alignItems="center" mt="40px">
          <Image src="/assets/admin-page/CourseFlow.svg" w="174px" h="19px" />
          <Text variant="body2" mt="24px" mb="64px">
            Admin Panel Control
          </Text>
        </Flex>
        <Tabs orientation="vertical" w="240px" isManual variant="enclosed">
          <TabList>
            <Tab
              justifyContent="start"
              _selected={{
                color: "gray.800",
                bg: "gray.200",
                borderLeft: "0px",
                borderTop: "0px",
                borderBottom: "0px",
                borderRight: "1px",
                borderColor: "gray.400",
                borderRadius: "0px",
              }}
              w="240px"
              h="56px"
            >
              <Image src="/assets/admin-page/course.svg" pr="19px" />
              Courses
            </Tab>
            <Tab
              justifyContent="start"
              _selected={{
                color: "gray.800",
                bg: "gray.200",
                borderLeft: "0px",
                borderTop: "0px",
                borderBottom: "0px",
                borderRight: "1px",
                borderColor: "gray.400",
                borderRadius: "0px",
              }}
              w="240px"
              h="56px"
            >
              <Image src="/assets/admin-page/assign.svg" pr="19.75" />
              Assignments
            </Tab>
          </TabList>
        </Tabs>
        <Box as="b" ml="-45%" mt="60vh" onClick={() => {
                    logoutAdmin();
                  }}>
          <Button variant="gray" w="100%">
            <Image src="/assets/admin-page/Vector.svg" pr="19px" />
            Log out
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}