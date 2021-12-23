import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "../../../authProvider/authProvider";
import { IoIosClose, IoIosNotifications } from "react-icons/io";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import { NavLinks, NavType } from "./data";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GraphResolvers from "../../../../lib/apollo/apiGraphStrings";
import { useRouter } from "next/router";
import NotificationContainer from "./NotifiyDropdown";

const { LOG_OUT, GET_APPUSER } = GraphResolvers.queries;

const MyNavbar: React.FC = () => {
  const router = useRouter();
  const breakMd = useBreakpointValue({ base: false, md: true });
  const appContext = useAuth();

  const [getAppUserData, { data: appUserData }] = useLazyQuery(GET_APPUSER);
  const [logout, {}] = useLazyQuery(LOG_OUT, { fetchPolicy: "network-only" });

  const { isOpen, onToggle, onClose } = useDisclosure();
  const [userId, setUserId] = useState(null);
  const [notifyToggle, setNotifyToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [navLoading, setNavLoading] = useState(true);

  useEffect(() => {
    let cookies: any = Cookies.get("userId");
    setUserId(cookies);
    setNavLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getAppUserData({ variables: { userId: userId } });
    }
  }, [userId]);

  useEffect(() => {
    if (appUserData) {
      appContext?.updateUserData(appUserData);
      setLoading(false);
    }
  }, [appUserData]);

  const onToggleNotify = () => {
    onClose();
    setNotifyToggle(!notifyToggle);
  };
  useEffect(() => {
    if (isOpen && userId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, userId]);
  useEffect(() => {
    if (breakMd) {
      onClose();
    }
  }, [breakMd]);

  const handleLogOut = () => {
    Cookies.remove("userId");
    appContext?.signOut();
    logout();
    Cookies.remove("polditSession");
    router.push("/Login");
  };

  return (
    <Box position="fixed" top={0} left={0} w="100%" zIndex="999">
      <Flex
        bg="white"
        h="60px"
        alignItems="center"
        boxShadow="0 1px 10px -1px rgba(0,0,0,.2)!important"
        px={[6, 6, 14, 14, 28]}
      >
        <Flex justifyContent="flex-start" color="gray.200" flex="auto">
          <Box onClick={() => router.push("/")}>
            <Image
              src="https://res.cloudinary.com/rahmad12/image/upload/v1624921500/PoldIt/App_Imgs/PoldIt_logo_only_agkhlf.png"
              minW="120px"
              w="120px"
              cursor="pointer"
            />
          </Box>
        </Flex>
        <Flex
          color="gray.200"
          justifyContent="center"
          alignItems="center"
          w="100%"
          display={{ md: "flex", base: "none" }}
        >
          <InputGroup maxW="400px" ml="8">
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch size="20px" />}
              color="gray.600"
            />
            <Input
              type="text"
              placeholder="Search..."
              color="gray.600"
              borderColor="gray.300"
            />
          </InputGroup>
        </Flex>
        <Flex color="gray.800" justifyContent="flex-end" alignItems="center">
          {userId && !navLoading ? (
            !loading ? (
              <Flex align="center">
                <Box ml={[6, 6, 6, 0]} display={{ md: "flex", base: "none" }}>
                  <Link href="/newPoll">
                    <Button
                      variant="outline"
                      color="orange.300"
                      borderColor="orange.300"
                      _hover={{ bg: "orange.300", color: "white" }}
                      _active={{ outline: "none" }}
                      _focus={{ outline: "none" }}
                      size="sm"
                    >
                      Create New Poll
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <IconButton
                    aria-label="notifications"
                    onClick={() => onToggleNotify()}
                    icon={
                      <Box>
                        <IoIosNotifications size="26px" />
                        <Box
                          position="absolute"
                          w="6px"
                          h="6px"
                          borderRadius="50%"
                          bg="orange.300"
                          top="10px"
                          right="12px"
                        ></Box>
                      </Box>
                    }
                    color="gray.600"
                    mx={[0, 0, 2]}
                    variant="ghost"
                    position="relative"
                    _hover={{ bg: "none" }}
                    _focus={{ outline: "none" }}
                    _active={{ bg: "none" }}
                  />
                </Box>
                <Box display={{ md: "flex", base: "none" }}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      color="gray.600"
                      rightIcon={
                        <AiFillCaretDown style={{ marginLeft: "-5px" }} />
                      }
                      aria-label="Options"
                      icon={
                        <Avatar
                          name="xav dave"
                          src={appUserData?.getAppUserData?.profilePic}
                        />
                      }
                      variant="outline"
                      border="none"
                      _focus={{ outline: "none" }}
                      _active={{ bg: "none" }}
                      _hover={{ bg: "none" }}
                    />
                    <MenuList px="2">
                      {NavLinks.map((l: NavType) => (
                        <Link href={`${l.url}/userId`}>
                          <MenuItem
                            borderRadius="lg"
                            _hover={{
                              bg: "orange.300",
                              color: "white",
                              outline: "none",
                            }}
                            _focus={{
                              outline: "none",
                            }}
                            key={l.id}
                            fontSize="sm"
                          >
                            {l.link}
                          </MenuItem>
                        </Link>
                      ))}
                      <MenuItem
                        borderRadius="lg"
                        _hover={{
                          bg: "red.400",
                          color: "white",
                          outline: "none",
                        }}
                        _focus={{
                          outline: "none",
                        }}
                        fontSize="sm"
                        onClick={handleLogOut}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Flex>
            ) : (
              <Flex ml="4" align="center" justify="center">
                <Spinner color="poldit.100" />
              </Flex>
            )
          ) : (
            <Flex display={{ md: "flex", base: "none" }}>
              <Link href="/Login">
                <Button
                  variant="outline"
                  color="orange.300"
                  borderColor="orange.300"
                  _hover={{ bg: "orange.300", color: "white" }}
                  _active={{ outline: "none" }}
                  _focus={{ outline: "none" }}
                  size="sm"
                  mx="2"
                >
                  Log in
                </Button>
              </Link>
              <Button
                bg="orange.300"
                color="white"
                _active={{ outline: "none" }}
                _focus={{ outline: "none" }}
                borderColor="orange.300"
                _hover={{ bg: "orange.300", color: "white" }}
                size="sm"
              >
                Sign up
              </Button>
            </Flex>
          )}
          <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <IoIosClose size="36px" />
                ) : (
                  <GiHamburgerMenu size="25px" />
                )
              }
              color="gray.600"
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
              _focus={{ boxShadow: "none", outline: "none" }}
              _active={{ bg: "transparent", outline: "none" }}
              _hover={{ bg: "transparent" }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {userId && !navLoading ? (
          <MobileNav onLogout={handleLogOut} />
        ) : (
          <NoAuthMobileNav />
        )}
      </Collapse>
      <Collapse in={notifyToggle} animateOpacity>
        <NotificationContainer userId={userId} />
      </Collapse>
    </Box>
  );
};

