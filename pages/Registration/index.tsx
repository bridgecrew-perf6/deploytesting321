import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Registration = (props: {}) => {
  const router = useRouter();
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getYear = () => {
    let yearArray = [];
    for (let i = 0; i < 60; i++) {
      yearArray.push(2021 - i);
    }
    return yearArray;
  };
  const onSignupSubmit = (e: any) => {
    e.preventDefault();
    let formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
      day: e.target.day.value,
      month: e.target.month.value,
      year: e.target.year.value,
      agreement: e.target.agreement.checked,
    };
    console.log(formData);
  };
  return (
    <Box
      minH="100vh"
      bg="gray.200"
      // bg="gray.200"
    >
      <Flex align="center" justify="center" minH="100vh">
        <Box
          px={{ base: 6, sm: 14 }}
          pb="16"
          pt="6"
          bgGradient="linear(to-br, white, orange.50)"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Flex justify="center">
            <Image
              src="https://res.cloudinary.com/rahmad12/image/upload/v1624921500/PoldIt/App_Imgs/PoldIt_logo_only_agkhlf.png"
              w="140px"
              cursor="pointer"
            />
          </Flex>
          <form onSubmit={onSignupSubmit}>
            <Stack spacing="6" direction={{ base: "column", md: "row" }}>
              <FormControl>
                <FormLabel htmlFor="firstName" color="gray.600">
                  First Name
                </FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  minW={{ base: "100px", sm: "320px" }}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName" color="gray.600">
                  Last Name
                </FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  minW={{ base: "100px", sm: "320px" }}
                  isRequired
                />
              </FormControl>
            </Stack>
            <Stack spacing="6" direction={{ base: "column", md: "row" }} mt="6">
              <FormControl>
                <FormLabel htmlFor="email" color="gray.600">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  minW={{ base: "100px", sm: "320px" }}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="username" color="gray.600">
                  Username
                </FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  minW={{ base: "100px", sm: "320px" }}
                  isRequired
                />
              </FormControl>
            </Stack>
            <Stack spacing="6" direction={{ base: "column", md: "row" }} mt="6">
              <FormControl>
                <FormLabel htmlFor="password" color="gray.600">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  minW={{ base: "100px", sm: "320px" }}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password2" color="gray.600">
                  Retype Password
                </FormLabel>
                <Input
                  id="password2"
                  name="password2"
                  type="password"
                  placeholder="Password"
                  minW={{ base: "100px", sm: "320px" }}
                  isRequired
                />
              </FormControl>
            </Stack>
            <Box mt="3" ml="1">
              <Text color="gray.700">Birthday</Text>
            </Box>
            <Stack spacing="6" direction={{ base: "column", md: "row" }} mt="2">
              <Select name="day" isRequired>
                <option value="" hidden>
                  Day
                </option>
                {Array.from(Array(31).keys()).map((x) => (
                  <option value={x + 1} key={x}>
                    {x + 1}
                  </option>
                ))}
              </Select>
              <Select name="month" isRequired>
                <option value="" hidden>
                  Month
                </option>
                {month.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </Select>
              <Select name="year" isRequired>
                <option value="" hidden>
                  Year
                </option>
                {getYear().map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </Select>
            </Stack>
            <Box mt="6">
              <Checkbox color="gray.600" name="agreement" isRequired>
                I agree to the terms & conditions of the User Agreement
              </Checkbox>
            </Box>
            <Box mt="5">
              <Button
                w="100%"
                _focus={{ outline: "none" }}
                borderRadius="md"
                color="white"
                //bgGradient="linear(to-l, poldit.100 , orange.300  )"
                bg="poldit.100"
                _hover={{ bg: "orange.300" }}
                _active={{
                  bg: "poldit.100",
                }}
                type="submit"
              >
                Register
              </Button>
            </Box>
          </form>
          <Box mt="3">
            <Text fontSize="sm" color="gray.500">
              Already have an account?{" "}
              <Text
                as="span"
                color="blue.400"
                cursor="pointer"
                onClick={() => router.push("/Login")}
              >
                Login here.
              </Text>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Registration;
