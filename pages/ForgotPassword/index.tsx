import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { BsEnvelope } from "react-icons/bs";
import { useRouter } from "next/router";

const ForgotPassword = (props: {}) => {
  const router = useRouter();
  let onSubmit = (e: any) => {
    e.preventDefault();
    let data = {
      email: e.target.email.value,
    };
    console.log(data);
  };
  return (
    <Box minH="100vh" h="100vh" bg="gray.200">
      <Flex align="center" justify="center" minH="100vh">
        <Box
          maxW="400px"
          bg="white"
          px={[6, 6, 12]}
          mx={[4, 4, 0]}
          py="12"
          border="1px solid #F4F4F4"
          boxShadow="0px 4px 7px rgba(0, 0, 0, 0.07)"
          borderRadius="lg"
          mb="20"
        >
          <Flex justify="center">
            <BsEnvelope size="72" />
          </Flex>
          <Box>
            <Text fontWeight="bold" fontSize="xl" textAlign="center" mb="2">
              Forgot Password?
            </Text>
            <Text color="gray.500" fontSize="md" textAlign="center">
              Please enter the registered email and we will send you the reset
              link!
            </Text>
          </Box>
          <Box mt="6">
            <form onSubmit={onSubmit}>
              <Input
                name="email"
                placeholder="Enter email"
                type="email"
                required
              />
              <Box mt="4">
                <Button
                  w="100%"
                  bg="poldit.100"
                  color="white"
                  px="10"
                  type="submit"
                  _hover={{
                    bg: "orange.300",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  _active={{
                    bg: "poldit.100",
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </form>
            <Box mt="2">
              <Button
                w="100%"
                bg="gray.400"
                border="2px"
                borderColor="gray.400"
                color="white"
                px="10"
                _hover={{
                  bg: "gray.400",
                  color: "white",
                }}
                _focus={{
                  outline: "none",
                }}
                _active={{
                  bg: "white",
                  color: "gray.500",
                }}
                onClick={() => router.push("/Login")}
              >
                Go Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgotPassword;
