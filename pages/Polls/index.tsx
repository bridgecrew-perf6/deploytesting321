import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { PollCard } from "_components/pageComponents/ProfilePage/MyPollsTabs";
import DataWindow from "_components/pageComponents/Home/DataWindow";
import {
  subtopics,
  topics,
  data,
} from "_components/pageComponents/Other/NavBar/data";

import Layout from "_components/layout/Layout";

const TopicPage = (props: {}) => {
  const [selectedTopic, setSelectedTopic] = useState("Music");
  const [selectedSubTs, setSelectedSubTs] = useState("Hiphop");
  const [subTs, setSubTs] = useState<string[]>([]);

  useEffect(() => {
    const sub = subtopics.find((x) => x.topic === selectedTopic);
    if (sub && sub.subtopics) {
      setSubTs(sub.subtopics);
    }
  }, [selectedTopic]);
  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex wrap="wrap" pt="6">
          <Flex
            flex={{ base: "0 0 100%", lg: "0 0 30%" }}
            mt={{ base: 3, lg: 0 }}
            justify="center"
          >
            <Box
              position={{ base: "relative", lg: "sticky" }}
              pl="2"
              pr={{ base: 2, lg: 6 }}
              h={{ base: "100%", lg: "calc(100vh - 76px)" }}
              top={{ base: "0", lg: "6.6rem" }}
              mb={{ base: 8, lg: 0 }}
            >
              <Box mb="5">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiSearch size="20" />}
                    h="100%"
                  />
                  <Input
                    size="md"
                    placeholder="Search topics"
                    borderColor="gray.300"
                    borderRadius="md"
                    maxW="95%"
                  />
                </InputGroup>
              </Box>
              <Box pb="6">
                <Box>
                  <Text color="gray.700" fontWeight="bold" fontSize="lg">
                    Poll Topics
                  </Text>
                </Box>
                <Flex gridGap="2" mt="4" wrap="wrap">
                  {topics.map((x, id) => (
                    <Tag
                      fontWeight="bold"
                      color="gray.100"
                      borderRadius="full"
                      bg={selectedTopic === x ? "poldit.100" : "gray.400"}
                      key={id}
                      px="3"
                      onClick={() => setSelectedTopic(x)}
                      cursor="pointer"
                      size="sm"
                    >
                      {x}
                    </Tag>
                  ))}
                </Flex>
              </Box>
              <Box borderBottom="1px solid #d3d3d3" maxW="95%"></Box>
              <Box mt="6">
                <Text color="gray.700" fontWeight="bold" fontSize="lg">
                  Poll SubTopics
                </Text>
                <Flex gridGap="2" mt="4" wrap="wrap">
                  {subTs.map((x, id) => (
                    <Tag
                      fontWeight="bold"
                      color="gray.100"
                      borderRadius="full"
                      bg={selectedSubTs === x ? "poldit.100" : "gray.400"}
                      key={id}
                      px="3"
                      onClick={() => setSelectedSubTs(x)}
                      cursor="pointer"
                      size="sm"
                    >
                      {x}
                    </Tag>
                  ))}
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Flex flex={{ base: "0 0 100%", lg: "0 0 70%" }} w="100%" mt="6">
            <Box w="100%">
              {data.map((x, id) => (
                <PollCard pollData={x} key={id} />
              ))}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default TopicPage;
