import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/client";
import { isTokkenValid } from "lib/externalUserAuth";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import jwtDecode from "jwt-decode";

const LoginPage = (props: {}) => {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let cookie: any = Cookies.get("polditSession");
    // console.log("Cookie from Login => ", cookie)
    if (isTokkenValid(cookie ?? "")) {
      router.push("/");
    }
  }, []);
  const { queries, mutations } = GraphResolvers;
  const [login, { loading }] = useMutation(mutations.LOGIN, {
    refetchQueries: [
      { query: queries.GET_USER, variables: { userId: userId } },
    ],
  });

  const onLoginSubmit = async (e: any) => {
    e.preventDefault();
    let formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const { data } = await login({
        variables: { credentials: JSON.stringify(formData) },
      });
      let decoded: any = jwtDecode(data?.login);
      if (decoded?.id) {
        setUserId(decoded?.id);
        Cookies.set("userId", decoded?.id, {
          expires: 7,
        });
      }
      // appContext?.setAuthToken(data.login);
      Cookies.set("polditSession", data.login, {
        expires: 7,
      });
      toast({
        title: "Login successfull!",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  return (
    <Box minH="100vh" h="100vh" bg="gray.200">
      <Flex align="center" justify="center" minH="100vh">
        <Box
          px={{ base: 8, sm: 14 }}
          pb="16"
          pt="6"
          mb="20"
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
          <form onSubmit={onLoginSubmit}>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineUser />}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  minW={{ base: "100px", sm: "320px" }}
                  required
                />
              </InputGroup>
            </Box>
            <Box mt="6">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineLock />}
                />
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                <InputRightElement>
                  <IconButton
                    _hover={{ bg: "none" }}
                    _focus={{ outline: "none" }}
                    _active={{ bg: "none" }}
                    variant="ghost"
                    aria-label="showHide"
                    onClick={() => setShow(!show)}
                    icon={show ? <AiFillEye /> : <AiFillEyeInvisible />}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box mt="4" mb="3">
              <Link href="/ForgotPassword">
                <Text fontSize="sm" color="blue.300" cursor="pointer">
                  Forgot Password?
                </Text>
              </Link>
            </Box>
            <Box>
              <Button
                w="100%"
                _focus={{ outline: "none" }}
                borderRadius="md"
                type="submit"
                color="white"
                //bgGradient="linear(to-l, poldit.100 , orange.300  )"
                bg="poldit.100"
                _hover={{ bg: "orange.300" }}
                _active={{
                  bg: "poldit.100",
                }}
                isLoading={loading}
              >
                Login
              </Button>
            </Box>
          </form>
          <Box mt="3">
            <Text fontSize="sm" color="gray.500">
              New to POLDIT?{" "}
              <Link href="/Registration">
                <Text as="span" color="blue.400" cursor="pointer">
                  Register here.
                </Text>
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default LoginPage;
