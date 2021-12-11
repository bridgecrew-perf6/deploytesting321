import { Box, Text, useDisclosure, Collapse } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";

interface CollapseContent {
  answer: string;
  image: string;
}

const BtnImage = dynamic(
  () => {
    return import("./ImageModal");
  },
  { ssr: false }
);

const CollapseContent = ({ answer, image }: CollapseContent) => {
  const { isOpen, onToggle } = useDisclosure();
  const [showShortAns, setShowShortAns] = useState<boolean>(true);

  const showFullAns = () => {
    setShowShortAns(!showShortAns);
    onToggle();
  };

  return (
    <Box pt={5} pb={1} px={5}>
      <Text fontSize="sm" noOfLines={showShortAns ? 2 : 0}>
        {answer}
      </Text>
      {(answer.length > 140 || image) && (
        <Text
          onClick={showFullAns}
          fontSize="xs"
          cursor="pointer"
          color="blue.400"
        >
          {isOpen ? "Show less" : "Show more"}
        </Text>
      )}
      {true && (
        <Collapse in={isOpen} animateOpacity>
          <Box p="4" textAlign="center" cursor="pointer">
            <BtnImage src={image as string} />

            {/* <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              height="260px"
              width="100%"
              controls={true}
            /> */}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default CollapseContent;
