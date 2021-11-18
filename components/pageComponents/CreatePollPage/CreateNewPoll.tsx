import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select,
  Spinner,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import ImgPicker from "../Other/Image/ImgPicker";
// import { addNewPoll } from "lib/apollo/apolloFunctions/mutations";
import { saveImgtoCloud } from "_components/apis/imgUpload";
import { useRouter } from "next/router";

const CreateNewPoll: React.FC<{}> = () => {
  const router = useRouter();
  interface selectedTopic {
    _id: string;
    name: string;
  }
  const toast = useToast();
  const [selectedTopic, setSelectedTopic] = useState<null | selectedTopic>(
    null
  );
  const [selectedSub, setSelectedSub] = useState<[] | selectedTopic[]>([]);
  const [subSearch, setSubSearch] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("openEnded");
  const [subTopics, setSubTopics] = useState<[] | any[]>([]);
  const [options, setOptions] = useState<[] | string[]>([]);
  const [optionText, setOptionText] = useState<string>("");
  const [selectedImgs, setSelectImgs] = useState<any>([]);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { CREATE_POLL } = GraphResolvers.mutations;
  const { GET_TOPICS, GET_SUBTOPICS_PER_TOPIC } = GraphResolvers.queries;
  const [createPoll, { error }] = useMutation(CREATE_POLL);

  const {
    data: topicData,
    loading: topicLoading,
    error: topicError,
  } = useQuery(GET_TOPICS);

  const [
    getSubTopics,
    { data: subTopicsData, loading: subTopicLoading, error: subTopicError },
  ] = useLazyQuery(GET_SUBTOPICS_PER_TOPIC);

  useEffect(() => {
    if (selectedTopic && selectedTopic.name) {
      getSubTopics({ variables: { topic: selectedTopic.name } });
    }
  }, [selectedTopic]);

  const handleSubTopics = (obj: { _id: string; name: string }) => {
    let findSt = selectedSub.find((st) => obj._id === st._id);
    if (findSt) {
      return;
    } else if (selectedSub.length >= 3) {
      return;
    } else {
      setSelectedSub([...selectedSub, obj]);
    }
  };

  const removeSubTopic = (x: string) => {
    let filterSub = selectedSub.filter((st) => x !== st._id);
    setSelectedSub([...filterSub]);
  };

  useEffect(() => {
    if (!subTopicLoading && subTopicsData && subTopicsData.subTopicsPerTopic) {
      if (subSearch) {
        const filterSt = subTopicsData?.subTopicsPerTopic.filter((st: any) =>
          st.subTopic.toLowerCase().includes(subSearch.toLowerCase())
        );
        setSubTopics(filterSt);
      } else {
        setSubTopics(subTopicsData?.subTopicsPerTopic);
      }
    }
  }, [subSearch, subTopicsData]);

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
  const submitCreatePoll = async () => {
    let questionField = (
      document.getElementById("pollQuestionField") as HTMLInputElement
    ).value;
    if (!questionField) {
      toast({
        title: "Question field cannot be empty",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    if (!selectedTopic || !selectedTopic._id) {
      toast({
        title: "Topic is required",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    let selectedSubTopics = selectedSub.map((st) => st._id);
    if (!selectedSubTopics || !selectedSubTopics.length) {
      toast({
        title: "SubTopic is required",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    let answers;
    if (
      (questionType === "multiChoice" && options.length < 2) ||
      options.length > 5
    ) {
      toast({
        title: "Mimimun 2 & maximum 5 options allowed",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    if (questionType === "multiChoice") {
      answers = options;
    }
    const imgIds: string[] | undefined = await saveImgtoCloud(selectedImgs);

    const pollItem: any = {
      question: questionField,
      pollType: questionType,
      topic: selectedTopic._id,
      subTopics: selectedSubTopics,
      pollImages: imgIds && imgIds,
    };
    if (questionType !== "openEnded") {
      pollItem.answers = answers;
    }
    try {
      await createPoll({ variables: { details: JSON.stringify(pollItem) } });
      toast({
        title: "Poll created successfully",
        status: "success",
        isClosable: true,
      });
      router.push("/");
    } catch (err) {
      if (
        err.message ===
        "Content contains inappropriate language.  Please update and resubmit."
      ) {
        toast({
          title:
            "Content contains inappropriate language.  Please update and resubmit.",
          status: "error",
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Error! Cannot create Poll",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box
        border="1px solid #d6d9dc"
        boxShadow="0 1px 2px hsla(0,0%,0%,0.05),0 1px 4px hsla(0,0%,0%,0.05),0 2px 8px hsla(0,0%,0%,0.05)"
        bg="white"
        p="8"
      >
        {/* Page title*/}
        <Box>
          <Flex align="center" justify="space-between" wrap="wrap">
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Ask a poll question
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
                  <option value="openEnded">Open-ended</option>
                  <option value="multiChoice">Multiple Choice</option>
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
            id="pollQuestionField"
          />
        </Box>
        {/* Imageg picker*/}
        <Box mt="4">
          <ImgPicker selectedImgs={selectedImgs} selectImgs={setSelectImgs} />
        </Box>
        {/* Options*/}
        {questionType === "multiChoice" && (
          <Box mt="2">
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
        <Box mt="4">
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
                  <TagLabel>{selectedTopic.name}</TagLabel>
                  <TagCloseButton onClick={() => setSelectedTopic(null)} />
                </Tag>
              </Box>
            )}
          </Flex>
        </Box>
        {/* Topics*/}
        <Box mt="4">
          {topicLoading ? (
            <Spinner ml="4" />
          ) : (
            <Flex wrap="wrap">
              {topicData.topics.map((t: any) => (
                <Box px="2" key={t._id} mb="2">
                  <Tag
                    color={
                      t.topic === selectedTopic?.name ? "white" : "gray.500"
                    }
                    bg={
                      t.topic === selectedTopic?.name
                        ? "poldit.100"
                        : "transparent"
                    }
                    size="lg"
                    variant={
                      t.topic === selectedTopic?.name ? "solid" : "outline"
                    }
                    onClick={() => {
                      setSelectedSub([]);
                      setSelectedTopic({ _id: t._id, name: t.topic });
                    }}
                    cursor="pointer"
                  >
                    <TagLabel>{t.topic}</TagLabel>
                  </Tag>
                </Box>
              ))}
            </Flex>
          )}
        </Box>
        {/* sub topic starts*/}
        <Box>
          {selectedTopic && (
            <Box>
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
                          <TagLabel>{t.name}</TagLabel>
                          <TagCloseButton
                            onClick={() => removeSubTopic(t._id)}
                          />
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
                  size="sm"
                />
              </Box>
              <Box mt="6">
                {subTopicLoading ? (
                  <Spinner ml="4" />
                ) : (
                  <Scrollbars
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={200}
                    style={{ overflowY: "hidden" }}
                  >
                    <Flex pb="4">
                      {subTopics.map((t: any) => (
                        <Box
                          key={t._id}
                          mr="4"
                          borderColor={
                            selectedSub.find((sb) => sb.name === t.subTopic)
                              ? "poldit.100"
                              : "gray.300"
                          }
                          borderWidth="1px"
                          borderRadius="md"
                          overflow="hidden"
                          minW="160px"
                          minH="80px"
                          onClick={() =>
                            handleSubTopics({ _id: t._id, name: t.subTopic })
                          }
                          cursor="pointer"
                        >
                          <Box
                            px="4"
                            py="2"
                            bg="gray.200"
                            borderBottomWidth="1px"
                            borderColor="gray.300"
                          >
                            <Text fontSize="sm">{t.subTopic}</Text>
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
                )}
              </Box>
              {/*Add new sub topic*/}
              <Box mt="6">
                <Flex justify="space-between" align="center">
                  {isOpen ? (
                    <IconButton
                      aria-label="addNewSubTopic"
                      size="xs"
                      bg="white"
                      onClick={onClose}
                      icon={<AiOutlineMinusSquare size="26" />}
                      _focus={{ outline: "none" }}
                    />
                  ) : (
                    <Tooltip label="Add New Sub-Topic" hasArrow placement="top">
                      <IconButton
                        aria-label="addNewSubTopic"
                        size="xs"
                        bg="white"
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
            </Box>
          )}
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
        {/* Submit Poll*/}
        <Box mt="6">
          <Flex justify="flex-end" align="center">
            <Button
              borderColor="poldit.100"
              borderWidth="1px"
              bg="poldit.100"
              color="white"
              _hover={{ bg: "poldit.100", color: "white" }}
              _active={{ bg: "white", color: "poldit.100" }}
              _focus={{ outline: "none" }}
              size="sm"
              type="submit"
              onClick={submitCreatePoll}
            >
              Create Poll
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewPoll;
