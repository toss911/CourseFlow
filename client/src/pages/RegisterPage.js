import {
  Center,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.js";
import { Field, Form, Formik } from "formik";

function RegisterPage() {
  const { register } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
      firstName,
      lastName,
    };
    register(data);
  };
  const [inputName, setInputName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputEducate, setInputEducate] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorDate, setIsErrorDate] = useState(false);
  const [isErrorEducate, setIsErrorEducate] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (/^[a-z ,.'-]+$/i.test(value)) {
      error = `Name must only contain alphabets and some special characters\n(e.g., comma, dot, apostrophe, and hyphen)`;
    }
  };

  const handleNameChange = (e) => {
    setInputName(e.target.value);
    if (/^[a-z ,.'-]+$/i.test(e.target.value)) {
      setIsErrorName(false);
    } else {
      setIsErrorName(true);
    }
  };

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
    if (e.target.value !== "") {
      setIsErrorDate(false);
    } else {
      setIsErrorDate(true);
    }
  };
  const handleEducateChange = (e) => {
    setInputEducate(e.target.value);
    if (e.target.value !== "") {
      setIsErrorEducate(false);
    } else {
      setIsErrorEducate(true);
    }
  };
  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e.target.value)) {
      setIsErrorEmail(false);
    } else {
      setIsErrorEmail(true);
    }
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)) {
      setIsErrorPassword(false);
    } else {
      setIsErrorPassword(true);
    }
  };

  return (
    <Box
      w="100vw"
      h="120vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgImage="url('/assets/login-page/bg-login.svg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Navbar />
      <Flex
        pt="10%"
        pb="10%"
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
            Register to start learning!
          </Heading>
          <Formik onSubmit={handleSubmit}>
            {/* //------------------------- Input Name --------------------// */}
            <Flex flexDirection="column" justifyContent="flex-start">
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel variant="body2" color="black" pt="37px">
                  Name
                </FormLabel>
                <Input
                  type="text"
                  w="453px"
                  h="48px"
                  placeholder="Enter First Name and Last Name"
                  value={inputName}
                  onChange={handleNameChange}
                />
                {!isErrorName ? (
                  <FormHelperText>&nbsp;</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Name must only contain alphabets and some special characters
                    <br />
                    (e.g., comma, dot, apostrophe, and hyphen)
                  </FormErrorMessage>
                )}
              </FormControl>

              {/* //-------------------------- Input Date --------------------// */}
              <FormControl isInvalid={isErrorDate} isRequired>
                <FormLabel variant="body2" color="black" pt="20px">
                  Date of Birth
                </FormLabel>
                <div
                  style={{
                    position: "relative",
                    float: "left",
                  }}
                >
                  <Input
                    color="#9AA1B9"
                    type="date"
                    w="453px"
                    h="48px"
                    placeholder="MM/DD/YYYY"
                    value={inputDate}
                    onChange={handleDateChange}
                    sx={{
                      "::-webkit-datetime-edit-year-field": {
                        color: "",
                      },
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "20px",
                      width: "21px",
                      height: "21px",
                      background: "#fff",
                      pointerEvents: "none",
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        background: "transparen",
                      }}
                    >
                      <Image
                        src="/assets/register-page/icons-calendar.svg"
                        alt="background-image"
                      />
                    </button>
                  </span>
                  {!isErrorDate ? (
                    <FormHelperText>&nbsp;</FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      Date of birth is required.
                    </FormErrorMessage>
                  )}
                </div>
              </FormControl>
              {/* //---------------------- Input Educational --------------------// */}
              <FormControl isInvalid={isErrorEducate} isRequired>
                <FormLabel variant="body2" color="black" pt="20px">
                  Educational Background
                </FormLabel>
                <Input
                  type="text"
                  w="453px"
                  h="48px"
                  placeholder="Enter First Name and Last Name"
                  value={inputName}
                  onChange={handleNameChange}
                />
                {!isErrorName ? (
                  <FormHelperText>&nbsp;</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Name must only contain alphabets and some special characters
                    <br />
                    (e.g., comma, dot, apostrophe, and hyphen)
                  </FormErrorMessage>
                )}
              </FormControl>
              {/* //------------------------- Input Email --------------------// */}
              <FormControl isInvalid={isErrorEmail} isRequired>
                <FormLabel variant="body2" color="black" pt="20px">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  w="453px"
                  h="48px"
                  placeholder="Enter Email"
                  value={inputEmail}
                  onChange={handleEmailChange}
                />
                {!isErrorEmail ? (
                  <FormHelperText>&nbsp;</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Email should be in this form: "john@mail.com".
                  </FormErrorMessage>
                )}
              </FormControl>
              {/* //------------------------- Input Password --------------------// */}
              <FormControl isInvalid={isErrorPassword} isRequired>
                <FormLabel variant="body2" color="black" pt="20px">
                  Password
                </FormLabel>
                <Input
                  type="password"
                  w="453px"
                  h="48px"
                  placeholder="Enter Password"
                  value={inputPassword}
                  onChange={handlePasswordChange}
                />
                {!isErrorPassword ? (
                  <FormHelperText>&nbsp;</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Password must have minimum eight characters, at least one
                    letter <br /> and one number
                  </FormErrorMessage>
                )}
              </FormControl>
              {/* //------------------------- Register Button --------------------// */}
              <Button variant="primary" mt="40px" w="453px" h="60px">
                Register
              </Button>
              <Text as="b" mt="44px">
                Already have an account?
                <Link ml="12px" onClick={() => navigate("/login")}>
                  Log in
                </Link>
              </Text>
            </Flex>
          </Formik>
        </Flex>
      </Flex>
    </Box>
  );
}

export default RegisterPage;
