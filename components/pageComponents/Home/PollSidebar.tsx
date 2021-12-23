import { Box, Flex, Text, useRadio, useRadioGroup } from "@chakra-ui/react";

export const PollSideBar = ({ activeBtn, update }: any) => {
  const options = ["Active Chats", "Trending Polls", "Newest Polls"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: activeBtn || "Active Chats",
    onChange: (e) => update(e),
  });

  const group = getRootProps();
  return (
    <Box ml={{ base: 0, lg: 6 }} mb={{ base: 6, lg: 0 }}>
      <Flex
        {...group}
        wrap="wrap"
        gridGap="2"
        justify="center"
        align="center"
        direction={{ base: "row", lg: "column" }}
      >
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </Flex>
    </Box>
  );
};
const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        w="100%"
        minW="260px"
        cursor="pointer"
        borderWidth="1px"
        borderColor="gray.400"
        bg="white"
        color="gray.600"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          color: "white",
          bg: "gray.500",
          borderColor: "gray.500",
        }}
        _focus={{
          outline: "none",
        }}
        px={2}
        py={1}
      >
        <Text textAlign="center" fontSize="sm">
          {props.children}
        </Text>
      </Box>
    </Box>
  );
};
