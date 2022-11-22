import {
  Flex,
  Box,
  Badge,
  Text,
  Heading,
  Button,
  Textarea,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomeworkBox = (props) => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState({ answer: props.answer });

  // *- Change status badge color -* //
  const changeBadgeColor = (status) => {
    let badgeColor;
    switch (status) {
      case "submitted":
        badgeColor = "submitted";
        break;
      case "overdue":
        badgeColor = "overdue";
        break;
      case "in progress":
        badgeColor = "in progress";
        break;
      case "pending":
        badgeColor = "pending";
    }
    return badgeColor;
  };

  // *- Display days until deadline or not -* //
  const displayOrNot = (status) => {
    let display;
    switch (status) {
      case "submitted":
        display = "hidden";
        break;
      case "overdue":
        display = "hidden";
        break;
      case "in progress":
        display = "visible";
        break;
      case "pending":
        display = "visible";
        break;
    }
    return display;
  };

  const handleTextChange = (event) => {
    setAnswer({ answer: event.target.value });
  };

  return (
    <Box>
      <Flex
        flexDirection="column"
        w="1120px"
        h="354px"
        padding="40px, 96px"
        alignItems="center"
        mb="24px"
        backgroundColor="blue.100"
        borderRadius="8px"
      >
        <Flex w="925px" h="66px" mt="40px" gap="24px">
          <Flex flexDirection="column" w="746px" h="66px" gap="12px">
            <Heading variant="headline3">Course: {props.courseName}</Heading>
            <Text variant="body2" textColor="gray.700">
              {props.lessonName}: {props.subLessonName}
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            w="155px"
            h="64px"
            gap="12px"
            alignItems="flex-end"
          >
            <Badge
              variant={changeBadgeColor(props.status)}
              sx={{ textTransform: "capitalize" }}
            >
              <Text variant="body3">{props.status}</Text>
            </Badge>
            {props.daysUntilDeadline === 0 ? (
              <Text
                w="165px"
                variant="body2"
                textColor="gray.700"
                visibility={displayOrNot(props.status)}
              >
                Submit within today
              </Text>
            ) : (
              <Text
                w="165px"
                variant="body2"
                textColor="gray.700"
                visibility={displayOrNot(props.status)}
              >
                Submit within {props.daysUntilDeadline} {props.dayOrDays}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex
          w="928px"
          h="180px"
          mt="36px"
          backgroundColor="white"
          borderRadius="8px"
        >
          <Flex
            flexDirection="column"
            w="719px"
            h="124px"
            gap="4px"
            alignItems="flex-start"
            m="24px"
          >
            <label>
              <Text variant="body2" textColor="black">
                {props.hwDetail}
              </Text>
            </label>
            {/* Change text area depending on status */}
            {props.submittedDate ? (
              <Box w="719px" h="96px">
                {props.answer}
              </Box>
            ) : props.answer ? (
              <Textarea
                placeholder="Answer here..."
                w="719px"
                h="96px"
                textAlign="start"
                color="black"
                onChange={handleTextChange}
                defaultValue={props.answer}
              />
            ) : (
              <Textarea
                placeholder="Answer here..."
                w="719px"
                h="96px"
                textAlign="start"
                color="black"
                onChange={handleTextChange}
              />
            )}

            <Button
              variant="secondary"
              pt="0px"
              pb="0px"
              pl="10px"
              pr="10px"
              size="xs"
              mt="5px"
              onClick={() =>
                props.saveAnswerDraft(
                  props.assignmentId,
                  answer,
                  props.status,
                  props.courseId
                )
              }
              visibility={props.submittedDate ? "hidden" : "visible"}
            >
              Save draft
            </Button>
          </Flex>
          <Flex flexDirection="column" gap="16px" w="137px" h="108px" mt="40px">
            <Button
              p="4px"
              onClick={() =>
                props.submitHomework(
                  props.assignmentId,
                  answer,
                  props.status,
                  props.courseId
                )
              }
              display={props.submittedDate ? "none" : "block"}
            >
              Submit
            </Button>
            <Flex
              justify="center"
              align="center"
              h={props.submittedDate ? "100%" : "20%"}
            >
              <Link
                onClick={() =>
                  navigate(
                    `/courses/${props.courseId}/learning?subLessonId=${props.subLessonId}`
                  )
                }
              >
                Open in course
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeworkBox;
