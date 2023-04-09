import { Box, Button, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosJWT from "../../contants/axiosJWT";
import { AddIcon } from "@chakra-ui/icons";
import Model from "./Model";
import ChatLoading from "./ChatLoading";

const MyChat = () => {
  const {
    currentUser,
    refreshAccessToken,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    isLoadMyChat,
    setIsLoadMyChatW,
  } = useContext(AuthContext);
  const newAxiosJWT = axiosJWT(currentUser, refreshAccessToken);
  const toast = useToast();

  const fetchChats = async () => {
    try {
      console.log("Test: " + JSON.stringify(currentUser));
      const response = await newAxiosJWT.get("/api/chat", {
        headers: {
          authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      console.log(response.data);
      setChats(response.data);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [isLoadMyChat]);

  return (
    <Box
      display="flex"
      flex="1"
      bg="white"
      flexDir="column"
      alignItems="center"
      p={3}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Model type="create" title="Create Chat">
          <Button
            style={{ display: "flex" }}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </Model>
      </Flex>
      <Flex
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={4}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>{chat.chatName}</Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                  
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Flex>
    </Box>
    
  );
};
export default MyChat;
