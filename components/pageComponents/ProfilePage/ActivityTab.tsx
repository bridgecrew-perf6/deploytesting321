import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ActivityTab = (props: {}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Box my="6">
      {loading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="lg" color="poldit.100" />
        </Flex>
      ) : (
        <Box>
          {Array.from(Array(10).fill("x")).map((_, id) => (
            <ActivityCard key={id} id={id} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const ActivityCard = ({ id }: { id: number }) => {
  return (
    <Box mb="6">
      <Box borderBottom="1px solid #d3d3d3" pb="1">
        <Box>
          <Text color="gray.800">
            aunjaffery liked the rahmad12's{" "}
            <Text as="span" _hover={{ color: "blue.400" }} cursor="pointer">
              answer
            </Text>
            .
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600">
            {id + 1} min ago
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