const NoAuthMobileNav: React.FC<any> = () => {
  return (
    <Box
      w="100%"
      bg="white"
      px={[8, 12]}
      pb="10"
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Flex justifyContent="center" alignItems="center" py="4">
        <InputGroup maxW="100%">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch size="20px" />}
            color="gray.600"
          />
          <Input
            type="text"
            placeholder="Search..."
            color="gray.600"
            borderColor="gray .300"
          />
        </InputGroup>
      </Flex>
      <Flex w="100%" pb="4">
        <Link href="/Login">
          <Button
            variant="outline"
            color="orange.300"
            borderColor="orange.300"
            _active={{ outline: "none" }}
            _focus={{ outline: "none" }}
            _hover={{ bg: "orange.300", color: "white" }}
            mr="2"
            w="100%"
          >
            Log in
          </Button>
        </Link>
        <Button
          variant="outline"
          color="orange.300"
          borderColor="orange.300"
          _hover={{ bg: "orange.300", color: "white" }}
          _active={{ outline: "none" }}
          _focus={{ outline: "none" }}
          w="100%"
        >
          Sign up
        </Button>
      </Flex>
      <Flex justifyContent="center">
        <Link href="/Login">
          <Button
            variant="outline"
            color="orange.300"
            borderColor="orange.300"
            _hover={{ bg: "orange.300", color: "white" }}
            _active={{ outline: "none" }}
            _focus={{ outline: "none" }}
            size="sm"
            width="100%"
            h="40px"
          >
            Create New Poll
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
const MobileNav: React.FC<any> = ({ onLogout }) => {
  return (
    <Box w="100%" h="100vh" bg="white" px={[8, 12]}>
      <Flex justifyContent="center" alignItems="center" py="4">
        <InputGroup maxW="100%">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch size="20px" />}
            color="gray.600"
          />
          <Input
            type="text"
            placeholder="Search..."
            color="gray.600"
            borderColor="gray .300"
          />
        </InputGroup>
      </Flex>
      <Stack mt="2">
        {NavLinks.map((l: NavType) => (
          <Flex
            py={2}
            justify={"space-between"}
            align={"center"}
            borderBottom="1px"
            borderColor="#424245"
            key={l.id}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text
              fontWeight={600}
              color="gray.600"
              fontSize="sm"
              cursor="pointer"
              _hover={{
                color: "orange.400",
              }}
            >
              {l.link}
            </Text>
          </Flex>
        ))}
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          borderBottom="1px"
          borderColor="#424245"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color="gray.600"
            fontSize="sm"
            cursor="pointer"
            onClick={onLogout}
            _hover={{
              color: "red.400",
            }}
          >
            Logout
          </Text>
        </Flex>
      </Stack>
      <Flex justifyContent="center" pt="8">
        <Link href="/newPoll">
          <Button
            variant="outline"
            color="orange.300"
            borderColor="orange.300"
            _hover={{ bg: "orange.300", color: "white" }}
            size="sm"
            width="100%"
            h="40px"
          >
            Create New Poll
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
export default MyNavbar;
