import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import Layout from "./components/layout/AppLayout";
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

document.addEventListener("DOMContentLoaded", () => {
  root.render(
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <ChakraProvider>
            <Layout>
              <App />
            </Layout>
          </ChakraProvider>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>,
  );
});
