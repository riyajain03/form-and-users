import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const RenderUsers = () => {
  const [data, setData] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const toast = useToast();
  const [loading, setloading] = useState(false);
  //   let userData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let userDat = await axios.get("http://localhost:4000/allusers", {
          params: {
            token:
              "0ub0j3y8R3MD0fWKgY4h6yRyteJaijFwu25FGQQ9P4lUDbu2vDuE4CnjPiKFXsl2",
          },
        });
        //   const userJsonData = await userDat.json
        setData(userDat.data);
        console.log(userDat);
      } catch (error) {
        setData(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setloading(true);
      let userDat = await axios.get("http://localhost:4000/allusers", {
        params: {
          token:
            "0ub0j3y8R3MD0fWKgY4h6yRyteJaijFwu25FGQQ9P4lUDbu2vDuE4CnjPiKFXsl2",
        },
      });
      //   const userJsonData = await userDat.json
      setData(userDat.data);
      setloading(false);
      toast({
        title: `Fetched list successfully`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setData(false);
      setloading(false);
      toast({
        title: `Error occurred while fetching user`,
        status: "error",
        description: JSON.stringify(error.message),
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const refreshLIst = () => {
    fetchData();
  };

  const copyToClipboard = (e, user) => {
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    navigator.clipboard.writeText(user.id);
    console.log(user);
    e.target.focus();
    toast({
      title: `Id copied as ${user.id}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const deletUser = async (e, user) => {
    try {
      let userData = await axios.delete("http://localhost:4000/delete", {
        params: {
          user_id: user.id,
          token:
            "0ub0j3y8R3MD0fWKgY4h6yRyteJaijFwu25FGQQ9P4lUDbu2vDuE4CnjPiKFXsl2",
        },
      });
      toast({
        title: `Successfully deleted user`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      console.log(error);
      toast({
        title: `Error occurred updating user`,
        description: error?.response?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <TableContainer>
        <Table variant="simple" size="sm">
          <TableCaption>User Lists</TableCaption>
          <Thead>
            <Tr>
              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                fontFamily="sans-serif"
              >
                Image
              </Th>

              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                fontFamily="sans-serif"
              >
                Id
              </Th>
              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                fontFamily="sans-serif"
              >
                Name
              </Th>
              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                fontFamily="sans-serif"
              >
                Email
              </Th>
              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                isNumeric
                fontFamily="sans-serif"
              >
                Orders
              </Th>
              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                fontFamily="sans-serif"
              >
                Created At
              </Th>
              <Th
                fontWeight="semi-bold"
                fontSize={15}
                color="black"
                style={{ "text-transform": "lowercase" }}
                fontFamily="sans-serif"
              >
                Last Updated
              </Th>
              <Th>
                <Button
                  fontSize={14}
                  colorScheme="blue"
                  onClick={() => refreshLIst()}
                  isLoading={loading}
                >
                  Fetch Users
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data?.map((user) => {
                return (
                  <Tr key={user.id}>
                    <Th>
                      <Image
                        boxSize="40px"
                        borderRadius="full"
                        src={`${user.user_image}`}
                      />
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      {user.id}
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      {user.user_name}
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      {user.user_email}
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      0
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      {user.createdAt}
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      {user.updatedAt}
                    </Th>
                    <Th
                      style={{ "text-transform": "lowercase" }}
                      color="black"
                      fontWeight="normal"
                    >
                      <Button
                        fontSize={12}
                        colorScheme="blue"
                        variant="outline"
                        mr={2}
                        onClick={(e) => copyToClipboard(e, user)}
                      >
                        Copy Id
                      </Button>
                      <Button
                        fontSize={12}
                        colorScheme="red"
                        onClick={(e) => deletUser(e, user)}
                      >
                        Delete
                      </Button>
                    </Th>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RenderUsers;
