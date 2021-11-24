import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";

const MultiChoiceCard = ({ data, id, answerId, choose }: any) => {
  return (
    <Box
      bg="white"
      mb="4"
      borderRadius="md"
      style={{ cursor: "pointer" }}
      onClick={() => choose(data._id, answerId)}
    >
      <Text fontSize="sm" color="gray.600">
        {data?.answerVal}
      </Text>
      <Flex
        justify="space-between"
        mx="5"
        py="1"
        borderTop="1px solid #d3d3d3"
        mt="10px"
      >
        <Tooltip label="Number of times selected" placement="top">
          <Text fontSize="xs" color="gray.500">
            2{id} votes
          </Text>
        </Tooltip>
        <Text fontSize="xs" color="gray.500">
          Rank {id + 1} of 4
        </Text>
      </Flex>
    </Box>
  );
};

export default MultiChoiceCard;
