import React from "react";
import Router from "./router/router";
import { ContextProvider } from "./store/context";
import { routes } from "./router/constants";

const App = () => {
  return (
    <ContextProvider>
      <Router routes={routes} />
    </ContextProvider>
  );
};

export default App;
