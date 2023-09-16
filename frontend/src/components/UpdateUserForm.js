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
import axios from "axios";
import { useState } from "react";

const UpdateUserForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [id, setid] = useState(-1);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const updateUser = async () => {
    setloading(true);
    if (name === "" && (email === "") & (password === "")) {
      toast({
        title: `Please add somthing to update`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
      return;
    }

    if (
      email !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      toast({
        title: `Please enter valid email`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    try {
      let userData = await axios.put(
        "http://localhost:4000/update",
        {
          name: name,
          email: email,
          id: parseInt(id),
          password: password,
          image: image,
        },
        {
          params: {
            token:
              "0ub0j3y8R3MD0fWKgY4h6yRyteJaijFwu25FGQQ9P4lUDbu2vDuE4CnjPiKFXsl2",
          },
        }
      );
      toast({
        title: `Successfully updated user`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    } catch (error) {
        console.log(error)
      toast({
        title: `Error occurred updating user`,
        description: error?.response?.data?.message,
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
          <FormLabel>User Id</FormLabel>
          <Input placeholder="id" onChange={(e) => setid(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="First name"
            onChange={(e) => setname(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="user@example.com"
            onChange={(e) => setemail(e.target.value)}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md" onChange={(e) => setpassword(e.target.value)}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setpassword(e.target.value)}
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
          />
        </FormControl>
        <Button
        isLoading = {loading}
          mt={4}
          colorScheme="teal"
          type="submit"
          onClick={() => updateUser()}
        >
          Update User Detail
        </Button>
      </Box>
    </div>
  );
};

export default UpdateUserForm;
