import { Box, Image, Text, Flex, Button, Divider } from '@chakra-ui/react';

export const PriceCard = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      ml='24px'
      mr='24px'
      border='10px'
      p='5'
      shadow='md'
      borderRadius='8px'
      w='fit-content'
      h='fit-content'
      gap='20px'
      position='sticky'
    >
      <Text color='orange.500'>Course</Text>
      <Text fontSize='24px' fontWeight='600' lineHeight='125%' color='black'>
        Service Design Essentials
      </Text>
      <Text variant='body2' w='309px'>
        เนื้อหาภายในหลักสูตร Bootcamp ออนไลน์นี้
        ไม่ได้แค่สอนการเขียนโปรแกรมเพียงอย่างเดียว
        แต่จะครอบคลุมเนื้อหาครบด้านตั้งแต่พื้นฐาน Fundamentals
      </Text>
      <Text fontSize='24px' fontWeight='600' lineHeight='125%' color='gray.700'>
        THB 3,559.00
      </Text>
      <Divider />
      <Box display='flex' flexDirection='column' gap='16px' w='309px'>
        <Button variant='secondary'>Get In Desire Course</Button>
        <Button variant='primary'>Subscribe This Course</Button>
      </Box>
    </Box>
  );
};
