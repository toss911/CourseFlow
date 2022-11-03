import React from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

export function PreFooter() {
    return (
<Box
  w="100%"
  h="500px"
  bgGradient="linear(to-l, #5697FF 7.78%, #2558DD 73.86%)"
  position="relative"
>
  <Image
    position="absolute"
    top="128px"
    right="51.6px"
    src="/assets/landing-page/footer/asset.png"
    arc="asset"
  />

  <Box textColor="#FFFFFF">
    <Flex
      flexDirection="column"
      position="absolute"
      top="125px"
      left="161px"
    >
      <Heading variant='headline2' pb="44px">
        Interested in Becoming <br />a Software Developer?
      </Heading>
      <Button
        height="60px"
        width="240px"
       variant='secondary'>
        Check Out Our Course
      </Button>
    </Flex>
    <Image
      position="absolute"
      top="48px"
      bottom="2.28px"
      right="159px"
      src="/assets/landing-page/footer/vector.png"
      arc="vector"
    />
  </Box>
</Box>

  );
}