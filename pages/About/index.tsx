import Layout from "_components/layout/Layout";
import { Box, Flex, Text, Container } from "@chakra-ui/layout";

const About = () => {
  return (
    <Layout pageTitle={`About Poldit`}>
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
            About Poldit Page Coming Soon!
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default About;
