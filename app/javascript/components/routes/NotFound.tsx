import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex minH="100vh" align="center" justify="center" px={6}>
      <VStack spacing={6} textAlign="center">
        <Box>
          <Heading as="h1" fontSize={{ base: "6xl", md: "9xl" }} fontWeight="extrabold" color="gray.800">
            404
          </Heading>
          <Text fontSize="xl" color="gray.600" mt={2}>
            Oops! The page you’re looking for doesn’t exist.
          </Text>
        </Box>

        <Button size="lg" colorScheme="blue" onClick={() => navigate("/")} _hover={{ transform: "scale(1.05)" }}>
          Go back home
        </Button>
      </VStack>
    </Flex>
  );
}
