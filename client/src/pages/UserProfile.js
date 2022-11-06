// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import { Box, Center, Heading, Image, Flex } from "@chakra-ui/react";

// function UserProfile() {
//   return (
//     <Box>
//       <Navbar />
//       <Box>
//         <Image
//           w="100%"
//           src="/assets/profile-page/profileBg.svg"
//           position="relative"
//           mt="10%"
//         />

//         <Flex flexDirection="column" alignItems="center">
//           <Heading variant="headline2" mb="60px">
//             Profile
//           </Heading>
//         </Flex>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }
import { Footer } from "../components/Footer";
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
  
  function UserProfile() {
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
  
  
    return (
      <Box>
        <Navbar />
        <Flex alignItems='center' justifyContent='center' mt='100px'>
        <Heading variant="headline2" color="black">
            Profile
        </Heading>
        </Flex>
        <Image src='/assets/profile-page/profileBg.svg' w="100%"/>

        <Flex justifyContent='center' mt='-10%'>
        <Image src='assets/profile-page/photo.png' w='358px' h='358px' mr='119px'/>
        <Flex>
        <Flex
          pt="10%"
          pb="10%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt='-97px'
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
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
                    {/* <Field name="password" validate={validatePassword}>
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
                    </Field> */}
                    {/* //------------------------- Register Button --------------------// */}
                    <Button
                      isLoading={props.isSubmitting}
                      variant="primary"
                      mt="40px"
                      w="453px"
                      h="60px"
                      type="submit"
                    >
                      Update Profile
                    </Button>
                  </Form>
                </Flex>
              )}
            </Formik>
          </Flex>
        </Flex>
        </Flex>
        </Flex>
        <Footer/>
      </Box>
    );
  }
export default UserProfile;
