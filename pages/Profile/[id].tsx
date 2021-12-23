import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { MdGppGood } from "react-icons/md";
import { IoMdMedal } from "react-icons/io";
import { AiFillStar, AiFillCrown } from "react-icons/ai";
import { MyPollsTab } from "_components/pageComponents/ProfilePage/MyPollsTabs";
import { FollowerModal } from "_components/pageComponents/ProfilePage/FollowerModal";
import { FollowingModal } from "_components/pageComponents/ProfilePage/FollowingModal";
import { ActivityTab } from "_components/pageComponents/ProfilePage/ActivityTab";
import { FavPollTab } from "_components/pageComponents/ProfilePage/FavPollTab";
import Layout from "_components/layout/Layout";

const Profile = () => {
  return (
    <Layout pageTitle={`Profile`}>
      <Box mt="12">
        <Container maxW="container.xl">
          <ProfileHeader />
          <Box>
            <Box mt="10">
              <Box>
                <Tabs isFitted isLazy>
                  <TabList color="gray.400">
                    <Tab
                      _focus={{ outline: "none" }}
                      _selected={{
                        color: "poldit.100",
                        borderColor: "poldit.100",
                      }}
                    >
                      <Text zIndex="100">My Polls</Text>
                    </Tab>
                    <Tab
                      _focus={{ outline: "none" }}
                      _selected={{
                        color: "poldit.100",
                        borderColor: "poldit.100",
                      }}
                    >
                      <Text zIndex="100">Favorites</Text>
                    </Tab>
                    <Tab
                      _focus={{ outline: "none" }}
                      _selected={{
                        color: "poldit.100",
                        borderColor: "poldit.100",
                      }}
                    >
                      <Text zIndex="100">Activity</Text>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel p="0">
                      <MyPollsTab />
                    </TabPanel>
                    <TabPanel p="0">
                      <FavPollTab />
                    </TabPanel>
                    <TabPanel p="0">
                      <ActivityTab />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Profile;

const ProfileHeader = () => {
  const expertise = ["gaming", "reactjs", "nodejs", "graphql", "vue"];
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: folowerIsOpen,
    onOpen: folowerOnOpen,
    onClose: folowerOnClose,
  } = useDisclosure();
  const {
    isOpen: folowingIsOpen,
    onOpen: folowingOnOpen,
    onClose: folowingOnClose,
  } = useDisclosure();

  const badgeStyle = {
    size: "xs",
    "aria-label": "icon-badges",
    color: "gray.600",
    bg: "none",
    _focus: { outline: "none" },
    _hover: { color: "poldit.100" },
  };
  return (
    <Flex
      direction={["column", "row"]}
      justify="center"
      align={["center", "flex-start"]}
    >
      <Box mr={[0, 10]} mb={[4, 0]}>
        <Avatar
          name="xav dave"
          src="https://bit.ly/ryan-florence"
          border="none"
          cursor="pointer"
          h="100%"
          w={["130px"]}
        />
      </Box>
      <Flex direction="column">
        <Flex align="center" ml="1">
          <Text fontSize="2xl" fontWeight="bold">
            aunjaffery
          </Text>
          <IconButton
            aria-label="profile-setting"
            icon={<IoMdSettings size="22" />}
            size="xs"
            ml="2"
            mt="1"
            color="gray.700"
            bg="none"
            _focus={{ outline: "none", bg: "none" }}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
          />
        </Flex>
        <Flex gridGap="1" mb="1" ml="0">
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<MdGppGood size="18" />} {...badgeStyle} />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<IoMdMedal size="18" />} {...badgeStyle} />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<AiFillCrown size="18" />} {...badgeStyle} />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Badge">
            <IconButton icon={<AiFillStar size="18" />} {...badgeStyle} />
          </Tooltip>
        </Flex>
        <HStack mb="2" ml="1" spacing="3">
          <Box cursor="pointer" onClick={folowerOnOpen}>
            <Text fontSize="sm" _hover={{ color: "blue.400" }}>
              <Text as="span" fontWeight="bold">
                182
              </Text>{" "}
              Followers
            </Text>
          </Box>
          <Box cursor="pointer" onClick={folowingOnOpen}>
            <Text fontSize="sm" _hover={{ color: "blue.400" }}>
              <Text as="span" fontWeight="bold">
                180
              </Text>{" "}
              Following
            </Text>
          </Box>
        </HStack>
        <Flex gridGap="2" mb="2" wrap="wrap">
          {expertise.map((x, id) => (
            <Tag
              fontWeight="bold"
              color="gray.500"
              _hover={{ color: "gray.100", bg: "gray.400" }}
              size="sm"
              borderRadius="full"
              key={id}
            >
              {x}
            </Tag>
          ))}
        </Flex>
        <Box ml="1">
          <Text
            color="gray.600"
            fontSize="sm"
            maxW="600px"
            noOfLines={isOpen ? 0 : 2}
          >
            Even though you specified the placement, Popover will try to
            reposition itself in the event that available space at the specified
            placement isn't enough. Even though you specified the placement,
            Popover will try to reposition itself in the event that available
            space at the specified placement isn't enough. Even though you
            specified the placement, Popover will try to reposition itself in
            the event that available space at the specified placement isn't
            enough. Even though you specified the placement, Popover will try to
            reposition itself in the event that available space at the specified
            placement isn't enough.
          </Text>
          <Text
            as="span"
            color="blue.400"
            fontSize="xs"
            onClick={onToggle}
            cursor="pointer"
          >
            show {isOpen ? "less" : "more"}
          </Text>
        </Box>
      </Flex>
      <FollowerModal isOpen={folowerIsOpen} onClose={folowerOnClose} />
      <FollowingModal isOpen={folowingIsOpen} onClose={folowingOnClose} />
    </Flex>
  );
};
