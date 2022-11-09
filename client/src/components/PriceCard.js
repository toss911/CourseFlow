import { Box, Text, Button, Divider } from "@chakra-ui/react";
import { useAuth } from "../contexts/authentication.js";
import { useNavigate } from "react-router-dom";

export const PriceCard = (props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      ml="24px"
      border="10px"
      p="5"
      shadow="md"
      borderRadius="8px"
      w="fit-content"
      h="fit-content"
      gap="20px"
      position="sticky"
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
      <Divider borderColor="gray.300" />
      <Box display="flex" flexDirection="column" gap="16px" w="309px">
        <Button
          variant="secondary"
          onClick={() => {
            if (!isAuthenticated) {
              navigate("/login");
            } else {
              // สร้าง Request ไปหา Server
            }
          }}
        >
          Get In Desire Course
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (!isAuthenticated) {
              navigate("/login");
            } else {
              // สร้าง Request ไปหา Server
            }
          }}
        >
          Subscribe This Course
        </Button>
      </Box>
    </Box>
  );
};
