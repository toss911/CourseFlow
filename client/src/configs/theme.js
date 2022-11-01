import { extendTheme } from "@chakra-ui/react";

const colors = {
  blue: {
    100: "#E5ECF8",
    200: "#C6D6EF",
    300: "#8DADE0",
    400: "#5483D0",
    500: "#2F5FAC",
    600: "#234781",
    700: "#183056",
    800: "#0C182B",
    900: "#020D1E",
  },
  gray: {
    100: "#F6F7FC",
    200: "#F1F2F6",
    300: "#E4E6ED",
    400: "#D6D9E4",
    500: "#C8CCDB",
    600: "#9AA1B9",
    700: "#646D89",
    800: "#424C6B",
    900: "#2A2E3F",
  },
  orange: {
    100: "#FBAA1C",
    500: "#F47E20",
  },
  black: "#000000",
  white: "#FFFFFF",
  green: "#2FAC8E",
  linear1: {
    1: "#95BEFF",
    2: "#0040E5",
  },
  linear2: {
    1: "#5697FF",
    2: "#2558DD",
  },
};

const shadows = {
  shadow1: "4px 4px 24px rgba(0, 0, 0, 0.08)",
  shadow2: "2px 2px 12px rgba(64, 50, 133, 0.12)",
};

const fonts = {
  heading: `"Inter", sans-serif`,
  body: `"Inter", sans-serif`,
};

const components = {
  Heading: {
    variants: {
      headline1: {
        fontSize: "66px",
        lineHeight: `${1.25 * 66}px`,
        fontWeight: 500,
      },
      headline2: {
        fontSize: "36px",
        lineHeight: `${1.25 * 36}px`,
        fontWeight: 500,
      },
      headline3: {
        fontSize: "24px",
        lineHeight: `${1.25 * 24}px`,
        fontWeight: 500,
      },
    },
  },
  Text: {
    variants: {
      body1: {
        fontSize: "20px",
        lineHeight: `${1.5 * 20}px`,
        fontWeight: 400,
      },
      body2: {
        fontSize: "16px",
        lineHeight: `${1.5 * 16}px`,
        fontWeight: 400,
      },
      body3: {
        fontSize: "14px",
        lineHeight: `${1.5 * 14}px`,
        fontWeight: 400,
      },
      body4: {
        fontSize: "12px",
        lineHeight: `${1.5 * 12}px`,
        fontWeight: 400,
      },
    },
  },
  Button: {
    variants: {
      primary: {
        bg: "blue.500",
        color: "white",
        boxShadow: "shadow1",
        borderRadius: "12px",
        height: "60px",
        fontSizes: "16px",
        fontWeight: 700,
        lineHeight: `${1.5 * 16}px`,
        padding: "18px 32px",
        _hover: {
          bg: "blue.400",
          _disabled: {
            color: "gray.600",
            bg: "gray.400",
            opacity: 1,
          },
        },
        _active: {
          bg: "blue.700",
        },
        _disabled: {
          color: "gray.600",
          bg: "gray.400",
          opacity: 1,
        },
      },
      secondary: {
        bg: "white",
        color: "orange.500",
        boxShadow: "shadow1",
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "orange.500",
        height: "60px",
        fontSizes: "16px",
        fontWeight: 700,
        lineHeight: `${1.5 * 16}px`,
        padding: "18px 32px",
        _hover: {
          color: "orange.100",
          borderColor: "orange.100",
          _disabled: {
            bg: "white",
            color: "gray.500",
            borderColor: "gray.500",
            opacity: 1,
          },
        },
        _active: {
          bg: "gray.100",
          color: "orange.500",
          borderColor: "orange.500",
        },
        _disabled: {
          bg: "white",
          color: "gray.500",
          borderColor: "gray.500",
          opacity: 1,
        },
      },
    },
  },
};

const theme = extendTheme({ colors, shadows, fonts, components });

export default theme;
