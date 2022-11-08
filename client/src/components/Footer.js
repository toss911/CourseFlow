import React from 'react';
import { Box, Image, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  return (
    <Box>
      <Flex
        w='100%'
        h='240px'
        bg='#183056'
        alignItems='center'
        justifyContent='space-around'
      >
        <Box>
          <Image src='/assets/landing-page/footer/Logo.png' />
        </Box>

        <Flex>
          <Text
            variant='body2'
            color='#C8CCDB'
            onClick={() => {
              navigate('/courses');
              window.scrollTo(0, 0);
            }}
            cursor='pointer'
          >
            All Courses
          </Text>
          <Text variant='body2' color='#C8CCDB' pl='132px'>
            Bundle Package
          </Text>
        </Flex>

        <Flex flexDirection='row'>
          <Image pr='16px' src='/assets/landing-page/footer/fb.png' />
          <Image pr='16px' src='/assets/landing-page/footer/ig.png' />
          <Image src='/assets/landing-page/footer/tw.png' />
        </Flex>
      </Flex>
    </Box>
  );
}
