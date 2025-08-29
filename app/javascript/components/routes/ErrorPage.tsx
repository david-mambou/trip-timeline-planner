import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Flex minH="100vh" align="center" justify="center" px={6}>
      <VStack spacing={6} textAlign="center">
        <Box>
          <Heading as="h1" fontSize={{ base: "6xl", md: "9xl" }} fontWeight="extrabold" color="gray.800">
            Error
          </Heading>
          <Text fontSize="xl" color="gray.600" mt={2}>
            There was an error while loading this page.
          </Text>
        </Box>

        <Button size="lg" colorScheme="blue" onClick={() => navigate("/trips")} _hover={{ transform: "scale(1.05)" }}>
          Go back home
        </Button>
      </VStack>
    </Flex>
  );
}
