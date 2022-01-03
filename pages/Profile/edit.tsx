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
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AiFillEdit } from "react-icons/ai";
import Layout from "_components/layout/Layout";
import { User } from "_components/appTypes/appType";

const EditProfile = (props: {}) => {
  const [loading, setLoading] = useState(false);
  const [userDetails, updateUserDetails] = useState<User | undefined>();
  const router = useRouter();
  const { data } = router.query;

  useEffect(() => {
    data && updateUserDetails(JSON.parse(data as string));
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1500);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    userDetails &&
      updateUserDetails({
        ...userDetails,
        [e.target.id as keyof User]: e.target.value,
      });
  };

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
                    src={userDetails?.profilePic}
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
              <form onSubmit={handleSubmit}>
                <Stack direction={["column", "column", "row"]}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      borderColor="gray.300"
                      value={userDetails?.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      id="appid"
                      borderColor="gray.300"
                      value={userDetails?.appid}
                      onChange={handleChange}
                      disabled
                    />
                  </FormControl>
                </Stack>
                <Stack direction={["column", "column", "row"]} mt="5">
                  <FormControl>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstname"
                      borderColor="gray.300"
                      value={userDetails?.firstname}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastname"
                      borderColor="gray.300"
                      value={userDetails?.lastname}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Stack>
                <Flex mt="5">
                  <FormControl>
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input
                      id="address1"
                      borderColor="gray.300"
                      value={userDetails?.address1}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Flex>
                <Flex mt="5">
                  <FormControl>
                    <FormLabel htmlFor="address2">Address 2</FormLabel>
                    <Input
                      id="address2"
                      borderColor="gray.300"
                      value={userDetails?.address2}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Flex>
                <Stack direction={["column", "column", "row"]} mt="5">
                  <FormControl>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input
                      id="city"
                      borderColor="gray.300"
                      value={userDetails?.city}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="state">State</FormLabel>
                    {/* <select
                      id="state"
                      className="form-control"
                      value={userDetails?.state}
                      onChange={(e) => setUserState(e.target.value)}
                    >
                      {stateList.length > 0 ? (
                        <StateVals
                          stateList={stateList}
                          activeState={userState}
                        />
                      ) : (
                        <option>Loading...</option>
                      )}
                    </select> */}
                    <Input
                      id="state"
                      borderColor="gray.300"
                      value={userDetails?.state}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
                    <Input
                      id="zipcode"
                      borderColor="gray.300"
                      value={userDetails?.zipcode}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Stack>
                <Flex mt="5">
                  <FormControl>
                    <FormLabel htmlFor="aboutme">About Me</FormLabel>
                    <Textarea
                      id="bio"
                      name="aboutMe"
                      borderColor="gray.300"
                      value={userDetails?.bio}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Flex>
              </form>
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
