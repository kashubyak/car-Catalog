import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/style/global.css";
import { AuthProvider } from "./assets/providers/AuthProvides";
import Router from "./assets/components/ui/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
