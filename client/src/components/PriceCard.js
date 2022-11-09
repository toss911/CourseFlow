import {
  Box,
  Text,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../contexts/authentication.js";
import { useNavigate } from "react-router-dom";

export const PriceCard = (props) => {
  const [modalMsg, setModalMsg] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddCourse = () => {
    onOpen();
  };

  const handleSubscribe = () => {
    setModalMsg({
      detail: `Do you want to subscribe ${props.courseName} Course?`,
      cancelButton: `No, I am not`,
      confirmButton: `Yes, I want to subscribe`,
    });
    onOpen();
  };

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
        THB{" "}
        {props.coursePrice.toLocaleString("en", { minimumFractionDigits: 2 })}
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
              handleAddCourse();
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
              handleSubscribe();
            }
          }}
        >
          Subscribe This Course
        </Button>
      </Box>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={() => navigate("/login")}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="24px">
          <ModalHeader
            bg="blue.500"
            color="white"
            textAlign="center"
            borderRadius="24px 24px 0px 0px"
            fontSize="1.5rem"
          >
            Confirmation
          </ModalHeader>
          <ModalBody textAlign="center" mt="1em" color="black" fontSize="1rem">
            Do you sure to subscribe
            <Box mt="24px">
              <Button variant="secondary" mr={3} onClick={onClose}>
                No, I don't
              </Button>
              <Button variant="primary" mr={3} onClick={onClose}>
                Yes, I want to subscribe
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
