import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Input,
  Button,
  Textarea,
  Spacer,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer.js";
function LearningPage() {
  return (
    <>
      <Navbar />
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border="1px"
          borderColor="gray.500"
          width="357px"
          height="500px"
          mr="25px"
        >
          Side Bar
        </Flex>
        <Flex flexDirection="column" alignItems="start" width="739px">
          <Heading mb="33px" mt="100px" variant="headline2">
            Scope of Service Design
          </Heading>
          <Image src="/assets/learning-page/video-mock.svg" alt="video-mock" />
          <Flex
            bg="blue.100"
            width="739px"
            flexDirection="column"
            alignItems="start"
            mt="80px"
            mb="100px"
            pl="24px"
            borderRadius="8px"
          >
            <Flex
              flexDirection="row"
              alignItems="start"
              mt="24px"
              width="691px"
            >
              <Text variant="body1">Assignment</Text>
              <Spacer />
              <Text fontSize="16px" fontWeight="500" mt="3px">
                Pending
              </Text>
            </Flex>
            <Text variant="body2" mt="25px">
              What are the service design?
            </Text>
            <Textarea
              mt="4px"
              width="691px"
              height="100px"
              resize="none"
              placeholder="Answer..."
              size="16px"
              fontWeight="400"
              bg="white"
              p="12px 16px 12px 12px"
              border="1px solid"
              borderColor="gray.400"
              borderRadius="8px"
              _focus={{ borderColor: "gray.100" }}
            ></Textarea>
            <Button mt="25px" mb="24px" width="210px" height="60px">
              Send Assignment
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default LearningPage;
