import React from "react";
import { Box,  Flex, Text, Image, Tabs, TabList,Tab,Button} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";


export function Sidebar(){
    const navigate = useNavigate();
    const { isAuthenticated, logout, contextState } = useAuth();
    return(
        <Box >
        <Flex w='240px'  
        h='100vh' 
        bgColor='white' 
        flexDirection='column'
        shadow='shadow2'
        position='sticky'>
        <Flex flexDirection='column' alignItems='center' mt='40px'><Image src="/assets/landing-page/footer/Logo.png" w='174px' h='19px'/><Text variant='body2' mt='24px' mb='64px'>Admin Panel Control</Text></Flex>
        <Tabs orientation='vertical' w='240px' isManual variant='enclosed'>
            <TabList >
                <Tab justifyContent='start' _selected={{ color: 'gray.800', bg: 'gray.200' }} w='240px' h='56px'><Image src="/assets/admin-page/course.svg" pr='19px'/>Course</Tab>
                <Tab justifyContent='start' _selected={{ color: 'gray.800', bg: 'gray.200' }} w='240px' h='56px'><Image src="/assets/admin-page/assign.svg" pr='19.75'/>Assignment</Tab>
            </TabList>
        </Tabs>
        <Box mt='484px' as='b' ml='-50px' onClick={() => {logout(); }}>
        <Button bg='white' color='gray.800' shadow='none' _hover='none' w='240px'><Image src="/assets/admin-page/Vector.svg" pr='19px'/>Log out</Button>
        </Box>
        </Flex>
        </Box>
    )
}