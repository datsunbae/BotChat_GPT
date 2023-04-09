import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosJWT from "../../contants/axiosJWT";

const NewChatModel = ({ children, type, title }) => {
  const {
    currentUser,
    refreshAccessToken,
    chats,
    setChats,
    selectedChat,
    isLoadMyChat,
    setIsLoadMyChat,
  } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [chatName, setChatName] = useState("");

  const newAxiosJWT = axiosJWT(currentUser, refreshAccessToken);

  const handleSubmit = async () => {
    if (!chatName || !type) {
      toast({
        title: "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      let api = "";
      let reqData = {};
      let data = {};

      switch (type) {
        case "create":
          api = "/api/chat/create";
          reqData = { chatName: chatName };
          data = await newAxiosJWT.post(api, reqData, config);

          break;
        case "update":
          api = "/api/chat/rename";
          reqData = { chatID: selectedChat?._id, chatName: chatName };
          data = await newAxiosJWT.put(api, reqData, config);

          break;
        default:
          console.error("Error");
      }

      setChats([data, ...chats]);
      setIsLoadMyChat(!isLoadMyChat);

      onClose();
      toast({
        title: "Success!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" d="flex" justifyContent="center">
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setChatName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              {title}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
//create new chat with thdat ;)))
export default NewChatModel;
