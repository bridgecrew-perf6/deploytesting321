import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Image,
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
import Link from "next/link";
import { PhotoProvider, PhotoConsumer } from "react-photo-view";
import { IoMdSettings } from "react-icons/io";
import { useQuery, useLazyQuery } from "@apollo/client";
import { MdGppGood } from "react-icons/md";
import { IoMdMedal } from "react-icons/io";
import { AiFillStar, AiFillCrown } from "react-icons/ai";
import { MyPollsTab } from "_components/pageComponents/ProfilePage/MyPollsTabs";
import { FollowerModal } from "_components/pageComponents/ProfilePage/FollowerModal";
import { FollowingModal } from "_components/pageComponents/ProfilePage/FollowingModal";
import { ActivityTab } from "_components/pageComponents/ProfilePage/ActivityTab";
import { FavPollTab } from "_components/pageComponents/ProfilePage/FavPollTab";
import Layout from "_components/layout/Layout";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { User } from "_components/appTypes/appType";
import { GetServerSideProps, GetStaticProps } from "next";

interface Profile {
  appid: string;
}

const Profile = ({ appid }: Profile) => {
  const { data, loading } = useQuery(GraphResolvers.queries.GET_PROFILE, {
    variables: { appid },
  });

  return (
    <Layout pageTitle={`Profile`}>
      <Box mt="12">
        <Container maxW="container.xl">
          {!loading ? (
            <ProfileHeader data={data?.getUserProfileData} />
          ) : (
            <Flex justify="center" align="center" maxH={"180px"} minH={"180px"}>
              <Spinner size="lg" color="poldit.100" />
            </Flex>
          )}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appid = context?.params?.id;
  return {
    props: { appid },
  };
};

interface ProfileData {
  data: User;
}

const ProfileHeader = ({ data }: ProfileData) => {
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
        <PhotoProvider>
          <PhotoConsumer src="https://bit.ly/ryan-florence">
            <Image
              src="https://bit.ly/ryan-florence"
              alt="this"
              borderRadius="full"
              minW="130px"
              maxW="130px"
              cursor="pointer"
              h="100%"
            />
          </PhotoConsumer>
        </PhotoProvider>
      </Box>
      <Flex direction="column">
        <Flex align="center" ml="1">
          <Text fontSize="2xl" fontWeight="bold">
            {data.appid}
          </Text>
          <Link href={`/EditProfile/1231`}>
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
          </Link>
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
              bg="gray.200"
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
            {data.bio}
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
