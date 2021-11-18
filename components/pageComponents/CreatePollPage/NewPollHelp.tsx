import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

export const NewPollHelp: React.FC<{}> = () => {
  return (
    <Box pl={{ base: 0, lg: 8 }} mb={{ base: 6, lg: 0 }}>
      <Box
        border="1px solid #d6d9dc"
        boxShadow="0 1px 2px hsla(0,0%,0%,0.05),0 1px 4px hsla(0,0%,0%,0.05),0 2px 8px hsla(0,0%,0%,0.05)"
      >
        <Accordion allowToggle defaultIndex={[0]} allowMultiple={true}>
          <AccordionItem>
            <h2>
              <AccordionButton
                bg="#f8f9f9"
                _focus={{ outline: "none" }}
                _hover={{ bg: "#f8f9f9" }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontSize="md" color="gray.500">
                    Draft your question
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="white" px="0">
              <Box px="4">
                <Text fontSize="sm" color="gray.600">
                  The community is here to help you with specific coding,
                  algorithm, or language problems.
                </Text>
                <Text fontSize="sm" color="gray.600" my="2">
                  Avoid asking opinion-based questions.
                </Text>
              </Box>
              <Accordion allowToggle defaultIndex={0} allowMultiple={true}>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="#f8f9f9" _focus={{ outline: "none" }}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="bold" color="gray.600">
                          Summarize the problem
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg="white">
                    <Text fontSize="sm" color="gray.600">
                      The community is here to help you with specific coding,
                      algorithm, or language problems.
                    </Text>
                    <Text fontSize="sm" color="gray.600" mt="2">
                      Avoid asking opinion-based questions.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="#f8f9f9" _focus={{ outline: "none" }}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="bold" color="gray.600">
                          Describe what you’ve tried
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg="white">
                    <Text fontSize="sm" color="gray.600">
                      The community is here to help you with specific coding,
                      algorithm, or language problems.
                    </Text>
                    <Text fontSize="sm" color="gray.600" mt="2">
                      Avoid asking opinion-based questions.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="#f8f9f9" _focus={{ outline: "none" }}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="sm" fontWeight="bold" color="gray.600">
                          Show some code
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} bg="white">
                    <Text fontSize="sm" color="gray.600">
                      The community is here to help you with specific coding,
                      algorithm, or language problems.
                    </Text>
                    <Text fontSize="sm" color="gray.600" mt="2">
                      Avoid asking opinion-based questions.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box
        border="1px solid #d6d9dc"
        boxShadow="0 1px 2px hsla(0,0%,0%,0.05),0 1px 4px hsla(0,0%,0%,0.05),0 2px 8px hsla(0,0%,0%,0.05)"
        mt="4"
        display={{ base: "none", lg: "block" }}
      >
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                bg="#f8f9f9"
                _focus={{ outline: "none" }}
                _hover={{ bg: "#f8f9f9" }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontSize="md" color="gray.500">
                    More helpful links
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="white">
              <Text fontSize="sm" color="gray.600">
                The community is here to help you with specific coding,
                algorithm, or language problems.
              </Text>
              <Text fontSize="sm" color="gray.600" mt="2">
                Visit the help center
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
