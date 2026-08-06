import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { FavoritesProvider } from "./context/FavoritesContext";
import { ContinueWatchingProvider } from "./context/ContinueWatchingContext";
import { ThemeProvider } from "./context/ThemeContext";

import ErrorBoundary from "./components/common/ErrorBoundary";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <FavoritesProvider>

        <ContinueWatchingProvider>

  <ThemeProvider>

    <ErrorBoundary>

  <App />

</ErrorBoundary>

  </ThemeProvider>

</ContinueWatchingProvider>

      </FavoritesProvider>

    </BrowserRouter>

  </React.StrictMode>

);