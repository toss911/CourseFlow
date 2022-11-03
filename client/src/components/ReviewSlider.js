import { Image, Flex, Text, Heading } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ReviewSlider = ({ slides }) => {
  return (
    <Carousel
      infiniteLoop
      axis="horizontal"
      //centerMode={true}
      showStatus={false}
      swipeable
      emulateTouch
      interval={2000}
      autoPlay
      showArrows={false}
    >
      {slides.map((slide) => {
        return (
          <Flex
            flexDirection="column"
            align="start"
            justify="center"
            bg="blue.100"
            borderRadius="8px"
            mt="20px"
            pl="72.28px"
            ml="35%"
            w="578.78px"
            h="309.48px"
            position="relative"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              w="200px"
              h="240px"
              position="absolute"
              right="350px"
            />
            <Image
              src="/assets/landing-page/review/quote-large.svg"
              alt="quote-large-left"
              position="absolute"
              w="35.9px"
              h="56.7px"
              top="0px"
              left="-430px"
            />
            <Image
              src="/assets/landing-page/review/quote-large.svg"
              alt="quote-large-left"
              position="absolute"
              w="35.9px"
              h="56.7px"
              top="0px"
              left="-385px"
            />
            <Heading variant="headline3" color="blue.400" pt="66.79px">
              {slide.name}
            </Heading>
            <Text
              flexDirection="column"
              align="start"
              justify="center"
              variant="body2"
              color="gray.700"
              pt="24px"
              pb="68.69px"
              pr="25.36px"
              w="481.14px"
            >
              {slide.content}
            </Text>
            <Image
              src="/assets/landing-page/review/quote-double-small.svg"
              alt="quote-large-left"
              position="absolute"
              w="23.2px"
              h="36.64px"
              bottom="15px"
              right="-230px"
            />
          </Flex>
        );
      })}
    </Carousel>
  );
};

export default ReviewSlider;
