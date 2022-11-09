import { Footer } from "../components/Footer";
import axios from "axios";
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
import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.less";
import "../index.css";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useAuth } from "../contexts/authentication";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CalendarIcon from "../components/CalendarIcon";

function UserProfile() {
  // --------------------------------------------States--------------------------------------------//
  const { contextState } = useAuth();
  const userId = contextState.user.user_id;
  const [userCurrInfo, setUserCurrInfo] = useState([]);
  const [avatar, setAvatar] = useState({});
  console.log("userCurrInfo: ", userCurrInfo);

  // --------------------------------------------Ant Design functions--------------------------------------------//
  const [fileList, setFileList] = useState([{}]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // --------------------------------------------End of Ant Design functions--------------------------------------------//

  // --------------------------------------------Other Functions--------------------------------------------//

  // GET user's profile information to display on page
  const getProfile = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/user/${userId}`);
      setUserCurrInfo(result.data.data);
    } catch (err) {
      alert(`ERROR: Please try again later`);
    }
  };
  // UPDATE user's profile information
  const updateProfile = async (userId, updatedData) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/user/${userId}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // navigate("/") // Navigate the user back to the prev page the user was on.
      return result;
    } catch (err) {
      alert(`ERROR: Please try again later`);
    }
  };

  // handleSubmit function
  const handleSubmit = async (values) => {
    const formData = new FormData();

    // values.avatar = fileList;
    formData.append("full_name", values.full_name);
    formData.append("birthdate", values.birthdate);
    formData.append("education", values.education);
    formData.append("email", values.email);
    formData.append("avatar", fileList[0].originFileObj);

    await updateProfile(userId, formData);
  };

  // --------------------------------------------End of other functions--------------------------------------------//

  useEffect(() => {
    getProfile();
  }, []);

  // ------------------------------------------validation------------------------------------------------//

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

  // ------------------------------------------End of validation------------------------------------------------//

  // ----------------- Calendar Styling -------------------//
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
    <Box>
      <Navbar />
      <Flex alignItems="center" justifyContent="center" mt="100px">
        <Heading variant="headline2" color="black">
          Profile
        </Heading>
      </Flex>
      <Image src="/assets/profile-page/profileBg.svg" w="100%" />

      <Flex mt="-10%" justifyContent="space-between" pr="20%" pl="35%">
        {/* <Image
          src="assets/profile-page/photo.png"
          w="358px"
          h="358px"
          mr="119px"
        /> */}

        <Flex>
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>
          <Flex
            pt="10%"
            pb="10%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="-97px"
          >
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Formik
                initialValues={{
                  full_name: userCurrInfo.full_name,
                  birthdate: userCurrInfo.birthdate || null,
                  education: userCurrInfo.education,
                  email: userCurrInfo.email,
                  avatar: {},
                }}
                enableReinitialize
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
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
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
                        {({ field, form }) => (
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
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
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
      <Footer />
    </Box>
  );
}
export default UserProfile;
