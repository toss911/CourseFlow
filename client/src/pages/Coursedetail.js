import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Button,
  Divider,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { NavbarLogin } from '../components/NavbarLogin ';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { PreFooter } from '../components/PreFooter';
import { ModuleSample } from '../components/ModuleSample';
import { PriceCard } from '../components/PriceCard';

function CourseDetail() {
  return (
    <>
      <Navbar />
      {/* <NavbarLogin /> */}

      <Box
        w='100vw'
        pt='100px'
        pl='160px'
        display='flex'
        flexDirection='column'
        position='relative'
      >
        <Image
          src='/assets/CourseDetail/Course1.svg'
          alt='Course picture'
          h='460px'
          w='739px'
          display='flex'
          position='absolute'
        />
        <Box
          display='flex'
          top='0'
          position='sticky'
          pr='160px'
          alignSelf='end'
        >
          <PriceCard />
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
          <Heading mt='100px' color='black' mb='20px'>
            Module Samples
          </Heading>
          {/* //ModuleSample Below// */}
          <Box pb='120px'>
            <ModuleSample />
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        backgroundImage="url('/assets/CourseDetail/BG.svg')"
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
      >
        <Heading variants='headline2' color='black' mt='121px'>
          Other Interesting Courses
        </Heading>
        <Box pb='50px'>
          <CourseCard />
        </Box>
      </Box>
      <PreFooter />
      <Footer />
    </>
  );
}

export default CourseDetail;
