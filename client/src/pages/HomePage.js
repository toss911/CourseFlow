import { Box, Image, Flex, Text, Heading } from "@chakra-ui/react";

function HomePage() {
  return (
    //Nav section
    //Start Codind here [Sun]
    //-----------------------End Nav section-------------------------//
    //Hero section
    //Start Codind here [Sun]
    //-----------------------End Hero section-------------------------//
    //Features section
    //Start Codind here [Eye]
    <Box w="100vw">
      <Flex className="feature" justify="center" align="center">
        <Box position="relative">
          {/* vector images */}
          <Image
            src="/assets/landing-page/features/darkCircle.svg"
            alt="circle"
            position="absolute"
            left="0"
          />
          <Image
            src="/assets/landing-page/features/smallCircle.svg"
            alt="circle"
            position="absolute"
            top="94px"
            left="349px"
          />
          <Image
            src="/assets/landing-page/features/x.svg"
            alt="x"
            position="absolute"
            right="-73px"
            bottom="523px"
          />
          <Image
            src="/assets/landing-page/features/lightCircle.svg"
            alt="circle"
            position="absolute"
            bottom="0"
            right="-39px"
          />
          {/* vector images */}

          <Flex
            flexDirection="column"
            align="flex-start"
            gap="120px"
            pt="161px"
            pb="123px"
          >
            <Flex
              className="feature-1"
              flexDirection="row"
              align="flex-start"
              gap="119px"
            >
              <Image
                src="/assets/landing-page/features/picture2.png"
                alt="learning"
                w="454px"
                h="330px"
                borderRadius="8px"
              />
              <Flex
                flexDirection="column"
                align="flex-start"
                padding="0px"
                gap="40px"
                w="547px"
                h="330px"
              >
                <Heading variant="headline2" color="black">
                  Learning experience has been enhanced with new technologies
                </Heading>
                <Flex
                  flexDirection="column"
                  align="flex-start"
                  padding="0px"
                  gap="24px"
                  w="547px"
                  h="200px"
                >
                  <Flex
                    flexDirection="row"
                    align="flex-start"
                    padding="0px"
                    gap="24px"
                    w="547px"
                    h="88px"
                  >
                    <Image
                      src="/assets/landing-page/features/secure.svg"
                      alt="secure icon"
                      w="36px"
                      h="36px"
                    />
                    <Flex
                      flexDirection="column"
                      align="flex-start"
                      padding="0px"
                      gap="10px"
                      w="487px"
                      h="88px"
                    >
                      <Text
                        fontSize="24px"
                        fontWeight="500"
                        letterSpacing="-0.02em"
                      >
                        Secure & Easy
                      </Text>
                      <Text variant="body2" w="487px" h="48px" color="gray.700">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit es se cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint.
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="row"
                    align="flex-start"
                    padding="0px"
                    gap="24px"
                    w="547px"
                    h="88px"
                  >
                    <Image
                      src="/assets/landing-page/features/heart.svg"
                      alt="heart icon"
                      w="36px"
                      h="36px"
                    />
                    <Flex
                      flexDirection="column"
                      align="flex-start"
                      padding="0px"
                      gap="10px"
                      w="487px"
                      h="88px"
                    >
                      <Text
                        fontSize="24px"
                        fontWeight="500"
                        letterSpacing="-0.02em"
                      >
                        Support All Student
                      </Text>
                      <Text variant="body2" w="487px" h="48px" color="gray.700">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit es se cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint.
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              className="feature-2"
              flexDirection="row"
              align="flex-start"
              gap="119px"
              padding="0px"
              w="1120px"
              h="330px"
              order="1"
            >
              <Flex
                flexDirection="column"
                align="flex-start"
                padding="0px"
                gap="40px"
                w="547px"
                h="330px"
              >
                <Text fontSize="34px" w="547px" h="90px" fontWeight="500">
                  Interaction between the tutor and the learners
                </Text>
                <Flex
                  flexDirection="column"
                  align="flex-start"
                  padding="0px"
                  gap="24px"
                  w="547px"
                  h="200px"
                >
                  <Flex
                    flexDirection="row"
                    align="flex-start"
                    padding="0px"
                    gap="24px"
                    w="547px"
                    h="88px"
                  >
                    <Image
                      src="/assets/landing-page/features/secure.svg"
                      alt="secure icon"
                      w="36px"
                      h="36px"
                    />
                    <Flex
                      flexDirection="column"
                      align="flex-start"
                      padding="0px"
                      gap="10px"
                      w="487px"
                      h="88px"
                    >
                      <Text
                        fontSize="24px"
                        fontWeight="500"
                        letterSpacing="-0.02em"
                      >
                        Purely Collaborative
                      </Text>
                      <Text variant="body2" w="487px" h="48px" color="gray.700">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit es se cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint.
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="row"
                    align="flex-start"
                    padding="0px"
                    gap="24px"
                    w="547px"
                    h="88px"
                  >
                    <Image
                      src="/assets/landing-page/features/heart.svg"
                      alt="heart icon"
                      w="36px"
                      h="36px"
                    />
                    <Flex
                      flexDirection="column"
                      align="flex-start"
                      padding="0px"
                      gap="10px"
                      w="487px"
                      h="88px"
                    >
                      <Text
                        fontSize="24px"
                        fontWeight="500"
                        letterSpacing="-0.02em"
                      >
                        Support All Student
                      </Text>
                      <Text variant="body2" w="487px" h="48px" color="gray.700">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit es se cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint.
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Image
                src="/assets/landing-page/features/picture1.png"
                alt="learning"
                w="454px"
                h="330px"
                borderRadius="8px"
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
//-----------------------End Features section-------------------------//

//Instructor section
//-----------------------End Instructor section-------------------------//
//Review section
//Start Codind here [Bank]
//-----------------------End Review section-------------------------//
//Pre-Footer section
//Start Codind here [Chain]
//-----------------------End Pre-Footer section-------------------------//
//Footer section
//Start Codind here [Chain]
//-----------------------End Footer section-------------------------//

export default HomePage;
