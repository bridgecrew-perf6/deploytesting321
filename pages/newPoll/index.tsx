import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SitePageContainer } from "_components/layout";
import { Scrollbars } from "react-custom-scrollbars-2";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

const NewPoll: React.FC<{}> = () => {
  const [selectedTopic, setSelectedTopic] = useState<null | string>(null);
  const [selectedSub, setSelectedSub] = useState<[] | string[]>([]);
  const [subSearch, setSubSearch] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("1");
  const [subTopics, setSubTopics] = useState<[] | string[]>([]);
  const [options, setOptions] = useState<[] | string[]>([]);
  const [optionText, setOptionText] = useState<string>("");
  const { onOpen, onClose, isOpen } = useDisclosure();

  const topics = [
    "Art",
    "Music",
    "Parenting",
    "Sports",
    "Technology",
    "Coding",
    "Writing",
    "Gaming",
  ];
  const subTopicsArary = [
    "Art",
    "Music",
    "Parenting",
    "Sports",
    "Technology",
    "Coding",
    "Writing",
    "Gaming",
  ];

  const handleSubTopics = (x: string) => {
    let findSt = selectedSub.find((st) => x === st);
    if (findSt) {
      return;
    } else if (selectedSub.length >= 3) {
      return;
    } else {
      setSelectedSub([...selectedSub, x]);
    }
  };

  const removeSubTopic = (x: string) => {
    let filterSub = selectedSub.filter((st) => x !== st);
    setSelectedSub([...filterSub]);
  };
  useEffect(() => {
    if (subSearch) {
      const filterSt = subTopicsArary.filter((st) =>
        st.toLowerCase().includes(subSearch.toLowerCase())
      );
      setSubTopics(filterSt);
    } else {
      setSubTopics(subTopicsArary);
    }
  }, [subSearch]);

  const handleOptions = () => {
    if (!optionText) return;
    if (options.length >= 5) return;
    setOptions([...options, optionText]);
    setOptionText("");
  };

  const deleteOption = (o: any) => {
    const filterOption = options.filter((x) => x !== o);
    setOptions([...filterOption]);
  };

  return (
    <SitePageContainer title={`newPoll`}>
      <Box my="50px">
        <Container maxW="container.xl">
          {/* Page title*/}
          <Box pt="12">
            <Flex align="center" justify="space-between" wrap="wrap">
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  Ask a public question
                </Text>
              </Box>
              <Flex align="center">
                <Text fontSize="sm" color="gray.600">
                  Question Type
                </Text>
                <Box ml="4">
                  <Select
                    maxW="200px"
                    size="sm"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                  >
                    <option value={1}>Normal</option>
                    <option value={2}>Yes/No</option>
                    <option value={3}>With Options</option>
                  </Select>
                </Box>
              </Flex>
            </Flex>
          </Box>
          {/* Question field*/}
          <Box mt="6">
            <Textarea
              placeholder="Ask a question..."
              borderColor="gray.300"
              _focus={{ borderColor: "poldit.100" }}
            />
          </Box>
          {/* Options*/}
          {questionType === "3" && (
            <Box mt="6">
              {options && options.length ? (
                <VStack mb="4" align="start">
                  {options.map((o, id) => (
                    <Flex key={id} align="center">
                      <Box bg="gray.200" px="3" py="1" borderRadius="md">
                        <Text color="gray.600">
                          <Text color="gray.500" fontSize="xs" mr="1" as="span">
                            {id + 1}.
                          </Text>
                          {o}
                        </Text>
                      </Box>
                      <IconButton
                        ml="2"
                        bg="gray.200"
                        aria-label="closeIcons"
                        icon={<FiTrash size="12" />}
                        color="red.400"
                        mb="1px"
                        onClick={() => deleteOption(o)}
                        cursor="pointer"
                        size="xs"
                        _focus={{ outline: "none" }}
                      />
                    </Flex>
                  ))}
                </VStack>
              ) : null}
              <Input
                type="text"
                placeholder="Enter Option"
                borderColor="gray.300"
                _focus={{ borderColor: "poldit.100" }}
                size="sm"
                maxW="350px"
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
              />
              <Box mt="4">
                <Button
                  borderColor="green.500"
                  borderWidth="1px"
                  bg="green.500"
                  color="white"
                  _hover={{ bg: "green.500", color: "white" }}
                  _active={{ bg: "green.500", color: "white" }}
                  _focus={{ outline: "none" }}
                  size="sm"
                  onClick={handleOptions}
                >
                  Add
                </Button>
              </Box>
            </Box>
          )}

          {/* Topic Header*/}
          <Box mt="8">
            <Flex align="center">
              <Text fontSize="md" fontWeight="bold">
                Select Poll Topic
              </Text>
              {selectedTopic && (
                <Box ml="4">
                  <Tag
                    bg="white"
                    color="poldit.100"
                    borderRadius="full"
                    borderColor="poldit.100"
                    borderWidth="1px"
                  >
                    <TagLabel>{selectedTopic}</TagLabel>
                    <TagCloseButton onClick={() => setSelectedTopic(null)} />
                  </Tag>
                </Box>
              )}
            </Flex>
          </Box>
          {/* Topics*/}
          <Box mt="4">
            <Flex wrap="wrap">
              {topics.map((t, id) => (
                <Box px="2" key={id} mb="2">
                  <Tag
                    bg="poldit.100"
                    color="white"
                    size="lg"
                    onClick={() => setSelectedTopic(t)}
                    cursor="pointer"
                  >
                    <TagLabel>{t}</TagLabel>
                  </Tag>
                </Box>
              ))}
            </Flex>
          </Box>
          {/* sub Topics Header*/}
          <Box mt="8">
            <Flex align="center" wrap="wrap">
              <Text fontSize="md" fontWeight="bold" mb="2">
                Select Poll SubTopic(s)
              </Text>
              {selectedSub &&
                selectedSub.map((t, id) => (
                  <Box ml="4" key={id} mb="2">
                    <Tag
                      bg="white"
                      color="poldit.100"
                      borderRadius="full"
                      borderColor="poldit.100"
                      borderWidth="1px"
                    >
                      <TagLabel>{t}</TagLabel>
                      <TagCloseButton onClick={() => removeSubTopic(t)} />
                    </Tag>
                  </Box>
                ))}
            </Flex>
          </Box>
          {/* sub Topics Search Input*/}
          <Box mt="4">
            <Input
              placeholder="Search SubTopics..."
              borderColor="gray.300"
              _focus={{ borderColor: "poldit.100" }}
              maxW="350px"
              value={subSearch}
              onChange={(e) => setSubSearch(e.target.value)}
            />
          </Box>
          <Box mt="6">
            <Scrollbars
              autoHeight
              autoHeightMin={100}
              autoHeightMax={200}
              style={{ overflowY: "hidden" }}
            >
              <Flex pb="4">
                {subTopics.map((t, id) => (
                  <Box
                    key={id}
                    mr="4"
                    borderColor="gray.300"
                    borderWidth="1px"
                    borderRadius="md"
                    overflow="hidden"
                    minW="160px"
                    minH="80px"
                    onClick={() => handleSubTopics(t)}
                    cursor="pointer"
                  >
                    <Box
                      px="4"
                      py="2"
                      bg="gray.200"
                      borderBottomWidth="1px"
                      borderColor="gray.300"
                    >
                      <Text fontSize="sm">{t}</Text>
                    </Box>
                    <Box p="4">
                      <Text fontSize="xs" color="gray.500">
                        This is the description
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Scrollbars>
          </Box>
          {/*Add new sub topic*/}
          <Box mt="6">
            <Flex justify="space-between" align="center">
              {isOpen ? (
                <IconButton
                  aria-label="addNewSubTopic"
                  size="xs"
                  onClick={onClose}
                  icon={<AiOutlineMinusSquare size="26" />}
                  _focus={{ outline: "none" }}
                />
              ) : (
                <Tooltip label="Add New Sub-Topic" hasArrow placement="top">
                  <IconButton
                    aria-label="addNewSubTopic"
                    size="xs"
                    onClick={onOpen}
                    icon={<AiOutlinePlusSquare size="26" />}
                    _focus={{ outline: "none" }}
                  />
                </Tooltip>
              )}
              <Flex>
                <Text fontSize="sm" color="gray.600">
                  Select up to 3
                </Text>
                <Text fontSize="sm" color="gray.600" ml="6">
                  {selectedSub.length}/3
                </Text>
              </Flex>
            </Flex>
          </Box>
          {/*Add new sub topic Form*/}
          {isOpen && (
            <Box mt="6">
              <Box>
                <Text fontSize="md" fontWeight="bold">
                  Add New Poll SubTopic
                </Text>
              </Box>
              <Box>
                <form>
                  <FormControl id="name" isRequired mt="4">
                    <FormLabel fontSize="sm">New SubTopic Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="SubTopics name"
                      borderColor="gray.300"
                      _focus={{ borderColor: "poldit.100" }}
                      maxW="350px"
                      name="name"
                    />
                  </FormControl>
                  <FormControl id="description" mt="4">
                    <FormLabel fontSize="sm">Description (Optional)</FormLabel>
                    <Input
                      type="text"
                      placeholder="SubTopics description"
                      borderColor="gray.300"
                      _focus={{ borderColor: "poldit.100" }}
                      maxW="350px"
                      name="description"
                    />
                  </FormControl>
                  <Flex mt="4">
                    <Button
                      borderColor="poldit.100"
                      borderWidth="1px"
                      bg="white"
                      color="poldit.100"
                      _hover={{ bg: "poldit.100", color: "white" }}
                      _active={{ bg: "poldit.100", color: "white" }}
                      _focus={{ outline: "none" }}
                      size="sm"
                      type="submit"
                    >
                      Add
                    </Button>
                    <Button
                      ml="4"
                      borderColor="gray.500"
                      borderWidth="1px"
                      bg="white"
                      color="gray.500"
                      _hover={{ bg: "gray.500", color: "white" }}
                      _active={{ bg: "gray.500", color: "white" }}
                      _focus={{ outline: "none" }}
                      size="sm"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </SitePageContainer>
  );
};

export default NewPoll;
