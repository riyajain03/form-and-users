import logo from "./logo.svg";
import "./App.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import Form from "./components/formComponent";
import Menu from "./components/Menu";

function App() {
  return (
    <Box className="App">
      <Menu />
    </Box>
  );
}

export default App;
