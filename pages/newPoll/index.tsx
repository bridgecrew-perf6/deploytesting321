import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { SitePageContainer } from "_components/layout";
import CreateNewPoll from "_components/pageComponents/CreatePollPage/CreateNewPoll";
import { NewPollHelp } from "_components/pageComponents/CreatePollPage/NewPollHelp";

const NewPoll: React.FC<{}> = () => {
  return (
    <SitePageContainer title={`newPoll`}>
      <Box my="50px">
        <Container maxW="container.xl" aria-label="container">
          <Flex wrap="wrap-reverse" pt="12">
            <Box
              flex={{ base: "0 0 100%", lg: "0 0 70%" }}
              maxW={{ base: "100%", lg: "70%" }}
              justify="center"
            >
              <CreateNewPoll />
            </Box>
            <Box
              flex={{ base: "0 0 100%", lg: "0 0 30%" }}
              maxW={{ base: "100%", lg: "30%" }}
              justify="center"
            >
              <NewPollHelp />
            </Box>
          </Flex>
        </Container>
      </Box>
    </SitePageContainer>
  );
};

export default NewPoll;
