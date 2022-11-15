import {
  Flex,
  Box,
  Badge,
  Text,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";

const HomeworkBox = ( {allHomework} ) => {
  console.log(allHomework);

  return (
    <Box>
      {/* {allHomework.map(() => { */}
        <Flex
          flexDirection="column"
          w="1120px"
          h="354px"
          padding="40px, 96px"
          alignItems="center"
          mb="24px"
          backgroundColor="blue.100"
          borderRadius="8px"
        >
          <Flex w="925px" h="66px" mt="40px" gap="24px">
            <Flex flexDirection="column" w="746px" h="66px" gap="12px">
              <Heading variant="headline3">
                Course: Service Design Essentials
              </Heading>
              <Text variant="body2" textColor="gray.700">
                Introduction: 4 Levels of Service Design in an Organization
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              w="155px"
              h="64px"
              gap="12px"
              alignItems="flex-end"
            >
              <Badge variant="pending">
                {/* Change the font style to lowercase */}
                <Text variant="body3">Pending</Text>
              </Badge>
              <Text w="165px" variant="body2" textColor="gray.700">
                Submit within 2 days
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="928px"
            h="172px"
            mt="36px"
            backgroundColor="white"
            borderRadius="8px"
          >
            <Flex
              flexDirection="column"
              w="719px"
              h="124px"
              gap="4px"
              alignItems="flex-start"
              m="24px"
            >
              <label>
                <Text variant="body2" textColor="black">
                  What are the 4 elements of service design?
                </Text>
              </label>

              {/* Move input text to top left of the input box */}
              <Input
                placeholder="Answer here..."
                w="719px"
                h="96px"
                textAlign="start"
              />
              <Button
                variant="secondary"
                pt="0px"
                pb="0px"
                pl="10px"
                pr="10px"
                size="xs"
              >
                Save draft
              </Button>
            </Flex>
            <Flex
              flexDirection="column"
              gap="16px"
              w="137px"
              h="108px"
              mt="40px"
            >
              <Button p="4px">Submit</Button>
              <Button variant="ghost">Open in course</Button>
            </Flex>
          </Flex>
        </Flex>
      {/* })}; */}
    </Box>
  );
};

export default HomeworkBox;
