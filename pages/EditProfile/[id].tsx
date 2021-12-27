import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AiFillEdit } from "react-icons/ai";
import Layout from "_components/layout/Layout";

const EditProfile = (props: {}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  console.log("userid", id);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Layout pageTitle={`Profile`}>
      <Box mt={[2, 2, 6]}>
        <Container maxW="container.xl">
          <Box>
            <Text fontSize={["xl", "xl", "2xl"]} fontWeight="bold">
              Edit Profile
            </Text>
          </Box>
          {loading ? (
            <Flex justify="center" align="center" minH="300px">
              <Spinner size="lg" color="poldit.100" />
            </Flex>
          ) : (
            <Box pb="12">
              <Flex
                justify="center"
                align="center"
                mb="8"
                mt="4"
                direction="column"
              >
                <Box position="relative">
                  <Avatar
                    name="xav dave"
                    src="https://bit.ly/ryan-florence"
                    border="none"
                    size="2xl"
                  />
                  <IconButton
                    aria-label="editButton"
                    icon={<AiFillEdit size="20" />}
                    position="absolute"
                    bottom="4px"
                    bg="gray.200"
                    color="gray.600"
                    right="0"
                    size="sm"
                    borderRadius="50%"
                  />
                </Box>
              </Flex>
              <Stack direction={["column", "column", "row"]}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" borderColor="gray.300" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input id="username" borderColor="gray.300" />
                </FormControl>
              </Stack>
              <Stack direction={["column", "column", "row"]} mt="5">
                <FormControl>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input id="firstName" borderColor="gray.300" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input id="lastName" borderColor="gray.300" />
                </FormControl>
              </Stack>
              <Flex mt="5">
                <FormControl>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input id="address" borderColor="gray.300" />
                </FormControl>
              </Flex>
              <Flex mt="5">
                <FormControl>
                  <FormLabel htmlFor="address2">Address 2</FormLabel>
                  <Input id="address2" borderColor="gray.300" />
                </FormControl>
              </Flex>
              <Stack direction={["column", "column", "row"]} mt="5">
                <FormControl>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Input id="city" borderColor="gray.300" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="state">State</FormLabel>
                  <Input id="state" borderColor="gray.300" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                  <Input id="zipCode" borderColor="gray.300" />
                </FormControl>
              </Stack>
              <Flex mt="5">
                <FormControl>
                  <FormLabel htmlFor="aboutme">About Me</FormLabel>
                  <Textarea
                    id="aboutMe"
                    name="aboutMe"
                    borderColor="gray.300"
                  />
                </FormControl>
              </Flex>
              <Flex mt="8" gridGap="5" justify="flex-end">
                <Button>Cancel</Button>
                <Button colorScheme="green">Update</Button>
              </Flex>
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
};
export default EditProfile;
