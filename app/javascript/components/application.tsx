import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChakraProvider } from '@chakra-ui/react'
import AppLayout from "./AppLayout";

// interface AppProps {
//   arg: string;
// }

// const App = ({ arg }: AppProps) => {
//   return <div>{`Hello, ${arg}!`}</div>;
// };

const App = () => {
  return (
  <ChakraProvider>
    <AppLayout>
      The children
    </AppLayout>
  </ChakraProvider>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("layoutRoot");
  ReactDOM.render(<App />, rootEl);
});
