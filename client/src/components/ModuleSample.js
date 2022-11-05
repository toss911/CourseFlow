import {
  Center,
  Box,
  Image,
  Text,
  Heading,
  Button,
  Divider,
  ListItem,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

export const ModuleSample = () => {
  return (
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
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
