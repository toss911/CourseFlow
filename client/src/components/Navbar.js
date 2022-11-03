import { Link, Flex, Image, Button, HStack } from '@chakra-ui/react';
import React from 'react';

export const Navbar = () => {
  return (
    <Flex
      position='relative'
      wrap='wrap'
      width='full'
      h='88px'
      bg='white'
      boxShadow='shadow2'
      paddingLeft='160px'
      paddingRight='160px'
    >
      <Flex
        alignItems='center'
        justifyContent='space-between'
        flexDirection='row'
        w='100%'
      >
        <Image src='/assets/landing-page/bg/CourseFlow.svg' alt='logo' />
        <HStack spacing='60px'>
          <Link
            color='#191C77'
            fontWeight='700'
            fontSize='16px'
            lineHeight='150%'
            fontStyle='bold'
          >
            Our Courses
          </Link>

          <Button variant='primary' ml='20px'>
            Log in
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
