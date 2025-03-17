import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components";
import { GitProvider } from "@/contexts/git";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <GitProvider>
        <App />
      </GitProvider>
    </Provider>
  </StrictMode>
);
