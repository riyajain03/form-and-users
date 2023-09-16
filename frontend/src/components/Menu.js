import React from "react";
import {
  Tabs,
  TabList,
  Center,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import Form from "./formComponent";
import RenderUsers from "./RenderUsers";
import UpdateUserForm from "./UpdateUserForm";

const Menu = () => {
  return (
    <Center mx="auto" mt="5vh">
      <Tabs variant="soft-rounded" w='100%' colorScheme="blue">
        <TabList>
          <Tab>Add User</Tab>
          <Tab>Update User Details</Tab>
          <Tab>All Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel w='60%' mx='auto'>
            <Form/>
          </TabPanel>
          <TabPanel w='60%' mx='auto'>
            <UpdateUserForm/>
          </TabPanel>
          <TabPanel>
            <RenderUsers/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default Menu;
