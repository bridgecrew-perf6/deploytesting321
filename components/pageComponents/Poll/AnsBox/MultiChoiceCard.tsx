import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";

interface MultiChoiceCard {
  data: { _id: string; answerVal: string; rank: string; votes: number };
  id: string;
}

const MultiChoiceCard = ({ data, id, answers, choose, myVote }: any) => {
  return (
    <Box
      bg={data?._id === myVote ? "#fffbf5" : "white"}
      mb="4"
      borderRadius="md"
      style={{ cursor: "pointer" }}
      onClick={() => choose(data._id, answers?._id)}
      pt="4"
      borderWidth="2px"
      borderColor={data?._id === myVote ? "poldit.100" : "white"}
      _hover={{ bg: "#fffbf5", boxShadow: "md", border: "2px solid #ffeac9" }}
    >
      <Box mx="5">
        <Text fontSize="sm" color="gray.600">
          {data?.answerVal}
        </Text>
      </Box>
      <Flex
        justify="space-between"
        mx="5"
        py="1"
        borderTop="1px solid #d3d3d3"
        mt="10px"
      >
        <Tooltip label="Number of times selected" placement="top">
          <Text fontSize="xs" color="gray.500">
            {data.votes === 1 ? `${data.votes} vote` : `${data.votes} votes`}
          </Text>
        </Tooltip>
        <Text fontSize="xs" color="gray.500">
          {data.rank}
        </Text>
      </Flex>
    </Box>
  );
};

export default MultiChoiceCard;
