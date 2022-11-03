import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { NavbarLogin } from "../components/NavbarLogin ";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
    if (e.target.value !== "") {
      setIsErrorEmail(false);
    } else {
      setIsErrorEmail(true);
    }
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
    if (e.target.value !== "") {
      setIsErrorPassword(false);
    } else {
      setIsErrorPassword(true);
    }
  };

  const navigate = useNavigate();

  return (
    <Box
      w="100vw"
      h="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgImage="url('/assets/login-page/bg-login.svg')"
      backgroundSize="cover"
      backgroundPosition="center"
      overflowY="hidden"
    >
      <Navbar />
      <Flex
        pt="12%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading variant="headline2" color="blue.500">
            Welcome Back!
          </Heading>

          <FormControl isInvalid={isErrorEmail}>
            <Flex flexDirection="column" justifyContent="flex-start">
              <FormLabel variant="body2" color="black" pt="37px">
                Email
              </FormLabel>
              <Input
                mt="4px"
                type="email"
                w="453px"
                h="48px"
                placeholder="Enter Email"
                value={inputEmail}
                onChange={handleEmailChange}
              />
              {!isErrorEmail ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}

              <FormControl isInvalid={isErrorPassword}>
                <FormLabel variant="body2" color="black" pt="40px">
                  Password
                </FormLabel>
                <Input
                  mt="4px"
                  type="password"
                  w="453px"
                  h="48px"
                  placeholder="Enter Password"
                  value={inputPassword}
                  onChange={handlePasswordChange}
                />
                {!isErrorPassword ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>
              <Button variant="primary" mt="40px" w="453px" h="60px">
                Log in
              </Button>
              <Text as="b" mt="44px">
                Don't have an account?
                <Link pl="12px" onClick={() => navigate("/register")}>
                  Register
                </Link>
              </Text>
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Login;
