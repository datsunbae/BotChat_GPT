import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, SettingsIcon } from "@chakra-ui/icons";
import ScrollChat from "./ScrollChat";
import axiosJWT from "../../contants/axiosJWT";
import "../../styles.css";
import Model from "./Model";

const SingleChat = () => {
  const {
    selectedChat,
    setSelectedChat,
    currentUser,
    refreshAccessToken,
    isLoadMyChat,
    setIsLoadMyChat,
  } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const newAxiosJWT = axiosJWT(currentUser, refreshAccessToken);

  const fetchMessages = async () => {
    if (!selectedChat?._id) {
      setSelectedChat(null);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      setLoading(true);
      const response = await newAxiosJWT.get(
        `/api/message/${selectedChat?._id}`,
        config
      );

      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        };
        setNewMessage("");

        setMessages([
          ...messages,
          {
            sender: {
              _id: currentUser._id,
              name: currentUser.name,
              avatar: currentUser.avatar,
            },
            userMessage: newMessage,
            chat: selectedChat._id,
          },
        ]);

        const response = await newAxiosJWT.post(
          "/api/message/send",
          {
            newMessage: newMessage,
            chatID: selectedChat._id,
          },
          config
        );

        console.log("Res >>>>> ", response.data);

        setMessages([...messages, response.data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const handleDeleteChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      await newAxiosJWT.delete(`/api/chat/${selectedChat._id}`, config);
      setIsLoadMyChat(!isLoadMyChat);
      toast({
        title: "Success",
        description: "Delete Chat Success",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setSelectedChat(null);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            <Menu>
              <MenuButton as={Button} rightIcon={<SettingsIcon />}>
                Edit chat
              </MenuButton>
              <MenuList>
                <Model type="update" title="Rename Chat">
                  <MenuItem>Rename chat</MenuItem>
                </Model>
                <MenuItem onClick={handleDeleteChat}>Delete chat</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3}>
            <img
              alt="error"
              src="https://t3.ftcdn.net/jpg/03/64/76/98/360_F_364769865_mVmKwtc1286zxkuskmxUug2AeX7NYyHA.jpg"
            ></img>
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
