import React from "react";
import {
    Box,
    Image,
    Flex,
    Text,
    Button,
} from "@chakra-ui/react";

export function Footer() {
    return (
        <Box>
            <Flex
                w="100%"
                h="240px"
                bg="#183056"
                alignItems="center"
                justifyContent="space-around"
            >
                <Box>
                    <Image src="./assets/landing-page/footer/Logo.png" />
                </Box>

                <Flex>
                    <Text color="#C8CCDB">All Course</Text>
                    <Text color="#C8CCDB" pl="132px">
                        Bundle Package
                    </Text>
                </Flex>

                <Flex flexDirection="row">
                    <Image pr="16px" src="/assets/landing-page/footer/fb.png" />
                    <Image pr="16px" src="/assets/landing-page/footer/ig.png" />
                    <Image src="/assets/landing-page/footer/tw.png" />
                </Flex>
            </Flex>
        </Box>
    )
}