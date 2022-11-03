import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Center,
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { NavbarLogin } from '../components/NavbarLogin ';
import { Footer } from '../components/Footer';
import { PreFooter } from '../components/PreFooter';
import { useState } from 'react';
import ReviewSlider from '../components/ReviewSlider.js';
import ReviewNonSlider from '../components/ReviewNonSlider.js';
import { SlideData } from '../data/SlideData.js';

function HomePage() {
  return (
    <>
      {/* //Nav section */}
      {/* //Start Codind here [Sun] */}
      {/* <Navbar /> */}
      <NavbarLogin />

      {/* //-----------------------End Nav section-------------------------// */}
      {/* //Hero section */}
      {/* //Start Codind here [Sun] */}
      <Flex position='relative'>
        <Image
          src='/assets/landing-page/bg/hero.svg'
          alt='background image'
          align='center'
          w='100vw'
        />
        <Flex
          position='absolute'
          mt='180px'
          ml='160px'
          flexDirection='column'
          alignItems='start'
        >
          <Heading variant='headline1' color='black' w='643px'>
            Best Virtual Classroom Software
          </Heading>
          <Text variant='body1' color='grey.700' w='643px' mt='40px' mb='60px'>
            Welcome to Schooler! The one-stop online class management system
            that caters to all your educational needs!
          </Text>
          <Button variant='primary' w='195px'>
            Explore Courses
          </Button>
        </Flex>
      </Flex>

      {/* //-----------------------End Hero section-------------------------// */}
      {/* // Features Section */}
      <Box w='100vw'>
        <Flex className='feature' justify='center' align='center'>
          <Box position='relative'>
            {/* vector images */}
            <Image
              src='/assets/landing-page/features/darkCircle.svg'
              alt='circle'
              position='absolute'
              left='0'
            />
            <Image
              src='/assets/landing-page/features/smallCircle.svg'
              alt='circle'
              position='absolute'
              top='94px'
              left='349px'
            />
            <Image
              src='/assets/landing-page/features/x.svg'
              alt='x'
              position='absolute'
              right='-73px'
              bottom='523px'
            />
            <Image
              src='/assets/landing-page/features/lightCircle.svg'
              alt='circle'
              position='absolute'
              bottom='0'
              right='-39px'
            />
            {/* vector images */}

            <Flex
              flexDirection='column'
              align='flex-start'
              gap='120px'
              pt='161px'
              pb='165px'
            >
              <Flex
                className='feature-1'
                flexDirection='row'
                align='flex-start'
                gap='119px'
              >
                <Image
                  src='/assets/landing-page/features/picture2.png'
                  alt='learning'
                  w='454px'
                  h='330px'
                  borderRadius='8px'
                />
                <Flex
                  flexDirection='column'
                  align='flex-start'
                  padding='0px'
                  gap='40px'
                  w='575px'
                  h='330px'
                >
                  <Heading variant='headline2' color='black'>
                    Learning experience has been enhanced with new technologies
                  </Heading>
                  <Flex
                    flexDirection='column'
                    align='flex-start'
                    padding='0px'
                    gap='24px'
                    w='547px'
                    h='200px'
                  >
                    <Flex
                      flexDirection='row'
                      align='flex-start'
                      padding='0px'
                      gap='24px'
                      w='547px'
                      h='88px'
                    >
                      <Image
                        src='/assets/landing-page/features/secure.svg'
                        alt='secure icon'
                        w='36px'
                        h='36px'
                      />
                      <Flex
                        flexDirection='column'
                        align='flex-start'
                        padding='0px'
                        gap='10px'
                        w='487px'
                        h='88px'
                      >
                        <Heading variant='headline3' color='black'>
                          Secure & Easy
                        </Heading>
                        <Text variant='body2' color='gray.700'>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit es se cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint.
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      flexDirection='row'
                      align='flex-start'
                      padding='0px'
                      gap='24px'
                      w='547px'
                      h='88px'
                    >
                      <Image
                        src='/assets/landing-page/features/heart.svg'
                        alt='heart icon'
                        w='36px'
                        h='36px'
                      />
                      <Flex
                        flexDirection='column'
                        align='flex-start'
                        padding='0px'
                        gap='10px'
                        w='487px'
                        h='88px'
                      >
                        <Heading variant='headline3' color='black'>
                          Support All Student
                        </Heading>
                        <Text variant='body2' color='gray.700'>
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
                className='feature-2'
                flexDirection='row'
                align='flex-start'
                gap='119px'
                padding='0px'
                w='1120px'
                h='330px'
                order='1'
              >
                <Flex
                  flexDirection='column'
                  align='flex-start'
                  padding='0px'
                  gap='40px'
                  w='547px'
                  h='330px'
                >
                  <Heading variant='headline2' color='black'>
                    Interaction between the tutor and the learners
                  </Heading>
                  <Flex
                    flexDirection='column'
                    align='flex-start'
                    padding='0px'
                    gap='24px'
                    w='547px'
                    h='200px'
                  >
                    <Flex
                      flexDirection='row'
                      align='flex-start'
                      padding='0px'
                      gap='24px'
                      w='547px'
                      h='88px'
                    >
                      <Image
                        src='/assets/landing-page/features/secure.svg'
                        alt='secure icon'
                        w='36px'
                        h='36px'
                      />
                      <Flex
                        flexDirection='column'
                        align='flex-start'
                        padding='0px'
                        gap='10px'
                        w='487px'
                        h='88px'
                      >
                        <Heading variant='headline3' color='black'>
                          Purely Collaborative
                        </Heading>
                        <Text variant='body2' color='gray.700'>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit es se cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint.
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex
                      flexDirection='row'
                      align='flex-start'
                      padding='0px'
                      gap='24px'
                      w='547px'
                      h='88px'
                    >
                      <Image
                        src='/assets/landing-page/features/heart.svg'
                        alt='heart icon'
                        w='36px'
                        h='36px'
                      />
                      <Flex
                        flexDirection='column'
                        align='flex-start'
                        padding='0px'
                        gap='10px'
                        w='487px'
                        h='88px'
                      >
                        <Heading variant='headline3' color='black'>
                          Support All Student
                        </Heading>
                        <Text variant='body2' color='gray.700'>
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit es se cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint.
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Image
                  src='/assets/landing-page/features/picture1.png'
                  alt='learning'
                  w='454px'
                  h='330px'
                  borderRadius='8px'
                />
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {/* //-----------------------End Features section-------------------------// */}
      {/* //Instructor section */}
      <Flex mt='105px' flexDirection='column' align='center' justify='center'>
        <Flex position='relative'>
          <Heading w='100%' variant='headline2' color='black'>
            Our Professional Intructor
          </Heading>
          <Image
            src='/assets/landing-page/instructor/triangle.svg'
            alt='triangle'
            w='36.13px'
            h='36.13px'
            position='absolute'
            left='-450px'
            bottom='-600px'
          />
        </Flex>
        <Flex flexDirection='row' align='center' justify='center'>
          <Flex flexDirection='column' align='center' justify='center'>
            <Image
              src='/assets/landing-page/instructor/image-profile-1.svg'
              alt='profile-1'
              w='357px'
              h='420px'
              mt='60px'
            />
            <Heading variant='headline3' mt='24px' color='black'>
              Jane Cooper
            </Heading>
            <Text variant='body2' color='blue.400' mt='8px'>
              UX/UI Designer
            </Text>
          </Flex>
          <Flex
            ml='24px'
            flexDirection='column'
            align='center'
            justify='center'
          >
            <Image
              src='/assets/landing-page/instructor/image-profile-2.svg'
              alt='profile-2'
              w='357px'
              h='420px'
              mt='60px'
            />
            <Heading variant='headline3' mt='24px' color='black'>
              Esther Howard
            </Heading>
            <Text variant='body2' color='blue.400' mt='8px'>
              Program Manager
            </Text>
          </Flex>
          <Flex
            ml='24px'
            flexDirection='column'
            align='center'
            justify='center'
          >
            <Image
              src='/assets/landing-page/instructor/image-profile-3.svg'
              alt='profile-3'
              w='357px'
              h='420px'
              mt='60px'
            />
            <Heading variant='headline3' mt='24px' color='black'>
              Brooklyn Simmons
            </Heading>
            <Text variant='body2' color='blue.400' mt='8px'>
              Software Engineer
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* //-----------------------End Instructor section-------------------------// */}
      {/* //Review section */}
      <Flex
        mt='216px'
        flexDirection='column'
        align='center'
        justify='center'
        position='relative'
      >
        <Image
          src='/assets/landing-page/review/circle-large.svg'
          alt='background-circle-large'
          w='73px'
          h='73px'
          position='absolute'
          right='0px'
          top='-120px'
        />
        <Image
          src='/assets/landing-page/review/circle-small.svg'
          alt='background-circle-small'
          w='26.35px'
          h='26.35px'
          position='absolute'
          right='110px'
          top='-40px'
        />

        <Heading variant='headline2' color='black'>
          Our Graduates
        </Heading>
        {/* //------------------Flex wrapper all reviewer----------------------------------// */}

        <Flex
          w='100vw'
          flexDirection='row'
          align='center'
          justify='center'
          mb='200px'
        >
          {/* -------------Non-Carousel START------------ */}
          {/* <ReviewNonSlider /> */}
          {/* -----------Carousel START ---------------*/}
          <Box w='1440px' mt='61.85px'>
            <ReviewSlider slides={SlideData} />
          </Box>
          <Image
            src='/assets/landing-page/review/plus.svg'
            alt='background-plus'
            w='13.68px'
            h='13.68px'
            position='absolute'
            left='100px'
            bottom='130px'
          />
        </Flex>

        <Image
          src='/assets/landing-page/review/circle-small.svg'
          alt='background-circle-small'
          w='26.35px'
          h='26.35px'
          position='absolute'
          right='110px'
          top='-40px'
        />
      </Flex>

      {/* //-----------------------End Review section-------------------------// */}
      {/* //Pre-Footer section */}
      <PreFooter />

      {/* //-----------------------End Pre-Footer section-------------------------// */}
      {/* //Footer section  */}
      <Footer />
      {/* //-----------------------End Footer section-------------------------// */}
    </>
  );
}

export default HomePage;
