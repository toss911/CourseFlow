import {
  Link,
  Flex,
  Image,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Text,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

export const NavbarLogin = () => {
  const navigate = useNavigate();

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
        <HStack spacing='75px'>
          <Link
            color='#191C77'
            fontWeight='700'
            fontSize='16px'
            lineHeight='150%'
            fontStyle='bold'
            onClick={() => navigate("/courses")}
          >
            Our Courses
          </Link>

          <Menu>
            <MenuButton
              as={Button}
              boxShadow='none'
              _hover='none'
              _active='none'
              bg='white'
              color='gray.800'
              rightIcon={<TriangleDownIcon ml='12px' />}
            >
              <Text variant='body2' position='relative'>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src='/assets/landing-page/Icon/Parn.png'
                  alt='Fluffybuns the destroyer'
                  w='40px'
                  h='40px'
                  position='absolute'
                  left='-55px'
                  bottom='-10px'
                  objectFit='cover'
                />
                Eye Yananphat339
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src='/assets/landing-page/Icon/Profile.svg'
                  alt='Fluffybuns the destroyer'
                  mr='12px'
                  w='15px'
                  h='15px'
                />
                Profile
              </MenuItem>
              <MenuItem>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src='/assets/landing-page/Icon/My course.svg'
                  alt='Fluffybuns the destroyer'
                  mr='13px'
                  w='15px'
                  h='15px'
                />
                My courses
              </MenuItem>
              <MenuItem>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src='/assets/landing-page/Icon/Hw.svg'
                  alt='Fluffybuns the destroyer'
                  mr='13px'
                  w='15px'
                  h='15px'
                />
                My Homework
              </MenuItem>
              <MenuItem>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src='/assets/landing-page/Icon/Desire course.svg'
                  alt='Fluffybuns the destroyer'
                  mr='13px'
                  w='15px'
                  h='15px'
                />
                My Desire Courses
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src='/assets/landing-page/Icon/Logout.svg'
                  alt='Fluffybuns the destroyer'
                  mr='13px'
                  w='15px'
                  h='15px'
                />
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Flex>
  );
};
