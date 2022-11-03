import {
  Center,
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { NavbarLogin } from "../components/NavbarLogin ";

function RegisterPage() {
  return (
    <>
      <Navbar />
      {/* <NavbarLogin /> */}
      <Flex>
        <Heading variant="headline2" color="#22269E">
          Register to start learning!
        </Heading>
      </Flex>
    </>
  );
}

export default RegisterPage;
