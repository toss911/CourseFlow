import React,{ useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  Button,
  Container
 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";



export function Sidebar(props) {
  const {index} = props
  const navigate = useNavigate();
  const { logoutAdmin } = useAuth();
  const [selectIndex, setSelectIndex] = useState(index);

  const handleListItemClick = (path, index) => {
    setSelectIndex(index)
    navigate(path);
  };
  return (
    <Box>
      <Flex
        w="240px"
        bgColor="white"
        flexDirection="column"
        borderRight="1px"
        borderColor="gray.400"
        h="100vh"
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
              onClick={()=>handleListItemClick("/admin","0")}
              justifyContent="start"
              _hover={{ bg: "gray.100" }}
              bg= {selectIndex==="0" ? "gray.200" : "white"}
              w="240px"
              h="56px"
            >
                <Image src="/assets/admin-page/course.svg" pr="19px" />
              Courses
            </Tab> 
              
            {/* {selectedIndex !== "0" &&   <Tab
              onClick={()=>handleListItemClick("/admin","0")}
              justifyContent="start"
              _hover={{ bg: "gray.100" }}
              w="240px"
              h="56px"
            >
                <Image src="/assets/admin-page/course.svg" pr="19px" />
              Courses
            </Tab> } */}
          
          
            <Tab
            
            onClick={()=>handleListItemClick("/admin/assignment","1")}
            justifyContent="start"
            _hover={{ bg: "gray.100" }}
            bg= {selectIndex==="1" ? "gray.200": "white"}
            // _selected={{
              // bg: selectIndex === "1" ? "gray.200": "white"
              // color: "gray.800",
              // bg: "gray.200",
              // borderLeft: "0px",
              // borderTop: "0px",
              // borderBottom: "0px",
              // borderRight: "1px",
              // borderColor: "gray.400",
              // borderRadius: "0px",
            // }}
            w="240px"
            h="56px"
          >
            <Image src="/assets/admin-page/assign.svg" pr="19.75" />
            Assignments
          </Tab>
          {/* {selectedIndex !== "1"  && 
            <Tab
            onClick={()=>handleListItemClick("/admin/assignment","1")}
            justifyContent="start"
            _hover={{ bg: "gray.100" }}
           
            w="240px"
            h="56px"
          >
            <Image src="/assets/admin-page/assign.svg" pr="19.75" />
            Assignments
          </Tab>}  */}
           
          </TabList>
        </Tabs>
        <Box
          as="b"
          ml="-45%"
          mt="60vh"
          onClick={() => {
            logoutAdmin();
          }}
        >
          <Button variant="gray" w="100%">
            <Image src="/assets/admin-page/Vector.svg" pr="19px" />
            Log out
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
