import { useState, useCallback } from "react";
import { Orders } from "./pages/Orders";
import "./App.css";

const App = () => {
  // This looks a bit silly, but I wanted to show how I think I would initially structure
  // this app if we had actual routing in place
  return <Orders />;
};

export default App;
