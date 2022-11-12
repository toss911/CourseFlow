import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/authentication";
// *- Datepicker library -* //
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CalendarIcon from "../components/CalendarIcon";

function UserProfile() {
  const { contextState, setContextState } = useAuth();
  const [avatar, setAvatar] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const userId = contextState.user.user_id;

  useEffect(() => {
    if (contextState.user.avatar_directory) {
      setAvatar(contextState.user.avatar_directory);
    }
  }, []);

  const handleSubmit = async (values, props) => {
    try {
      const formData = new FormData();
      formData.append("full_name", values.full_name);
      formData.append("birthdate", values.birthdate || "");
      formData.append("education", values.education);
      formData.append("email", values.email);
      formData.append("avatar", avatar);
      const result = await axios.put(
        `http://localhost:4000/user/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const msg = result.data.message;
      if (/updated successfully/i.test(msg)) {
        onOpen();
        const newState = Object.assign({}, contextState);
        newState.user.avatar_directory = result.data.newUrl;
        setContextState(newState);
      } else if (/taken/i.test(msg)) {
        props.setFieldError("email", msg);
      } else if (/Internal Server Error/i.test(msg)) {
        toast({
          title: { msg },
          status: "error",
          isClosable: true,
        });
      }
    } catch (err) {
      alert(`ERROR: Please try again later`);
    }
  };

  const handleFileChange = (event) => {
    const currentFile = event.target.files[0];
    if (currentFile) {
      if (/jpeg|png/gi.test(currentFile.type)) {
        if (currentFile.size <= 2e6) {
          setAvatar(currentFile);
        } else {
          return toast({
            title: "File size must be less than 2MB!",
            status: "error",
            isClosable: true,
          });
        }
      } else {
        return toast({
          title: "File type must be JPG/PNG only!",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  // *- validation -* //
  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (!/^[a-z ,.'-]+$/i.test(value)) {
      error = `Name must only contain alphabets and some special characters (e.g., comma, dot, apostrophe, and hyphen)`;
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

  // *- Calendar Styling -* //
  const theme = createTheme({
    palette: {
      color: {
        gray: {
          400: "#D6D9E4",
          600: "#9AA1B9",
          800: "#424C6B",
        },
        orange: {
          500: "#F47E20",
        },
      },
      text: {
        primary: "#173A5E",
        secondary: "#46505A",
      },
      action: {
        active: "#001E3C",
      },
    },
    components: {
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            width: "258px",
            height: "300px",
            margin: 0,
            overflowY: "hidden",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            width: "258px",
            height: "300px",
            boxShadow: "2px 2px 12px rgba(64, 50, 133, 0.12)",
          },
        },
      },
      MuiPickersCalendarHeader: {
        styleOverrides: {
          root: {
            color: "#424C6B",
          },
          labelContainer: {
            fontWeight: 600,
            fontSize: "14px",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          today: {
            "&:not(.Mui-selected)": {
              border: "1px solid #5483D0",
            },
          },
          root: {
            fontSize: "14px",
            color: "#424C6B",
            fontWeight: 500,
            width: "32px",
            height: "32px",
          },
        },
      },
      MuiTouchRipple: {
        styleOverrides: {
          root: {
            fontSize: "30px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            fontWeight: 500,
            "&&": { color: "#9AA1B9", width: "32px", height: "32px" },
          },
        },
      },
      MuiDayPicker: {
        styleOverrides: {
          header: {
            width: "256px",
          },
          slideTransition: {
            width: "256px",
          },
        },
      },
      MuiPickersArrowSwitcher: {
        styleOverrides: {
          spacer: {
            width: "6px",
          },
        },
      },
      PrivatePickersYear: {
        styleOverrides: {
          button: {
            fontSize: "14px",
            color: "#424C6B",
            "&:disabled": {
              color: "rgba(0, 0, 0, 0.38)",
              "&:hover": {
                backgroundColor: "white",
                cursor: "context-menu",
              },
            },
          },
        },
      },
    },
  });

  return (
    <Box w="100vw">
      <Navbar />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        mt="100px"
        backgroundImage="url('/assets/profile-page/profileBg.svg')"
        backgroundRepeat="no-repeat"
        backgroundSize="98%"
        backgroundPosition="center top"
      >
        <Heading
          variant="headline2"
          color="black"
          w="100%"
          pb="72px"
          textAlign="center"
        >
          Profile
        </Heading>

        <Formik
          initialValues={{
            full_name: contextState.user.full_name,
            birthdate: contextState.user.birthdate,
            education: contextState.user.education || "",
            email: contextState.user.email,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Flex>
                <Flex
                  className="left-section"
                  w="358px"
                  h="358px"
                  mr="120px"
                  bg="gray.100"
                  borderRadius="12px"
                  boxShadow="shadow2"
                >
                  {avatar ? (
                    <Flex position="relative">
                      <Image
                        w="100%"
                        src={
                          typeof avatar === "object" &&
                          !Array.isArray(avatar) &&
                          avatar !== null
                            ? URL.createObjectURL(avatar)
                            : avatar
                        }
                        fit="contain"
                      />
                      <Flex
                        w="32px"
                        h="32px"
                        borderRadius="full"
                        position="absolute"
                        top="-18px"
                        right="-18px"
                        bg="purple"
                        justify="center"
                        align="center"
                        sx={{
                          "&:hover": {
                            opacity: 0.5,
                          },
                        }}
                        cursor="pointer"
                        onClick={() => {
                          setAvatar();
                        }}
                      >
                        <Image
                          src="/assets/misc/close-button.svg"
                          alt="close button"
                          w="11px"
                          h="11px"
                        />
                      </Flex>
                    </Flex>
                  ) : (
                    <label>
                      <Input type="file" hidden onChange={handleFileChange} />
                      <Flex
                        w="358px"
                        h="358px"
                        direction="column"
                        justify="center"
                        align="center"
                        color="blue.400"
                        cursor="pointer"
                      >
                        <Text fontSize="36px">+</Text>
                        <Text variant="body2">Upload Image</Text>
                      </Flex>
                    </label>
                  )}
                </Flex>
                <Flex className="right-section" direction="column">
                  {/* //------------------------- Input Name --------------------// */}
                  <Field name="full_name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.full_name && form.touched.full_name
                        }
                        isRequired
                      >
                        <FormLabel variant="body2" color="black">
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
                  <Field name="birthdate">
                    {({ field, form }) => (
                      <FormControl>
                        <label>
                          <Text
                            variant="body2"
                            color="black"
                            m="40px 12px 8px 0px"
                          >
                            Date of Birth
                          </Text>
                          <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                inputFormat="DD/MM/YYYY"
                                minDate="01/01/1900"
                                disableFuture
                                value={field.value}
                                onChange={(newValue) => {
                                  form.setFieldValue("birthdate", newValue);
                                }}
                                components={{
                                  OpenPickerIcon: CalendarIcon,
                                }}
                                PopperProps={{
                                  placement: "bottom-end",
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "DD/MM/YYYY",
                                    }}
                                    sx={{
                                      "& .MuiInputBase-root": {
                                        borderRadius: "8px",
                                        backgroundColor: "white",
                                        width: "453px",
                                        height: "48px",
                                        color: "black",
                                        "input:first-of-type": {
                                          "&::placeholder": {
                                            opacity: 1,
                                            color: "color.gray.600",
                                          },
                                        },
                                      },
                                      "& .MuiInputBase-input": {
                                        padding: "12px 0 12px 12px",
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        paddingRight: "20px",
                                        "& fieldset": {
                                          borderColor: "color.gray.400",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "color.gray.400",
                                        },
                                        "&.Mui-focused fieldset": {
                                          border: "solid 1px",
                                          borderColor: "color.orange.500",
                                        },
                                      },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </ThemeProvider>
                        </label>
                      </FormControl>
                    )}
                  </Field>
                  {/* //---------------------- Input Educational --------------------// */}
                  <Field name="education">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel variant="body2" color="black" mt="40px">
                          Educational Background
                        </FormLabel>
                        <Input
                          type="text"
                          w="453px"
                          h="48px"
                          placeholder="Enter Educational Background"
                          {...field}
                        />
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
                        <FormLabel variant="body2" color="black" mt="40px">
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
                  <Button
                    isLoading={props.isSubmitting}
                    variant="primary"
                    mt="40px"
                    mb="220px"
                    w="453px"
                    h="60px"
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
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
            <CheckCircleIcon mr="0.5em" />
            Success
          </ModalHeader>
          <ModalBody textAlign="center" mt="1em" color="black" fontSize="1rem">
            Your profile has been updated successfully.
            <Button m="1em" variant="success" mr={3} onClick={onClose}>
              Continue Learning
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Footer />
    </Box>
  );
}
export default UserProfile;
