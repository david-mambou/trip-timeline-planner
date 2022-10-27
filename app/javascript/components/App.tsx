import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layout/AppLayout";

export default function App () {
  return (
    <ChakraProvider>
      <Layout>
        App rendering
      </Layout>
    </ChakraProvider>
  );
}
