import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
} from "@chakra-ui/react";

export const BrandButton = ({ children }: any) => {
  return (
    <Button
      color="gray.400"
      borderColor="gray.400"
      _hover={{
        bg: "#ff4d00",
        color: "white",
        borderColor: "gray.400",
      }}
      _active={{ outline: "none" }}
      _focus={{ outline: "none" }}
      variant="outline"
    >
      {children}
    </Button>
  );
};

export const BrandTag = ({ children, size }: any) => {
  return (
    <Tag
      color="gray.400"
      borderColor="gray.400"
      borderRadius="full"
      cursor="pointer"
      size={size}
      pt="2"
      pb="2"
      _hover={{
        bg: "#ff4d00",
        color: "white",
        borderColor: "gray.400",
      }}
      _active={{ outline: "none" }}
      _focus={{ outline: "none" }}
      variant="outline"
      minWidth="80px"
      alignItems={"center"}
    >
      {children}
    </Tag>
  );
};
