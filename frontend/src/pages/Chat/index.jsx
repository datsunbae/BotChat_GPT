import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import BoxChat from "../../components/Chat/BoxChat";
import MyChat from "../../components/Chat/MyChat";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";

const handleClick = (logout) => {
  logout();
};

const ChatPage = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Header/>
      <Flex  justifyContent="space-evenly" gap="20px" w="100%" h="90vh"  p="10px 0" >
        <MyChat />
        <BoxChat />
      </Flex> 
    </>
  );
};

export default ChatPage;
