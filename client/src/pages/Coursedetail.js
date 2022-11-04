import {
  Center,
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
  Container,
  Spacer,
  Stack,
  Divider,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { NavbarLogin } from '../components/NavbarLogin ';
import { Footer } from '../components/Footer';

function CourseDetail() {
  return (
    <>
      <Navbar />
      {/* <NavbarLogin /> */}

      <Box
        w='100vw'
        mt='100px'
        ml='160px'
        display='flex'
        flexDirection='column'
      >
        <Box display='flex' flexDirection='row'>
          <Image
            src='/assets/CourseDetail/Course1.svg'
            alt='Course picture'
            h='460px'
            w='739px'
          />

          <Box
            display='flex'
            ml='24px'
            mr='24px'
            alignItems='start'
            justifyContent='start'
            border='10px'
            p='5'
            shadow='md'
            borderWidth='1px'
            flexDirection='column'
            w='357px'
            h='fit-content'
            borderRadius='8px'
            padding='24px'
            gap='20px'
            position='sticky'
            top={0}
            zIndex='docked'
            overflowX='unset'
            overflowY='unset'
          >
            <Text color='orange.500'>Course</Text>
            <Text
              fontSize='24px'
              fontWeight='600'
              lineHeight='125%'
              color='black'
            >
              Service Design Essentials
            </Text>
            <Text variant='body2' w='309px'>
              เนื้อหาภายในหลักสูตร Bootcamp ออนไลน์นี้
              ไม่ได้แค่สอนการเขียนโปรแกรมเพียงอย่างเดียว
              แต่จะครอบคลุมเนื้อหาครบด้านตั้งแต่พื้นฐาน Fundamentals
            </Text>
            <Text
              fontSize='24px'
              fontWeight='600'
              lineHeight='125%'
              color='gray.700'
            >
              THB 3,559.00
            </Text>
            <Divider />
            <Box display='flex' flexDirection='column' gap='16px' w='309px'>
              <Button variant='secondary'>Get In Desire Course</Button>
              <Button variant='primary'>Subscribe This Course</Button>
            </Box>
          </Box>
        </Box>

        <Box display='flex' flexDirection='column' w='548px' gap='24px'>
          <Heading variants='headline2' color='black' mt='100px'>
            Course Detail
          </Heading>

          <Text variants='body2' w='739px' mt='10px'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            aenean fermentum, velit vel, scelerisque morbi accumsan. Nec, tellus
            leo id leo id felis egestas. Quam sit lorem quis vitae ut mus
            imperdiet. Volutpat placerat dignissim dolor faucibus elit ornare
            fringilla. Vivamus amet risus ullamcorper auctor nibh. Maecenas
            morbi nec vestibulum ac tempus vehicula. Vel, sit magna nisl cras
            non cursus. Sed sed sit ullamcorper neque. Dictum sapien amet,
            dictumst maecenas. Mattis nulla tellus ut neque euismod cras amet,
            volutpat purus. Semper purus viverra turpis in tempus ac nunc. Morbi
            ullamcorper sed elit enim turpis. Scelerisque rhoncus morbi pulvinar
            donec at sed fermentum. Duis non urna lacus, sit amet. Accumsan orci
            elementum nisl tellus sit quis. Integer turpis lectus eu blandit
            sit. At at cras viverra odio neque nisl consectetur. Arcu senectus
            aliquet vulputate urna, ornare. Mi sem tellus elementum at commodo
            blandit nunc. Viverra elit adipiscing ut dui, tellus viverra nec.
            Lectus pharetra eget curabitur lobortis gravida gravida eget ut.
            Nullam velit morbi quam a at. Sed eu orci, sociis nulla at sit. Nunc
            quam integer metus vitae elementum pulvinar mattis nulla molestie.
            Quis eget vestibulum, faucibus malesuada eu. Et lectus molestie
            egestas faucibus auctor auctor.
          </Text>
          <Accordion defaultIndex={[0]} allowMultiple w='739px'>
            <AccordionItem>
              <h2>
                <AccordionButton display='flex' w='739px'>
                  <Box
                    flex='1'
                    textAlign='left'
                    fontSize='24px'
                    fontWeight='500'
                    display='flex'
                    color='black'
                  >
                    <Text color='#646D89' display='flex'>
                      01
                    </Text>
                    <Text ml='24px'>{'Introduction'}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel ml='13px' pb={4}>
                <UnorderedList>
                  <ListItem>Welcome to the Course </ListItem>
                  <ListItem> Course Overview </ListItem>
                  <ListItem>Getting to Know You</ListItem>
                  <ListItem>ervice Design vs. UX vs. UI vs. Design</ListItem>
                  <ListItem>
                    Thinking 4 Levels of Service Design in an Organization{' '}
                  </ListItem>
                  <ListItem>
                    Scope of Service Design Develop an Entirely New Service - U
                    Drink I Drive
                  </ListItem>
                  <ListItem>
                    Improving Existing Services - Credit Card{' '}
                  </ListItem>
                  <ListItem>Improving Existing Services - MK</ListItem>
                  <ListItem>Levels of Impact</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton w='739px'>
                  <Box
                    flex='1'
                    textAlign='left'
                    fontSize='24px'
                    fontWeight='500'
                    color='black'
                    display='flex'
                  >
                    <Text color='#646D89'>02</Text>

                    <Text ml='24px'>
                      {'Service Design Theories and Principles'}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel ml='13px' pb={4}>
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton w='739px'>
                  <Box
                    flex='1'
                    textAlign='left'
                    fontSize='24px'
                    fontWeight='500'
                    display='flex'
                    color='#646D89'
                  >
                    03
                    <Text color='black' ml='24px'>
                      {'Understanding Users and Finding Opportunities'}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel ml='13px' pb={4}>
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton w='739px'>
                  <Box
                    flex='1'
                    textAlign='left'
                    fontSize='24px'
                    fontWeight='500'
                    color='#646D89'
                    display='flex'
                  >
                    04
                    <Text color='black' ml='24px'>
                      {'Identifying and Validating Opportunities for Design'}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel ml='13px' pb={4}>
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton w='739px'>
                  <Box
                    flex='1'
                    textAlign='left'
                    fontSize='24px'
                    fontWeight='500'
                    color='#646D89'
                    display='flex'
                  >
                    05
                    <Text color='black' ml='24px'>
                      {'Prototyping'}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel ml='13px' pb={4}>
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton w='739px'>
                  <Box
                    flex='1'
                    textAlign='left'
                    fontSize='24px'
                    fontWeight='500'
                    color='#646D89'
                    display='flex'
                  >
                    06
                    <Text color='black' ml='24px'>
                      {'Course Summary'}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel ml='13px' pb={4}>
                <UnorderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>

      <Image
        src='/assets/CourseDetail/BG.svg'
        alt='Course picture'
        h='792px'
        w='1440px'
      />
      <Container w='100vw'>
        <Heading variants='headline2' mt='120px' color='black'>
          Other Interesting Courses
        </Heading>
      </Container>
      <Footer />
    </>
  );
}

export default CourseDetail;
