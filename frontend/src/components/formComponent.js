import React from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const createUser = async () => {
    setloading(true);
    if (name === "" || email === "" || password === "") {
      toast({
        title: `Please fill all fields`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
      return;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      
      try {
        let userData = await axios.post("http://localhost:4000/insert",{
          name: name,
          email: email,
          password: password,
          image: image
        }, {
          params: {
            token:
              "0ub0j3y8R3MD0fWKgY4h6yRyteJaijFwu25FGQQ9P4lUDbu2vDuE4CnjPiKFXsl2",
          },
        });
        toast({
          title: `Successfully created user`,
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        setname('');
        setemail('');
        setpassword('');
        setimage('');
        setloading(false);
      } catch (error) {
        
      setloading(false);
      }

    } else {
      toast({
        title: `Please enter valid email`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    }
  };

  return (
    <div>
      <Box
        display="grid"
        gridGap={5}
        gridAutoFlow="row dense"
        mx="auto"
        my="5vh"
      >
        <FormControl isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="First name"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" onChange={(e) => setemail(e.target.value)} value={email}/>
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Add Profile Pic</FormLabel>
          {/* <Input type="file" p='5px 5px' accept="image/png, image/jpeg"/> */}
          <Input
            pr="4.5rem"
            type="url"
            placeholder="Insert image url"
            onChange={(e) => setimage(e.target.value)}
            value={image}
          />
        </FormControl>
        <Button
        isLoading={loading}
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={() => createUser()}
        >
          Create User
        </Button>
      </Box>
    </div>
  );
};

export default Form;
