import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingPage() {
  return (
    <Flex minH="100vh" w="100%" align="center" justify="center">
      <Spinner size="xl" thickness="4px" color="blue.500" />
    </Flex>
  );
}
