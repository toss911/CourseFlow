import { Box, Image, Flex, Text, Heading } from "@chakra-ui/react";

function HomePage() {
  return (<>
    {/* //Nav section */}
    {/* //Start Codind here [Sun] */}
    {/* //-----------------------End Nav section-------------------------// */}
    {/* //Hero section */}
    {/* //Start Codind here [Sun] */}
    {/* //-----------------------End Hero section-------------------------// */}
    {/* // Features Section */}
    
      <Box
        position="relative"
        w="1440px"
        h="1111px"
        flexDirection="column"
        align="flex-start"
      >
        {/* vector images */}
        <Image
          src="/assets/landing-page/features/darkCircle.svg"
          alt="circle"
          position="absolute"
          left="9.72%"
          right="85.21%"
          top="0.002%"
          bottom="89.87%"
        />
        <Image
          src="/assets/landing-page/features/smallCircle.svg"
          alt="circle"
          position="absolute"
          left="35.28%"
          right="62.5%"
          top="8.46%"
          bottom="88.66%"
        />
        <Image
          src="/assets/landing-page/features/x.svg"
          alt="x"
          position="absolute"
          left="1352px"
          top="405.84px"
          w="23px"
          h="23px"
        />
        <Image
          src="/assets/landing-page/features/lightCircle.svg"
          alt="circle"
          position="absolute"
          w="85px"
          h="85px"
          left="1233"
          top="1050"
        />
        {/* vector images */}

        <Flex
          flexDirection="column"
          align="flex-start"
          gap="120px"
          padding="0px"
          w="1120px"
          h="780px"
          position="absolute"
          left="159px"
          top="161px"
        >
          <Flex
            className="feature-1"
            flexDirection="row"
            align="flex-start"
            gap="119px"
            padding="0px"
            w="1120px"
            h="330px"
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
              <Text
                fontSize="34px"
                w="100%"
                h="90px"
                lineHeight="125%"
                fontWeight="500"
              >
                Learning experience has been enhanced with new technologies
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
                      Secure & Easy
                    </Text>
                    <Text variant="body2" w="487px" h="48px" color="gray.700">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint.
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
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint.
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
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint.
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
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint.
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
      {/* //-----------------------End Features section-------------------------// */}
      {/* //Instructor section */}
      <Flex mt="105px" flexDirection="column" align="center" justify="center">
        <Flex>
          <Heading w="100%" variant="headline2" color="black">
            Our Professional Intructor
          </Heading>
        </Flex>
        <Flex flexDirection="row" align="center" justify="center">
          <Flex flexDirection="column" align="center" justify="center">
            <Image
              src="/assets/landing-page/instructor/image-profile-1.svg"
              alt="profile-1"
              w="357px"
              h="420px"
              mt="60px"
            />
            <Heading variant="headline3" mt="24px" color="black">
              Jane Cooper
            </Heading>
            <Text variant="body2" color="blue.400" mt="8px">
              UX/UI Designer
            </Text>
          </Flex>
          <Flex
            ml="24px"
            flexDirection="column"
            align="center"
            justify="center"
          >
            <Image
              src="/assets/landing-page/instructor/image-profile-2.svg"
              alt="profile-2"
              w="357px"
              h="420px"
              mt="60px"
            />
            <Heading variant="headline3" mt="24px" color="black">
              Esther Howard
            </Heading>
            <Text variant="body2" color="blue.400" mt="8px">
              Program Manager
            </Text>
          </Flex>
          <Flex
            ml="24px"
            flexDirection="column"
            align="center"
            justify="center"
          >
            <Image
              src="/assets/landing-page/instructor/image-profile-3.svg"
              alt="profile-3"
              w="357px"
              h="420px"
              mt="60px"
            />
            <Heading variant="headline3" mt="24px" color="black">
              Brooklyn Simmons
            </Heading>
            <Text variant="body2" color="blue.400" mt="8px">
              Software Engineer
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* //-----------------------End Instructor section-------------------------// */}
      {/* //Review section */}
      <Flex mt="105px" flexDirection="column" align="center" justify="center">
        <Heading variant="headline2" color="black">
          Our Graduates
        </Heading>
        <Image
          src="/assets/landing-page/review/profile-student-1.svg"
          alt="profile-3"
          w="200px"
          h="240px"
        />
        <Heading variant="headline3" color="blue.400">
          Saiful Islam
        </Heading>
        <Text variant="body2"></Text>
      </Flex>
      {/* //-----------------------End Review section-------------------------// */}
      {/* //Pre-Footer section //Start Codind here [Chain] */}
      {/* //-----------------------End Pre-Footer section-------------------------// */}
      {/* //Footer section  */}
      {/* //Start Codind here [Chain]  */}
      {/* //-----------------------End Footer section-------------------------// */}
    </>
  );
}
export default HomePage;
