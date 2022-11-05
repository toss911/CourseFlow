import {
  Center,
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  InputGroup,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication.js";
import { Field, Form, Formik } from "formik";

function RegisterPage() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (values, props) => {
    const result = await register(values);
    props.setSubmitting(false);
    if (result) {
      props.setFieldError("email", result);
    }
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (!/^[a-z ,.'-]+$/i.test(value)) {
      error = `Name must only contain alphabets and some special characters (e.g., comma, dot, apostrophe, and hyphen)`;
    }
    return error;
  };

  const validateBirthdate = (value) => {
    let error;
    if (!value) {
      error = "Birthdate is required";
    }
    return error;
  };

  const validateEducation = (value) => {
    let error;
    if (!value) {
      error = "Educational background is required";
    }
    return error;
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
      error = `Email should be in this form: "john@mail.com".`;
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      error = `Password must have minimum eight characters, at least one letter and one number`;
    }
    return error;
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
          <Formik
            initialValues={{
              full_name: "",
              birthdate: "",
              education: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Flex
                flexDirection="column"
                justifyContent="flex-start"
                w="453px"
              >
                <Form>
                  {/* //------------------------- Input Name --------------------// */}
                  <Field name="full_name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.full_name && form.touched.full_name
                        }
                        isRequired
                      >
                        <FormLabel variant="body2" color="black" pt="37px">
                          Name
                        </FormLabel>
                        <Input
                          type="text"
                          w="453px"
                          h="48px"
                          placeholder="Enter First Name and Last Name"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.full_name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* //-------------------------- Input Date --------------------// */}
                  <Field name="birthdate" validate={validateBirthdate}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.birthdate && form.touched.birthdate
                        }
                        isRequired
                      >
                        <FormLabel variant="body2" color="black" pt="20px">
                          Date of Birth
                        </FormLabel>
                        <InputGroup>
                          <Input
                            color="#9AA1B9"
                            type="date"
                            w="453px"
                            h="48px"
                            placeholder="MM/DD/YYYY"
                            {...field}
                            sx={{
                              "::-webkit-calendar-picker-indicator": {
                                background:
                                  "url('/assets/register-page/icons-calendar.svg')",
                              },
                            }}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.birthdate}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* //---------------------- Input Educational --------------------// */}
                  <Field name="education" validate={validateEducation}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.education && form.touched.education
                        }
                        isRequired
                      >
                        <FormLabel variant="body2" color="black" mt="20px">
                          Educational Background
                        </FormLabel>
                        <Input
                          type="text"
                          w="453px"
                          h="48px"
                          placeholder="Enter Educational Background"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.education}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* //------------------------- Input Email --------------------// */}
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                      >
                        <FormLabel variant="body2" color="black" pt="20px">
                          Email
                        </FormLabel>
                        <Input
                          type="email"
                          w="453px"
                          h="48px"
                          placeholder="Enter Email"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* //------------------------- Input Password --------------------// */}
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        isRequired
                      >
                        <FormLabel variant="body2" color="black" pt="20px">
                          Password
                        </FormLabel>
                        <Input
                          type="password"
                          w="453px"
                          h="48px"
                          placeholder="Enter Password"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {/* //------------------------- Register Button --------------------// */}
                  <Button
                    isLoading={props.isSubmitting}
                    variant="primary"
                    mt="40px"
                    w="453px"
                    h="60px"
                    type="submit"
                  >
                    Register
                  </Button>
                </Form>
                <Text as="b" mt="44px">
                  Already have an account?
                  <Link ml="12px" onClick={() => navigate("/login")}>
                    Log in
                  </Link>
                </Text>
              </Flex>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Box>
  );
}

export default RegisterPage;
