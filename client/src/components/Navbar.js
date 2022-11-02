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
      box-shadow='2px 2px 12px rgba(64, 50, 133, 0.12)'
    >
      <Flex alignItems='center' flexDirection='row'>
        <Image
          ml='160px'
          src='/assets/landing-page/bg/CourseFlow.svg'
          alt='logo'
        />
        <HStack spacing='60px' ml='1013px'>
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
