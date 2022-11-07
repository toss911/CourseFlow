import { Box, Image, Text, Heading, Button, Divider } from "@chakra-ui/react";

export const PriceCard = (props) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      ml='24px'
      border='10px'
      p='5'
      shadow='md'
      borderRadius='8px'
      w='fit-content'
      h='fit-content'
      gap='20px'
      position='sticky'
    >
      <Text color="orange.500">Courses</Text>
      <Text fontSize="24px" fontWeight="600" lineHeight="125%" color="black">
        {props.courseName}
      </Text>
      <Text variant="body2" w="309px">
        {props.courseContent}
      </Text>
      <Text fontSize="24px" fontWeight="600" lineHeight="125%" color="gray.700">
        THB {props.coursePrice}
      </Text>
      <Divider />
      <Box display="flex" flexDirection="column" gap="16px" w="309px">
        <Button variant="secondary">Get In Desire Course</Button>
        <Button variant="primary">Subscribe This Course</Button>
      </Box>
    </Box>
  );
};
